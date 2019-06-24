import * as mongoose from 'mongoose';
import {Schema, Document} from "mongoose";

export interface IUser extends Document {
	nickname: string,
	socketId: string,
	playing: boolean,
	createdAt: Date
}

export const UserSchema = new Schema({
	nickname: {type: String},
	socketId: {type: String},
	playing: {type: Boolean, default: false},
	createdAt: {type: Date, default: Date.now}
});

export const User = mongoose.model<IUser>("User", UserSchema);