const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://hegdeadithyak:hegdeadithyak@prjct.0cc2j4d.mongodb.net/")
.then(() => {
    console.log('Connected to MongoDB');
})
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
	User
};