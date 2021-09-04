const mongoose = require("mongoose")

const schema = mongoose.Schema({
	firstname: {type:String, unique:true},
})

module.exports = mongoose.model("User", schema)