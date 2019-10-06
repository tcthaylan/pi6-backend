const { Schema, model } = require('../database/index');

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  endereco: {
    endereco: String,
    numero: Number,
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("Restaurant", RestaurantSchema);