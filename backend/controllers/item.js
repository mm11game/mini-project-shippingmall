const asyncHandler = require("express-async-handler");
const { User, Item, Coupon } = require("../models");

module.exports = {
  list: asyncHandler(async (req, res) => {
    const items = await Item.findAll({});

    if (!items) {
      res.status(400).send("아이템이 없습니다");
    } else {
      res.send(items);
    }
  }),
  userInfoWithcoupons: asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: { id: req.tokenUser.id },
      include: {
        model: Coupon,
        // where: { id: 3 },
      },
    });
    res.send(user);
  }),
};
