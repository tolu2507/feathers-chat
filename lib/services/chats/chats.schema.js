"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatQueryResolver = exports.chatQueryValidator = exports.chatQuerySchema = exports.chatQueryProperties = exports.chatPatchResolver = exports.chatPatchValidator = exports.chatPatchSchema = exports.chatDataResolver = exports.chatDataValidator = exports.chatDataSchema = exports.chatExternalResolver = exports.chatResolver = exports.chatValidator = exports.chatSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const typebox_2 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
const users_schema_1 = require("../users/users.schema");
// Main data model schema
exports.chatSchema = typebox_1.Type.Object({
    _id: (0, typebox_2.ObjectIdSchema)(),
    text: typebox_1.Type.String(),
    createdAt: typebox_1.Type.Number(),
    userId: typebox_1.Type.String({ objectid: true }),
    user: typebox_1.Type.Ref(users_schema_1.userSchema)
}, { $id: 'Chat', additionalProperties: false });
exports.chatValidator = (0, typebox_1.getValidator)(exports.chatSchema, validators_1.dataValidator);
exports.chatResolver = (0, schema_1.resolve)({
    user: (0, schema_1.virtual)(async (chat, context) => {
        return context.app.service('users').get(chat.userId);
    })
});
exports.chatExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.chatDataSchema = typebox_1.Type.Pick(exports.chatSchema, ['text'], {
    $id: 'ChatData'
});
exports.chatDataValidator = (0, typebox_1.getValidator)(exports.chatDataSchema, validators_1.dataValidator);
exports.chatDataResolver = (0, schema_1.resolve)({
    userId: async (_value, _message, context) => {
        // Associate the record with the id of the authenticated user
        return context.params.user._id;
    },
    createdAt: async () => {
        return Date.now();
    }
});
// Schema for updating existing entries
exports.chatPatchSchema = typebox_1.Type.Partial(exports.chatSchema, {
    $id: 'ChatPatch'
});
exports.chatPatchValidator = (0, typebox_1.getValidator)(exports.chatPatchSchema, validators_1.dataValidator);
exports.chatPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.chatQueryProperties = typebox_1.Type.Pick(exports.chatSchema, ['_id', 'text', 'createdAt', 'userId']);
exports.chatQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.chatQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.chatQueryValidator = (0, typebox_1.getValidator)(exports.chatQuerySchema, validators_1.queryValidator);
exports.chatQueryResolver = (0, schema_1.resolve)({
    userId: async (value, user, context) => {
        // We want to be able to find all messages but
        // only let a user modify their own messages otherwise
        if (context.params.user && context.method !== 'find') {
            return context.params.user._id;
        }
        return value;
    }
});
//# sourceMappingURL=chats.schema.js.map