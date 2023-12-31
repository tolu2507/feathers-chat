"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const chats_1 = require("./chats/chats");
const users_1 = require("./users/users");
const services = (app) => {
    app.configure(chats_1.chat);
    app.configure(users_1.user);
    // All services will be registered here
};
exports.services = services;
//# sourceMappingURL=index.js.map