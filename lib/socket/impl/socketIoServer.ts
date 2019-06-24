import * as SocketIo from "socket.io";
import {Socket} from "socket.io";
import {userService} from "../../services/services";
import {SocketServer} from "../socketServer";
import {Server} from "http";

export class SocketIoServer implements SocketServer {

	public socketIo: SocketIo.Server;

	constructor(
		public httpServer: Server
	) {
		this.socketIo = SocketIo(httpServer);
	}

	start() {
		this.socketIo.on("connection", async (socket: Socket) => {
			console.log("Player Connected");
			socket.emit("configure", await userService.configure());
			this.playerEvents(socket)
		});
		const socketServerPort = 2999;
		this.socketIo.listen(socketServerPort);
		console.log("Socket server listening on port " + socketServerPort);
	}

	playerEvents(socket: Socket) {
		socket.on("getOnlinePlayers", async () => {
			socket.emit("onlinePlayers", await userService.getOnlinePlayers());
		});
	}

}