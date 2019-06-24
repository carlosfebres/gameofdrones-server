import * as mongoose from "mongoose";
import {Document, Schema} from "mongoose";
import {IUser} from "./user";
import {IMove} from "./move";

export interface IGame extends Document {
	player1: IUser;
	player2: IUser;
	rounds: {
		byPlayer1: IMove | null,
		byPlayer2: IMove | null
	}[];
	createdAt: Date;
}

export const GameSchema = new Schema({
	player1: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	player2: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	rounds: [{
		byPlayer1: {type: Schema.Types.ObjectId, ref: "Move"},
		byPlayer2: {type: Schema.Types.ObjectId, ref: "Move"}
	}],
	createdAt: {type: Date, default: Date.now}
});

export const Game = mongoose.model<IGame>("Game", GameSchema);