import {IUser} from "../models/user";

export interface UserService {
	configure(): void;

	getOnlinePlayers(socketId: string): Promise<IUser[]>;

	registrate(nickname: string, socketId: string): void;

	getUserBySocketid(id: string): Promise<IUser>;

	getUserByNickname(nickname: string): Promise<IUser>;

	removeSocket(id: string): void;
}