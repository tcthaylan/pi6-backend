const mongoosePaginate = require('mongoose-paginate')
const { Schema, model } = require('../database/index');

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  endereco: {
    endereco: String,
    numero: String,
    bairro: String,
    complemento: String,
    cep: String,
    uf: String,
    cidade: String
  },
  picture: String,
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

RestaurantSchema.plugin(mongoosePaginate);

module.exports = model("Restaurant", RestaurantSchema);