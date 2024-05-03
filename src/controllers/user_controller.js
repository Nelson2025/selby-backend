const UserModel = require("../models/user_model");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const key = "otp-secretKey";
var axios = require("axios");

const UserController = {
  userAccount: async function (req, res) {
    try {
      const userData = req.body;

      const foundUser = await UserModel.findOne({ phone: userData.phone });

      if (!foundUser) {
        const newUser = new UserModel(userData);

        try {
          await newUser.save();
        } catch (ex) {
          console.log(ex);
        }

        return res.json({
          success: true,
          data: newUser,
          message: "User Account Created",
        });
      }

      return res.json({
        success: true,
        data: foundUser,
        message: "User Exists!",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  signIn: async function (req, res) {
    try {
      const { phone } = req.body;

      const foundUser = await UserModel.findOne({ phone: phone });
      if (!foundUser) {
        return res.json({ success: false, message: "User Not Found" });
      }

      return res.json({ success: true, data: foundUser });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  createOtp: async function (req, res) {
    try {
      const otp = otpGenerator.generate(4, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const ttl = 5 * 60 * 1000;
      const expires = Date.now() + ttl;
      const data = `${req.body.phone}.${otp}.${expires}`;
      const hash = crypto.createHmac("sha256", key).update(data).digest("Hex");
      const fullHash = `${hash}.${expires}`;

      //send SMS
      axios
        .post("http://neat.freebeesms.com/api/send/sms", {
          campaign_name: "cam1",
          auth_key: "867bc2deb021b4b5d4ac33ad38bdbe0b",
          receivers: `${req.body.phone}`,
          sender: "NEXTGT",
          route: "TR",
          message: {
            msgdata: `Your SELBY one-time password (OTP) is ${otp} for registration. The validity of this code is 10 minutes. BoroNextgen`,
            Template_ID: "1707171291431756246",
            coding: "1",
            flash_message: 1,
            scheduleTime: "",
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      return res.json({
        success: true,
        data: { fullHash: fullHash, phone: req.body.phone, otp: otp },
        message: "Success",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  verifyOtp: async function (req, res) {
    try {
      let [hashValue, expires] = req.body.hash.split(".");

      let now = Date.now();
      if (now > parseInt(expires))
        return res.json({ success: false, message: "OTP Expired" });

      let data = `${req.body.phone}.${req.body.otp}.${expires}`;
      let newCalculateHash = crypto
        .createHmac("sha256", key)
        .update(data)
        .digest("Hex");

      if (newCalculateHash === hashValue) {
        return res.json({
          success: true,
          data: { newCalculateHash, phone: req.body.phone },
          message: "Success",
        });
      } else {
        return res.json({
          success: true,
          data: { newCalculateHash: "", phone: req.body.phone },
          message: "OTP Invalid",
        });
      }
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  updateUser: async function (req, res) {
    try {
      const userId = req.params.id;
      const updateData = req.body;

      const updatedUser = await UserModel.findByIdAndUpdate(
        { _id: userId },
        updateData,
        { new: true }
      );

      if (!updatedUser) {
        throw "User Not Found!";
      }

      return res.json({
        success: true,
        data: updatedUser,
        message: "User Updated",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchUserById: async function (req, res) {
    try {
      const id = req.params.id;

      const foundUser = await UserModel.findById(id);

      if (!foundUser) {
        return res.json({ success: false, message: "User Not Found" });
      }

      return res.json({
        success: true,
        data: [foundUser],
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  getAllUsers: async function (req, res, next) {
    try {
      const users = await Users.find({ _id: { $ne: req.userId } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      return res.status(400).json({ status: false, error: ex });
    }
  },
};

module.exports = UserController;
