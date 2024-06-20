import "./App.css";
import Header from "./components/Header";
import React, { useState, useContext, Suspense } from "react";
import {Route, Switch, Redirect } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import AlbumList from "./components/AlbumList";
import ProductList from "./pages/ProductList";
//import About from "./pages/about";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Footer from "./components/UI/Footer";
import AuthContext from "./store/auth-context";


const productsArr = [
  {
    id: "a1",
    title: "Album1",
    price: 100,
    quantity: 1,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    id: "a2",
    title: "Album2",
    price: 50,
    quantity: 1,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    id: "a3",
    title: "Album3",
    price: 70,
    quantity: 1,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    id: "a4",
    title: "Album4",
    price: 100,
    quantity: 1,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

function App() {
  const [cart, setCart] = useState(false);
  
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  
  const productList = productsArr.map((product) => {
    return (
      <AlbumList
      key={product.id}
        id={product.id}
        title={product.title}
        image={product.imageUrl}
        price={product.price}
        quantity={product.quantity}
      />
    );
  });

  const openCartHandler = () => {
    setCart(true);
  };

  const closeCartHandller = () => {
    setCart(false);
  };

  const submitUserDetails = async (details) => {
    const response = await fetch(
      "https://react-http-15873-default-rtdb.firebaseio.com/users.json",
      {
        mode:"no-cors",
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Context-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };
  const About=React.lazy(()=>import("./pages/about"));
  return (
    <CartProvider>
      
      <Header onShow={openCartHandler} />
      
      <main>
        <Switch>
        <Route path="/store" exact>
          
            {isLoggedIn && (
              <>
              {cart && <Cart onClose={closeCartHandller} />}
                <div className="title">
                  <h1>The Generics</h1>
                </div>
                <h1 className="category">Music</h1>
                <main>{productList}</main>
              </>
            )}
            {!isLoggedIn && <Redirect to="/login" />}
           
          </Route>
          <Route path="/about" >
          <Suspense fallback={<div>Loading...</div>}>
            <About />
            </Suspense>
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/contactus" exact>
            <ContactUs getUserDetails={submitUserDetails} />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/store/:productId" exact>
        <ProductList />
      </Route>
     
          
        </Switch>
      </main>
      <Footer />
      
    </CartProvider>
  );
}

export default App;