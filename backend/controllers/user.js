const { User, Coupon } = require("../models");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../token/token");

module.exports = {
  login: asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    const user = await User.findOne({
      where: { name, password },
    });

    if (!user) {
      res.status(401);
      throw new Error("해당 유저가 없음");
    }

    let token = generateToken(user.id);
    res.send({ user, token });
  }),

  signup: asyncHandler(async (req, res) => {
    const { name, password, address, phone } = req.body;

    const user = await User.findOne({
      where: { name: name },
    });

    if (user) {
      res.status(401);
      throw new Error("이미 가입한 사람");
    }
    const createUser = await User.create({
      name,
      password,
      address,
      phone,
    });

    const createCoupon = await Coupon.create({
      name: "신규가입쿠폰",
      user_id: createUser.id,
      value: "모두사는거가능",
    });
    // const createCoupon2 = await Coupon.create({
    //   name: "신규가입쿠폰2",
    //   user_id: createUser.id,
    //   value: "모두사는거가능2",
    // });

    let token = generateToken(createUser.id);

    res.send({ createUser, token });
  }),
  logout: asyncHandler(async (req, res) => {
    res.send("토큰을 클라이언트에서 없애서 잘 로그아웃 됨");
  }),
};
