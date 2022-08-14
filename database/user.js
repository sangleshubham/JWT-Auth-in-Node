import mongoose from "mongoose";
import bcrypt from "bcrypt";

// validator library with many validation inbuilt
import validator from "validator";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Failed to set email"],
    unique: true,
    lowercase: true, // convert email to lower case and then insert in database
    validate: [
      (userEmail) => {
        // validate :  ( validation function , error message )
        return validator.isEmail(userEmail);
      },
      " Pls enter valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Failed to set password"], // [value , 'error message']
    minlength: [6, "Minimum length is 6"],
  },
});

// mongoose hooks   // After save
UserSchema.post("save", (doc, next) => {
  // gets called only when record is saved and not on validation error
  console.log(doc);
  next();
});

// before save
UserSchema.pre("save", async function (next) {
  // we use normal function so we can access 'this' keyword
  const salt = await bcrypt.genSalt(); // get salt
  this.password = await bcrypt.hash(this.password, salt); // hash password // {salt}{password} eg. pass = Yzng76Password@123  // Yzng76 is salt
  next();
});

export default mongoose.model("user", UserSchema); // schema name must be sigular, created collection will have 's' at the end
