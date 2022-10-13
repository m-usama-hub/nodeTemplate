const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const winnerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    announced: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

winnerSchema.plugin(toJSON);

const prizeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    winner: winnerSchema,
  },
  {
    timestamps: true,
  }
);

prizeSchema.plugin(toJSON);

const noteSchema = mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    type: {
      type: String,
      enum: ['earlyBid', 'widthdrawDate', 'other'],
      default: 'other',
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.plugin(toJSON);

const campaignSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required'],
    },
    maxStock: {
      type: Number,
      required: true,
    },
    soldStock: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['finished', 'publish', 'draft', 'closed'],
      default: 'draft',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    prizes: {
      type: [prizeSchema],
      default: [],
    },
    notes: {
      type: [noteSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

campaignSchema.plugin(toJSON);
campaignSchema.plugin(paginate);

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
