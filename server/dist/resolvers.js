"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        healthCheck: (obj, args, context) => ({
            memoryusage: process.memoryUsage(),
            uptime: process.uptime(),
        }),
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map