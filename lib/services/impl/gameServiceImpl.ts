import {GameService} from "../gameService";
import {Game, IGame} from "../../models/game";
import {IUser} from "../../models/user";

export default class GameServiceImpl implements GameService {

	async createGameRequest(from: IUser, to: IUser): Promise<IGame> {
		const game = new Game({
			player1: from.id,
			player2: to.id,
			rounds: []
		});
		await game.save();
		return game;
	}

	getGameById(id: string): Promise<IGame> {
		const game = Game.findById(id).populate("player1 player2 rounds.byPlayer1 rounds.byPlayer2").exec();
		if (game) {
			return game as Promise<IGame>;
		}
		throw new Error(`Game not found with id '${id}'.`);
	}
}