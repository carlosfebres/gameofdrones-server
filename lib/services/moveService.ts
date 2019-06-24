import {IMove} from "../models/move";

export interface MoveService {
	getAllMoves(): Promise<any[]>;

	getMoveById(id: string): Promise<IMove> ;
}