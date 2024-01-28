"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
class AppRouter {
    static get config() {
        const router = (0, express_1.Router)();
        router.get('/api/login', loginController_1.login);
        router.post('/api/register', loginController_1.register);
        return router;
    }
}
exports.default = AppRouter;
//# sourceMappingURL=index.js.map