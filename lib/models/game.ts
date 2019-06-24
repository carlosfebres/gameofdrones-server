import * as mongoose from "mongoose";
import {Document, Schema} from "mongoose";
import {IUser} from "./user";
import {IMove} from "./move";

export interface IGame extends Document {
	winner: IUser;
	looser: IUser;
	moves: {
		byWinner: IMove,
		byLooser: IMove
	};
	createdAt: Date;
}

export const GameSchema = new Schema({
	winner: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	looser: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	moves: [{
		byWinner: {type: Schema.Types.ObjectId, ref: "Move"},
		byLooser: {type: Schema.Types.ObjectId, ref: "Move"}
	}],
	createdAt: {type: Date, default: Date.now}
});

export const Game = mongoose.model<IGame>("Game", GameSchema);