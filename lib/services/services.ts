import {MoveServiceImpl} from "./impl/moveServiceImpl";
import {MoveService} from "./moveService";
import {UserServiceImpl} from "./impl/userServiceImpl";
import {UserService} from "./userService";

export const moveService: MoveService = new MoveServiceImpl();
export const userService: UserService = new UserServiceImpl();