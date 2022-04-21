import {useEffect} from 'react';
import axios from "axios";
import { getSessionToken } from '@shopify/app-bridge-utils';

export default function SessionProvider({children}) {
  //const app = useAppBridge();

  useEffect(() => {

    const url = new URL(window.location.href);
    let shop  = url.searchParams.get("shop");

    const myAxios = axios.create();
    myAxios
      .post(`/api/auth/check?shop=${shop}`)
      .then(function (response) {
        console.log("rep: ", response);

        if (response.data.status === "error") {
          console.log("response status is error, going to redirect to install screen");
          //window.top.location.href = `https://a9ac-77-148-212-49.eu.ngrok.io/api/auth/shopify/login?shop=${shop}`;
          window.top.location.href = `/api/auth/shopify/login?shop=${shop}`;
        } else {
          console.log("response status is not error. Do not redirect to install screen");
        }
      })
      .catch(function (error) {
        console.log("error: ", error);
      });


    //
    // getSessionToken listens to event, so if no event, this function will not resolve
    // call getSessionToken when we are sure that the app is already installed
    
      //  console.log("Going to call getSessionToken");
      //  getSessionToken(app).then((value) => {
      //    console.log("inside promise, session is: ", value);
      //  }).catch(reason => {
      //    console.log("inside promise catch, reason is: ", reason);
      //  })
    


  }, []);

  return <>{children}</>;
}

