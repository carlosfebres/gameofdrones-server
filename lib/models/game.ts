import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

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

export const Game = mongoose.model("Game", GameSchema);