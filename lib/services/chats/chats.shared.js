"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatClient = exports.chatMethods = exports.chatPath = void 0;
exports.chatPath = 'chats';
exports.chatMethods = ['find', 'get', 'create', 'patch', 'remove'];
const chatClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.chatPath, connection.service(exports.chatPath), {
        methods: exports.chatMethods
    });
};
exports.chatClient = chatClient;
//# sourceMappingURL=chats.shared.js.map