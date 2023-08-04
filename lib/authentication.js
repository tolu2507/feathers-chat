"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
const authentication_1 = require("@feathersjs/authentication");
const authentication_local_1 = require("@feathersjs/authentication-local");
const authentication_oauth_1 = require("@feathersjs/authentication-oauth");
const authentication = (app) => {
    const authentication = new authentication_1.AuthenticationService(app);
    authentication.register('jwt', new authentication_1.JWTStrategy());
    authentication.register('local', new authentication_local_1.LocalStrategy());
    authentication.register('google', new authentication_oauth_1.OAuthStrategy());
    authentication.register('github', new authentication_oauth_1.OAuthStrategy());
    authentication.register('auth0', new authentication_oauth_1.OAuthStrategy());
    app.use('authentication', authentication);
    app.configure((0, authentication_oauth_1.oauth)());
};
exports.authentication = authentication;
//# sourceMappingURL=authentication.js.map