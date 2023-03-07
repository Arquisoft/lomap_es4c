const mongooseUsers = require("mongoose")

const userSchema = mongooseUsers.Schema({
    name: String,
    surname: String,
    email: String,
    username: String,
    password: String,
    role: Number
})

module.exports = mongooseUsers.model("Users", userSchema)
