import mongoose, { Schema } from 'mongoose';

const OptionsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
});

const CustomizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: true,
  },
  options: [OptionsSchema],
  selectMultiple: {
    type: Boolean,
    required: true,
  },
});

const ItemSchema = new Schema({
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  price: {
    type: Number,
    required: true,
  },
  customizations: [CustomizationSchema],
});

export const Item =
  mongoose.models.items || mongoose.model('items', ItemSchema);
