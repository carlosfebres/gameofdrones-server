import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as http from "http";
import {Routes} from "./routes/routes";
import {SocketServer} from "./socket/socketServer";
import {SocketIoServer} from "./socket/impl/socketIoServer";

class App {

	public app: express.Application;
	public routePrv: Routes = new Routes();

	constructor() {
		this.app = express();
		this.config();
		this.mongoSetup();
		this.socketSetup();
		this.routePrv.routes(this.app);
	}

	private config() {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({extended: false}));
	}

	private mongoSetup() {
		mongoose.connect("mongodb://localhost/gameofdrones", {useNewUrlParser: true});
	}

	private socketSetup() {
		const httpServer = http.createServer();
		const socketServer: SocketServer = new SocketIoServer(httpServer);
		socketServer.start();
	}
}

export default new App().app;