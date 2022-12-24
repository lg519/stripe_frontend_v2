import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import StripeCheckout from "react-stripe-checkout";

//require("dotenv").config();

function App() {
  const [product, setProduct] = useState({
    name: "KALLISTON plan",
    price: 1,
    productBy: "KALLISTON",
  });

  const makepayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log("RESPONSE:", res);
        const { status } = res;
        console.log("STATUS:", status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          stripeKey={
            "pk_live_51MGkyqCQWfdwqcJKrM5Mh9r22l0nHjyXrM6N2DqDEjXr5bWrmRwdC5MssthGZFFEqjrFshOlPXBDPwijtfHhjTHA00KRCUg2Xp"
          }
          token={makepayment}
          name="Buy KALLISTON plan"
          amount={product.price * 100}
        ></StripeCheckout>
      </header>
    </div>
  );
}

export default App;
