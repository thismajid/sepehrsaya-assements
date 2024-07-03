const mongoose = require("mongoose");
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
    },
    password: { type: String, min: 6, required: true },
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

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
