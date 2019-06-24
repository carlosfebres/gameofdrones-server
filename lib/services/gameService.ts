import {IUser} from "../models/user";
import {IGame} from "../models/game";

export interface GameService {
	createGameRequest(from: IUser, to: IUser): Promise<IGame>;

	getGameById(game: string): Promise<IGame> ;
}