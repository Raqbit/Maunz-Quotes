import * as express from 'express';

class HTTPRoute {


    public router: express.Router;

    constructor() {
        this.router = express.Router({mergeParams: true});
    }
}

export default HTTPRoute;