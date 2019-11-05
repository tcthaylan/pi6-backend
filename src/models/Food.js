const mongoosePaginate = require('mongoose-paginate')
const { Schema, model } = require('../database/index');

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  picture: String,
  price: Number,
  restaurant_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

FoodSchema.plugin(mongoosePaginate);

module.exports = model("Food", FoodSchema);