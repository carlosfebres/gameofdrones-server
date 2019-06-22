import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
	name: {type: String},
	socketId: {type: String},
	playing: {type: Boolean, default: false}
});

export const User = mongoose.model("User", UserSchema);