import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const MoveSchema = new Schema({
	name: {type: String},
	beats: [{type: Schema.Types.ObjectId, ref: "Move"}]
});

export const Move = mongoose.model("Move", MoveSchema);