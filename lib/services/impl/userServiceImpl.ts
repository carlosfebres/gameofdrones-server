import {UserService} from "../userService";
import {moveService, userService} from "../services";
import {User} from "../../models/user";

export class UserServiceImpl implements UserService {

	async configure() {
		return {
			moves: await moveService.getAllMoves()
		};
	}

	getOnlinePlayers() {
		return User.find({playing: false}).exec();
	}
}