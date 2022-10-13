const httpStatus = require('http-status');
const Coupon = require('../models/coupon.model');
const ApiError = require('../utils/ApiError');

const createCoupon = async (body) => {
  return Coupon.create(body);
};
module.exports = { createCoupon };
