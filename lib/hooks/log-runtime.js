"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRuntime = void 0;
const logger_1 = require("../logger");
const logRuntime = async (context, next) => {
    console.log(`Running hook log-runtime on ${context.path}.${context.method}`);
    const startTime = Date.now();
    await next();
    const duration = Date.now() - startTime;
    logger_1.logger.info(`Calling ${context.method} on ${context.path} took ${duration}ms`);
};
exports.logRuntime = logRuntime;
//# sourceMappingURL=log-runtime.js.map