import * as SocketIo from "socket.io";
import {userService} from "../../services/services";
import {SocketServer} from "../socketServer";
import {Server} from "http";

export class SocketIoServer implements SocketServer{

	public socketIo: SocketIo.Server;

	constructor(
		public httpServer: Server
	) {
		this.socketIo = SocketIo(httpServer);
	}

	start() {
		this.socketIo.on("connection", async client => {
			client.emit("configure", await userService.configure());
		});
		this.socketIo.serveClient();
	}
}