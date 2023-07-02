const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  firstName: {
     type: String,
     require: true,
     trim: true,
     min: 3,
     max: 20,
  },
  lastName: {
     type: String,
     require: true,
     trim: true,
     min: 3,
     max: 20,
  },
  username: {
     type: String,
     require: true,
     trim: true,
     unique: true,
     lowercase: true,
     index: true,
  },
  email: {
     type: String,
     require: true,
     trim: true,
     unique: true,
     lowercase: true,
  },
  hash_password: {
     type: String,
     require: true,
  },
  role: {
     type: String,
     enum: ["user", "admin"],
     default: "user",
  },
  age: {
   type: Number,
  },
  weight: {
   type: Number,
  },
  height: {
   type: Number,
  },
  profilePicture: {
   contentType: String,
   data: Buffer
  },
  medical_condition: {
     type: String,
  },
  religion: {
     type: String,
  },
  occupation: {
     type: String,
  },
  tribe: {
     type: String,
  },
  gender: {
     type: String,
  },
},{ timestamps: true });
//For get fullName from when we get data from database
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
userSchema.method({
  async authenticate(password) {
     return bcrypt.compare(password, this.hash_password);
  },
});

userSchema.statics.getUserByIds = async function (ids) {
   try {
      const users = await this.find({ _id: { $in: ids } });
      return users;
    } catch (error) {
      throw error;
    }
}

module.exports = mongoose.model("User", userSchema);