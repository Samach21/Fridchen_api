var mongoose = require('mongoose')

const UserSchema  = new mongoose.Schema({
    name: String,
    email: String,
    family_ids: [],
})

const User = mongoose.model('user', UserSchema)

module.exports = User;