import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider as Provider } from "@apollo/client";
import { fetch } from "@lib/app-bridge";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function ApolloProvider({ children }) {
  const app = useAppBridge();
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    fetch: fetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  return <Provider client={client}>{children}</Provider>;
}
