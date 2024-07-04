const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const { toJSON, paginate } = require("./plugins");

const usersSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);

usersSchema.plugin(toJSON);
usersSchema.plugin(paginate);

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

usersSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
