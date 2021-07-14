import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../atom/atom";

const ItemArray = ({ item }) => {
  const [count, setCount] = useState(1);
  const [cartItems, setCartItems] = useRecoilState(cartState);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handlePlus = () => {
    setCount(() => count + 1);
  };
  const handleMinus = () => {
    if (count > 0) {
      setCount(() => count - 1);
    }
  };

  const pushToCart = () => {
    let newItem = {
      ...item,
      qty: count,
      totalPrice: item.price * count,
      cPriceUnitTotal: item.price * count,
    };
    setCartItems(() => {
      const existItem = cartItems.find((x) => x.id === newItem.id);

      if (existItem) {
        return cartItems.map((x) => (x.id === existItem.id ? newItem : x));
      } else {
        return [...cartItems, newItem];
      }
    });
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <div>{item.name}</div>
      <img src={item.image} alt="img" style={{ width: "150px" }}></img>
      <div>{item.price * count}</div>
      <div>{count}</div>
      <button onClick={handlePlus}>+</button>
      <button onClick={handleMinus}>-</button>
      <button onClick={pushToCart}>담기</button>
    </div>
  );
};

export default ItemArray;
