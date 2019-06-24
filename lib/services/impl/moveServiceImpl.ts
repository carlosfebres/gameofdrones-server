import {IMove, Move} from "../../models/move";
import {MoveService} from "../moveService";

export class MoveServiceImpl implements MoveService {

	getAllMoves(): Promise<IMove[]> {
		return Move.find({}).exec();
	}


	getMoveById(id: string): Promise<IMove> {
		const move = Move.findById(id).exec();
		if (move) {
			return move as Promise<IMove>;
		}
		throw new Error(`Move not found with id '${id}'.`);
	}

}