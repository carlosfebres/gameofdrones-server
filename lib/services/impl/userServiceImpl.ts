import {UserService} from "../userService";
import {moveService} from "../services";

export class UserServiceImpl implements UserService {

	async configure() {
		return {
			moves: await moveService.getAllMoves()
		};
	}
}