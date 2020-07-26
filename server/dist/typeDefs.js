"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = apollo_server_express_1.gql `
  type ServerHealth {
    memoryusage: MemoryUsage
    uptime: String
  }

  type MemoryUsage {
    rss: Int
    heapTotal: Int
    heapUsed: Int
    external: Int
  }

  type Query {
    healthCheck: ServerHealth
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map