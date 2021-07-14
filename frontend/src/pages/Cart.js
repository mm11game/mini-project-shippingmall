import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartState, testAtom, userInfoWithCouponsState } from "../atom/atom";
import CartArray from "../components/CartArray";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [userInfoWithCoupons, setUserInfoWithCoupons] = useRecoilState(
    userInfoWithCouponsState
  );
  const [total, setTotal] = useState(0);
  const getToken = localStorage.getItem("Token");
  const [test, setTest] = useRecoilState(testAtom);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/item/userInfoWithCoupons",
        {
          headers: { Authorization: `Bearer ${getToken}` },
        }
      );
      setUserInfoWithCoupons(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("이론 확인해보기");
    setTotal(() => {
      return cartItems.reduce((a, c) => {
        return a + c.price * c.qty;
      }, 0);
    });
    localStorage.setItem(
      "userInfoWithCoupons",
      JSON.stringify(userInfoWithCoupons)
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [userInfoWithCoupons, cartItems, total, test]);

  return (
    <div>
      <Link to="/">back</Link>
      <h1>장바구니</h1>
      <h2>내가 보유한 금액 :{userInfoWithCoupons.money} </h2>

      {cartItems.length === 0 ? (
        <h3>텅~</h3>
      ) : (
        <>
          {cartItems.map((item) => {
            return <CartArray key={item.id} item={item} total={total} />;
          })}
          <h2>배송비 : {total > 50000 ? 0 : 3000}</h2>
          <h2>총 합계 : {total + (total > 50000 ? 0 : 3000)}</h2>
          <h2>
            최종 비용 :{" "}
            {cartItems.reduce((a, c) => {
              return a + c.cPriceUnitTotal;
            }, 0) + (total > 50000 ? 0 : 3000)}
          </h2>
          <div>
            {userInfoWithCoupons.money < total || total === 0 ? (
              <Link to="/cart">결제불가능</Link>
            ) : (
              <Link to="/payment">결제하기</Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
