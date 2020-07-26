import { gql } from 'apollo-server-express';

const typeDefs = gql`
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
`

export default typeDefs;