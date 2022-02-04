import Shopify, {ShopifyAuth} from '@lib/shopify';
import registerMyWebhooks from "../webhooks/webhooks-registration";

export default ShopifyAuth({
  accessMode: 'offline',  //offline vs online
  afterAuth: async (req, res, {accessToken, shop}) => {

    // Provide HOST_NAME here just in case it was not provided by env variable
    // This might occur during the first deploy to Vercel when you don't yet know
    // what domain your app is being hosted on
    Shopify.Context.update({HOST_NAME: req.headers.host});

    //tell shopify that we are interested in "APP_UNINSTALLED" event
    await registerMyWebhooks(shop, accessToken);
  }
});
