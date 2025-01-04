const mongoose = require('mongoose');
const { isEmail, isMobilePhone } = require('validator');
const bcrypt = require('bcrypt');

// Define the User Schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: isEmail,
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  phonenumber: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function (value) {
        return isMobilePhone(value, 'any', { strictMode: false }); 
      },
      message: 'Invalid phone number',
    },
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
});

// Create the User Model
const User = mongoose.model('User', userSchema);

module.exports = User;

//Hash the password before saving the user
// userSchema.pre('save', async function (next) {
//   const user = this;

//   // If the password hasn't been modified, skip hashing
//   if (!user.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(10); // Generate a salt
//     user.password = await bcrypt.hash(user.password, salt); // Hash the password
//     next();
//   } catch (err) {
//     next(err);
//   }
// });



// //Method to compare a given password with the hashed password
// userSchema.methods.comparePassword = async function (inputPassword) {
//   return bcrypt.compare(inputPassword, this.password); // `this.password` is the hashed password
// };
