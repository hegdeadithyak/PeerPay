const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://hegdeadithyak:adi4720Q@prjct.0cc2j4d.mongodb.net/")
.then(() => {
    console.log('Connected to MongoDB');
})
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const AccountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required: true
    },
    balance : {
        type : Number,
        required : true
    }
})

const Account = mongoose.model('Account',AccountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account
};