import Shopify from "@shopify/shopify-api";

const commonHandler = function (topic, shop, webhookRequestBody) {
    console.log(`inside the webhook handler added using addHandler. topic ${topic}, shop: ${shop}, webhookRequestBody: ${webhookRequestBody}`);
}

const registerMyWebhooks = async function (shop, accessToken) {

    console.log(`Going to register webhooks. Shop ${shop}, accessToken: ${accessToken}`);

    await registerWebhookAndAddHandler("APP_UNINSTALLED", shop, accessToken, commonHandler)
    //this mandatory gdpr webhooks can not be registered using the library.
    //we declare them in the shopify admin dashboard and handle them here only.
    //https://github.com/Shopify/shopify-node-api/issues/290#issuecomment-1020596034
    await addHandler("customers/data_request", commonHandler)
    await addHandler("customers/redact", commonHandler)
    await addHandler("shop/redact", commonHandler)
};

async function registerWebhookAndAddHandler(topic, shop, accessToken, handler) {
    console.log("Going to register webhook. topic: ", topic);
    await registerWebhook("/api/webhooks", topic, shop, accessToken)

    await addHandler(topic, handler);
}

async function registerWebhook(path, topic, shop, accessToken) {
    const response = await Shopify.Webhooks.Registry.register({
        path : path,
        topic: topic,
        accessToken,
        shop,
    });

    if (!response[topic] || !response[topic]['success']) {
        console.log(`Failed to register ${topic} webhook. response is:`, response);
    } else {
        console.log(`Successfully registered the ${topic} webhook on shopify`);
    }
}

async function addHandler(topic, handler) {
//should be done once only for all shops (at startup), but here we are doing it for each shop;
    //add the handler that will be called when we receive webhook from shopify
    console.log("Going to add handler. Topic: ", topic);
    await Shopify.Webhooks.Registry.addHandler(topic, {
        webhookHandler: handler,
    });
}

export default registerMyWebhooks;
