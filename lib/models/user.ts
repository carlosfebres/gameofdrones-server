import * as mongoose from 'mongoose';
import {Schema, Document} from "mongoose";

export interface IUser extends Document {
	name: string,
	socketId: string,
	playing: boolean
}

export const UserSchema = new Schema({
	name: {type: String},
	socketId: {type: String},
	playing: {type: Boolean, default: false}
});

export const User = mongoose.model<IUser>("User", UserSchema);