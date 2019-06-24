import {IUser} from "../models/user";

export interface UserService {
	configure(): void;

	getOnlinePlayers(): Promise<IUser[]>;
}