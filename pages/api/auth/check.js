import RedisStore from "@lib/redis";
import Shopify from "@shopify/shopify-api";

// noinspection JSUnusedGlobalSymbols
export default async function (req, res) {

  //the bearer header is not posted, we can not use this: loadCurrentSession because it will not find the session.
  // const session = await Shopify.Utils.loadCurrentSession(req, res, false); //false : offline
  // console.log("★ session is ", session);

  //ask the db directly
  const sessionStorage = new RedisStore(process.env.REDIS_URL);

  let shop = req.query.shop;
  console.log("shop: ", shop);

  let token = await sessionStorage.getByShop(shop)
  console.log("token record from redis: ", token);

  let success = false;
  if (token && token.accessToken) {
    const client = new Shopify.Clients.Rest(shop, token.accessToken);
    try {
      //client.get({path: "shop"}).then().catch(reason => console.log("reason", reason))

      const apiResponse = await client.get({path: "shop"});
      console.log("apiResponse to shop info is: ", apiResponse);
      success = true;
    } catch (e) {
      console.log("error getting shop info. e is:", e);
    }
  }

  res.status(200).json({"status": success ? "success" : "error", "detail": !success ? "No session or session invalid" : ''})
}
