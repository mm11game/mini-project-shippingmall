import React from "react";

const CouponArray = ({ coupon, item, couponHandler, idx }) => {
  return (
    <button
      onClick={() => {
        couponHandler(coupon, item.id, idx);
      }}
    >
      {coupon.name}

      {coupon.itemId ? `사용중` : "사용가능"}
    </button>
  );
};

export default CouponArray;
