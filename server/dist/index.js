"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.PORT || 8080;
// Server settings
app.disable('x-powered-by');
app.set('trust proxy', 1);
// MIDDLEWARE
app.use(morgan_1.default('combined'));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
app.use(helmet_1.default());
// Apollo Server
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    introspection: true,
    playground: {
        settings: {
            'request.credentials': 'include',
        },
    },
});
app.get(`/playground`, graphql_playground_middleware_express_1.default({ endpoint: '/graphql' }));
app.get("/", (req, res) => {
    res.send("Hello World");
});
apolloServer.applyMiddleware({ app });
app.listen(port, () => {
    console.log(`Server listening on http://localhost${port}`);
});
function shutdown() {
    // @ts-ignore
    app.close(function onServerClosed(err) {
        if (err) {
            console.error(err);
            process.exitCode = 1;
        }
        process.exit();
    });
}
// Cleanup
process.on('SIGINT', function onSigint() {
    console.info('Got SIGINT. Graceful shutdown: ', new Date().toISOString());
    shutdown();
});
process.on('SIGTERM', function onSigterm() {
    console.info('Got SIGTERM (Docker container stop). Graceful shutdown: ', new Date().toISOString());
    shutdown();
});
//# sourceMappingURL=index.js.map