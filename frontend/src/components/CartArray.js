import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { cartState, testAtom, userInfoWithCouponsState } from "../atom/atom";
import CouponArray from "./CouponArray";

const CartArray = ({ item }) => {
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [userInfoWithCoupons, setUserInfoWithCoupons] = useRecoilState(
    userInfoWithCouponsState
  );

  const [findCoupon, setFindCoupon] = useState({});
  const [tx, setTx] = useRecoilState(testAtom);

  const removeHandler = (removeItemId) => {
    setCartItems(() =>
      cartItems.filter((x) => {
        return x.id !== item.id;
      })
    );
    setUserInfoWithCoupons(() => ({
      ...userInfoWithCoupons,
      Coupons: [
        ...userInfoWithCoupons.Coupons.map((coupon) =>
          coupon.itemId === removeItemId
            ? { ...coupon, itemId: null, state: true }
            : coupon
        ),
      ],
    }));
  };

  const couponHandler = (coupon, clickItemId, idx) => {
    setFindCoupon(() => {
      // console.log(coupon, userInfoWithCoupons.Coupons[idx]?.itemId);
      if (userInfoWithCoupons.Coupons[idx]?.itemId) {
        return {};
      } else {
        return {
          ...coupon,
          itemId: clickItemId,
          state: false,
        };
      }
    });
    setUserInfoWithCoupons(() => {
      return {
        ...userInfoWithCoupons,
        Coupons: [
          ...userInfoWithCoupons.Coupons.map((e) => {
            // console.log(coupon, clickItemId);
            if (e.id === coupon.id && e.itemId === null) {
              return { ...e, itemId: clickItemId, state: false };
            } else if (e.itemId === clickItemId) {
              return { ...e, itemId: null, state: true };
            } else {
              return e;
            }
          }),
        ],
      };
    });
    setCartItems(() => {
      return [
        ...cartItems.map((item) => {
          if (item.id === clickItemId) {
            return {
              ...item,
              cPriceUnitTotal: coupon.itemId
                ? item.price * item.qty
                : item.price * item.qty - item.price,
            };
          } else {
            return { ...item };
          }
        }),
      ];
    });
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <div>?????? : {item.name}</div>
      <img src={item.image} alt="img" style={{ width: "150px" }}></img>
      <div>?????? : {item.qty}???</div>
      <div>???????????? : {item.price}</div>
      <div>??? ?????? : {item.price * item.qty}</div>
      <div>????????? ????????? : {item.id}</div>

      <div>
        ????????? ????????? ??? ?????? :
        {findCoupon?.value === "?????????????????????"
          ? item.price * item.qty - item.price
          : null}
      </div>

      {userInfoWithCoupons.Coupons?.map((e, idx) => (
        <CouponArray
          key={e.id}
          idx={idx}
          coupon={e}
          couponHandler={couponHandler}
          item={item}
        />
      ))}
      <button onClick={() => removeHandler(item.id)}>delete</button>
      <button onClick={() => setTx((old) => old + 1)}>Test</button>
    </div>
  );
};

export default CartArray;
