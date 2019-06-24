import {UserService} from "../userService";
import {moveService} from "../services";
import {IUser, User} from "../../models/user";

export class UserServiceImpl implements UserService {

	async configure() {
		return {
			moves: await moveService.getAllMoves()
		};
	}

	getOnlinePlayers(socketId: string): Promise<IUser[]> {
		return User.find({playing: false, $and: [{socketId: {$ne: socketId}}, {socketId: {$ne: null}}]}).exec();
	}

	async registrate(nickname: string, socketId: string) {
		const storedUser = await User.findOne({nickname}).exec();
		await User.updateMany({socketId}, {socketId: null}).exec();
		if (storedUser) {
			storedUser.socketId = socketId;
			await storedUser.save();
		} else {
			// Store a new User
			const user = new User({
				nickname,
				socketId
			});
			await user.save();
		}
	}

	getUserBySocketid(id: string): Promise<IUser> {
		const user = User.findOne({socketId: id}).exec();
		if (user) {
			return user as Promise<IUser>;
		}
		throw new Error(`User not found with Socket '${id}'.`);
	}

	getUserByNickname(nickname: string): Promise<IUser> {
		const user = User.findOne({nickname}).exec();
		if (user) {
			return user as Promise<IUser>;
		}
		throw new Error(`User not found with nickname '${nickname}'.`);
	}

	removeSocket(id: string): void {
		User.updateMany({socketId: id}, {socketId: null}).exec();
	}

}