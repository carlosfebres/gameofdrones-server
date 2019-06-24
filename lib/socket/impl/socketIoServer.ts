import * as SocketIo from "socket.io";
import {Socket} from "socket.io";
import {gameService, moveService, userService} from "../../services/services";
import {SocketServer} from "../socketServer";
import {Server} from "http";
import {IUser} from "../../models/user";

export class SocketIoServer implements SocketServer {

	public socketIo: SocketIo.Server;

	constructor(
		public httpServer: Server
	) {
		this.socketIo = SocketIo(httpServer);
	}

	start() {
		this.socketIo.on("connection", (socket: Socket) => {
			console.log("Player Connected");
			this.playerEvents(socket);
		});
		const socketServerPort = 2999;
		this.socketIo.listen(socketServerPort);
		console.log("Socket server listening on port " + socketServerPort);
	}

	async playerEvents(socket: Socket) {
		socket.emit("configure", await userService.configure());
		socket.on("disconnect", () => {
			userService.removeSocket(socket.id);
		});
		socket.on("registerPlayer", async (nickname: string) => {
			userService.registrate(nickname, socket.id);
		});
		socket.on("getOnlinePlayers", async () => {
			socket.emit("onlinePlayers", await userService.getOnlinePlayers(socket.id));
		});
		socket.on("requestGame", async (toNickname: string) => {
			const from = await userService.getUserBySocketid(socket.id);
			from.playing = true;
			await from.save();
			const to = await userService.getUserByNickname(toNickname);
			const game = await gameService.createGameRequest(from, to);
			socket.to(to.socketId).emit('gameRequest', {
				from: from.nickname,
				game: game.id
			});
		});
		socket.on("gameResponse", async data => {
			const game = await gameService.getGameById(data.game);
			socket.to(game.player1.socketId).emit("gameResponse", {accepted: data.accepted, game: game});
			if (data.accepted) {
				game.player2.playing = true;
				game.player2.save();
				socket.emit("startGame", {game: game, player: game.player1.nickname});
			} else {
				game.player2.playing = false;
				game.player2.save();
				game.remove();
			}
		});
		socket.on("moveSelected", async data => {
			const game = await gameService.getGameById(data.game._id);
			const player = await userService.getUserBySocketid(socket.id);
			let otherPlayer: IUser;
			const move = await moveService.getMoveById(data.move._id);
			let round;
			if (game.rounds.length) {
				const lastRound = game.rounds[game.rounds.length - 1];
				if (lastRound.byPlayer1 === null || lastRound.byPlayer2 === null) {
					round = lastRound;
				}
			}
			if (!round) {
				round = {
					byPlayer1: game.player1.nickname === player.nickname ? move : null,
					byPlayer2: game.player1.nickname !== player.nickname ? move : null
				};
				game.rounds.push(round);
			} else {
				if (game.player1.nickname === player.nickname) {
					round.byPlayer1 = move;
				} else {
					round.byPlayer2 = move;
				}
			}

			otherPlayer = game.player1.nickname !== player.nickname ? game.player1 : game.player2;

			await game.save();

			if (round.byPlayer1 && round.byPlayer2) {
				socket.emit('revealMoves', {round, game});
				socket.to(otherPlayer.socketId).emit('revealMoves', {round, game});
			}
		});
		socket.on("gameFinished", async data => {
			const game = await gameService.getGameById(data.game._id);
			game.player1.playing = false;
			game.player2.playing = false;
			await game.player1.save();
			await game.player2.save();
		});
	}

}