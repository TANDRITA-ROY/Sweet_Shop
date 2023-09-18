import React, { useState } from "react";
import Meals from "./Meals/Meals";
import Header from "./Header/Header";
import Cart from "./Cart/Cart";
import ContetProvider from "./store/ContetProvider";
function App() {
  const [cartShown, setCartSown] = useState(false);

  const ShowCartHandeler = () => {
    setCartSown(true);
  };
  const HideCartHandeler = () => {
    setCartSown(false);
  };
  return (
    <ContetProvider>
      {cartShown && <Cart onCartClose={HideCartHandeler} />}
      <Header onShow={ShowCartHandeler} />
      <main>
        <Meals />
      </main>
    </ContetProvider>
  );
}

export default App;
