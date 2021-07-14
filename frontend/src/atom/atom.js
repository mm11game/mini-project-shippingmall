import { atom } from "recoil";

const cartItems = !!localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

export const cartState = atom({
  key: "cartState", // unique ID (with respect to other atoms/selectors)
  default: [...cartItems], // default value (aka initial value)
});

const userInfoWithCoupons = !!localStorage.getItem("userInfoWithCoupons")
  ? JSON.parse(localStorage.getItem("userInfoWithCoupons"))
  : [];

export const userInfoWithCouponsState = atom({
  key: "userInfoWithCouponsState",
  default: { ...userInfoWithCoupons },
});

export const testAtom = atom({
  key: "testAtom",
  default: 0,
});
