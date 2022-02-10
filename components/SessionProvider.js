import {useEffect} from 'react';
import {getSessionToken} from "@shopify/app-bridge-utils";
import {useAppBridge} from "@shopify/app-bridge-react";

export default function SessionProvider({children}) {
  const app = useAppBridge();

  useEffect(async () => {
    const session = await getSessionToken(app);

    if (!session) {
      console.log("Can not get session using getSessionToken. Going to redirect to auth page");
      window.location.pathname = `/api/auth/shopify/login`;
    }
  }, []);

  return <>{children}</>;
}

