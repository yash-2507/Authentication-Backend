const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
   {
      name: {
         type: String,
         required: [true, "Please add a name"],
      },
      email: {
         type: String,
         required: [true, "Please add an e-mail"],
         unique: true,
      },
      password: {
         type: String,
         required: [true, "Please add a password"],
         minLength: 6,
         select: false,
         createdAt: {
            type: Date,
            default: Date.now,
         },
      },
   },
);

UserSchema.pre("save", async function (next) {
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

UserSchema.methods.getJwtToken = function () {
   return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
   });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

const User = model("User", UserSchema);

module.exports = User;
