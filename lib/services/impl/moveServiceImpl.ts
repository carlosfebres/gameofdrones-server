import {Move} from "../../models/move";
import {MoveService} from "../moveService";

export class MoveServiceImpl implements MoveService{

	getAllMoves() {
		return Move.find({}).exec();
	}

}