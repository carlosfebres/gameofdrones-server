import * as express from "express";

export class Routes {
	public routes(app: express.Application): void {
		app.route('/');
	}
}
