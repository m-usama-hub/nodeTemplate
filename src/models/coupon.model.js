const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const couponSchema = mongoose.Schema(
  {
    couponNo: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
      required: [true, 'Order is required'],
    },
    campaign: {
      type: mongoose.Schema.ObjectId,
      ref: 'Campaign',
      required: [true, 'Campaign is required'],
    },
  },
  {
    timestamps: true,
  }
);

couponSchema.plugin(toJSON);
couponSchema.plugin(paginate);

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
