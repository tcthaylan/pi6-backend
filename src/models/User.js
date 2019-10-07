const { Schema, model } = require('../database/index');
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  restaurants: [{
    type: Schema.Types.ObjectId,
    ref: "Restaurant"
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
})

const User = model('User', UserSchema);

module.exports = User;