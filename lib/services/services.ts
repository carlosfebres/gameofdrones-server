import {MoveServiceImpl} from "./impl/moveServiceImpl";
import {MoveService} from "./moveService";
import {UserServiceImpl} from "./impl/userServiceImpl";
import {UserService} from "./userService";
import GameServiceImpl from "./impl/gameServiceImpl";
import {GameService} from "./gameService";

export const moveService: MoveService = new MoveServiceImpl();
export const userService: UserService = new UserServiceImpl();
export const gameService: GameService = new GameServiceImpl();