import React, { useEffect } from "react";
import apiCaller from "./api/normalFlow/apiCaller";

function App() {
  useEffect(() => {
    apiCaller
      .get("https://hub.dummyapis.com/delay?seconds=2")
      .then((response) => {
        console.log("Response 1:", response.data);
      });

    apiCaller
      .get("https://hub.dummyapis.com/delay?seconds=1")
      .then((response) => {
        console.log("Response 2:", response.data);
      });

    apiCaller
      .get("https://hub.dummyapis.com/delay?seconds=2")
      .then((response) => {
        console.log("Response 3:", response.data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Sequential API Calls with Axios</h1>
    </div>
  );
}

export default App;
