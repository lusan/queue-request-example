import React, { useEffect } from "react";
import axiosInstanceInterceptorWay from './api/intereptorTechnique/interceptors';


function PostsUsingInterceptor() {
  useEffect(() => {
    axiosInstanceInterceptorWay
      .get("https://hub.dummyapis.com/delay?seconds=2")
      .then((response) => {
        console.log("Response 1:", response.data);
      });

    axiosInstanceInterceptorWay
      .get("https://hub.dummyapis.com/delay?seconds=1")
      .then((response) => {
        console.log("Response 2:", response.data);
      });

    axiosInstanceInterceptorWay
      .get("https://hub.dummyapis.com/delay?seconds=2")
      .then((response) => {
        console.log("Response 3:", response.data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Sequential API Calls with Axios Interceptor</h1>
    </div>
  );
}

export default PostsUsingInterceptor;
