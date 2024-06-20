import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./auth-context";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [addItems, setAddItems] = useState([]);
  const AuthCtx = useContext(AuthContext);

  let urlOfCrud = "https://crudcrud.com/api/203afd0d55414ad8adf03c01fd94af18";
  let userIdentity = localStorage.getItem("email");

  const getDataFromCrud = async () => {
    try {
      const response = await fetch(`${urlOfCrud}/${userIdentity}`);
      const result = await response.json();
      setAddItems(result);
      console.log("result", result);
    } catch (err) {
      alert(err);
    }
  };
  const postDataToCrud = async (item) => {
    //item contains data which we want to post to crud crud
    try {
      let alreadyExistsItem = addItems.find(
        (element) => element.id === item.id
      );
      if (alreadyExistsItem) {
        alert("item already present");
      } else {
        const addToCrud = await fetch(`${urlOfCrud}/${userIdentity}`, {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("addToCrud", addToCrud); //the response which is obtained from fetch we console it
        console.log("added");
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const deleteDataFromCrud = async (id) => {
    //we passing particular id which we are obtaing from crud crud in the form of ._id we want to delete data
    try {
      const response = await fetch(`${urlOfCrud}/${userIdentity}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("responsedelete", response);
      getDataFromCrud();
    } catch (err) {
      alert(err);
    }
  };

  const addItemToCart = (item) => {
    /*let cartItems = [...addItems];
    let hasItem = false;
    cartItems.forEach((product) => {
      if (product.id === item.id) {
        hasItem = true;
        product.quantity = Number(product.quantity) + Number(item.quantity);
      }
    });
    if (hasItem) {
      setAddItems(cartItems);
    } else {
      setAddItems((prevItem) => {
        return [...prevItem, item];
      });
    }*/
    postDataToCrud(item); //once item is added to cart this will post data to crud crud
    console.log("item", item);
    getDataFromCrud();
  };
  const removeItemFromCart = (item) => {
    /*let cartItems = [...addItems];
    cartItems.forEach((product, index) => {
      if (product.id === item.id && product.quantity <= 1) {
        cartItems.splice(index, 1);
        setAddItems(cartItems);
      }
      if (product.id === item.id && product.quantity > 1) {
        product.quantity = Number(product.quantity) - 1;
        setAddItems(cartItems);
      }
    });*/
    console.log("item._id", item._id);
    deleteDataFromCrud(item._id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFromCrud();
      console.log("from useEffectcalled", data);
    };
    console.log("useeffectcalled");
    fetchData();
  }, [AuthCtx.login, AuthCtx.logout]);

  const cartContext = {
    //itemFromCrud:itemFromCrud,
    items: addItems,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
