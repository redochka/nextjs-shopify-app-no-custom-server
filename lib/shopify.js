import Shopify, {ApiVersion} from '@shopify/shopify-api';
import RedisStore from '@lib/redis';

const sessionStorage = new RedisStore(process.env.REDIS_URL);
const context        = {
  API_KEY        : process.env.NEXT_PUBLIC_SHOPIFY_APP_API_KEY,
  API_SECRET_KEY : process.env.SHOPIFY_APP_API_SECRET_KEY,
  SCOPES         : [process.env.SCOPES || 'write_products'],
  HOST_NAME      : process.env.HOST || 'https://example.com',
  IS_EMBEDDED_APP: true,
  API_VERSION    : ApiVersion.October22,
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    sessionStorage.storeCallback,
    sessionStorage.loadCallback,
    sessionStorage.deleteCallback,
  ),
}

Shopify.Context.initialize(context);

Shopify.Context.update = function (overrides) {
  Shopify.Context.initialize({...context, ...overrides});
}


export default Shopify;

export function ShopifyAuth(config = {}) {

  return (req, res) => {
    const {shopify} = req.query;

    // Provide HOST_NAME here just in case it was not provided by env variable
    // This might occur during the first deploy to Vercel when you don't yet know
    // what domain your app is being hosted on
    Shopify.Context.update({HOST_NAME: req.headers.host});

    switch (shopify.join('/')) {
      case 'shopify/login':
        return loginRoute(req, res, config.accessMode);
      case 'shopify/callback':
        return callbackRoute(req, res, config.afterAuth);
    }
  }
}

async function loginRoute(req, res, accessMode) {
  try {
    const {shop}    = req.query;
    const authRoute = await Shopify.Auth.beginAuth(req, res, shop, '/api/auth/shopify/callback', accessMode !== 'offline');
    console.log("New OAuth process starting. AccessMode offline/online: ", accessMode, "authRoute is:", authRoute);
    res.writeHead(302, {'Location': authRoute});
    res.end();
  } catch (e) {
    console.log(e);

    res.writeHead(500);
    if (e instanceof Shopify.Errors.ShopifyError) {
      res.end(e.message);
    } else {
      res.end(`Failed to complete OAuth process: ${e.message}`);
    }
  }
}

async function callbackRoute(req, res, afterAuth) {
  console.log("inside callbackRoute");
  let redirectUrl = `/embedded?host=${req.query.host}&shop=${req.query.shop}`;

  try {
    const currentSession = await Shopify.Auth.validateAuthCallback(req, res, req.query);

    if (typeof afterAuth === 'function') {
      redirectUrl = await afterAuth(req, res, currentSession) || redirectUrl;
    }

    console.log("callbackRoute: going to redirect to this url:", redirectUrl);
    res.writeHead(302, {'Location': redirectUrl});
    res.end();
  } catch (e) {
    console.log(e);

    res.writeHead(500);
    if (e instanceof Shopify.Errors.ShopifyError) {
      res.end(e.message);
    } else {
      res.end(`Failed to complete OAuth process: ${e.message}`);
    }
  }
}
