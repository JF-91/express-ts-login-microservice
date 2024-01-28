"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router_1 = require("./router");
class App {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.config();
        this.router();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    router() {
        this.app.use('/', router_1.default.config);
    }
    listening() {
        this.app.listen(this.port, () => {
            console.log('Express server listening on port ' + this.port);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map