import * as mongoose from "mongoose";
import {Schema, Document} from "mongoose";

export interface IMove extends Document {
	name: string;
	image: string;
	beats: IMove[];
}

export const MoveSchema = new Schema({
	name: {type: String},
	image: {type: String},
	beats: [{type: Schema.Types.ObjectId, ref: "Move"}]
});

export const Move = mongoose.model<IMove>("Move", MoveSchema);