import mongoose, { Schema } from 'mongoose';

const OrderItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new Schema({
  items: [OrderItemSchema],
  total: {
    type: Number,
    required: true,
  },
  charge: {
    type: String,
    required: true,
  },
});

export const Order =
  mongoose.models.orders || mongoose.model('orders', OrderSchema);
