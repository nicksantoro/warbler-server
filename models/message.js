const mongoose = require('mongoose');
// bring in user model because we want to make every message have a refernce to the user that created it
const User = require("./user");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
    timestamps: true
  })

// pre remove hook
// find user
// remove the id of the message form their message lists
// save that user
// return next
messageSchema.pre('remove', async function (next) {
  try {
    let user = await User.findById(this.user);
    user.message.remove(this.id);
    await user.save();
    return next();

  } catch (e) {
    return next(err);
  }
})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;