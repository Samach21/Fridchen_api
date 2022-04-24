var mongoose = require('mongoose')

const UserSchema  = new mongoose.Schema({
    id: {type: String, unique: true, required : true},
    email: {type: String, unique: true, required : true},
    family_ids: [mongoose.Schema.Types.ObjectId]
})

const User = mongoose.model('user', UserSchema)

module.exports = User;