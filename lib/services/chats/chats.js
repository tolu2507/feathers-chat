"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
const authentication_1 = require("@feathersjs/authentication");
const schema_1 = require("@feathersjs/schema");
const chats_schema_1 = require("./chats.schema");
const chats_class_1 = require("./chats.class");
const chats_shared_1 = require("./chats.shared");
const log_runtime_1 = require("../../hooks/log-runtime");
__exportStar(require("./chats.class"), exports);
__exportStar(require("./chats.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const chat = (app) => {
    // Register our service on the Feathers application
    app.use(chats_shared_1.chatPath, new chats_class_1.ChatService((0, chats_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: chats_shared_1.chatMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(chats_shared_1.chatPath).hooks({
        around: {
            all: [
                log_runtime_1.logRuntime,
                (0, authentication_1.authenticate)('jwt'),
                schema_1.hooks.resolveExternal(chats_schema_1.chatExternalResolver),
                schema_1.hooks.resolveResult(chats_schema_1.chatResolver)
            ]
        },
        before: {
            all: [schema_1.hooks.validateQuery(chats_schema_1.chatQueryValidator), schema_1.hooks.resolveQuery(chats_schema_1.chatQueryResolver)],
            find: [],
            get: [],
            create: [schema_1.hooks.validateData(chats_schema_1.chatDataValidator), schema_1.hooks.resolveData(chats_schema_1.chatDataResolver)],
            patch: [schema_1.hooks.validateData(chats_schema_1.chatPatchValidator), schema_1.hooks.resolveData(chats_schema_1.chatPatchResolver)],
            remove: []
        },
        after: {
            all: []
        },
        error: {
            all: []
        }
    });
};
exports.chat = chat;
//# sourceMappingURL=chats.js.map