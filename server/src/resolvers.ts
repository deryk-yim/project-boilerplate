const resolvers = {
  Query: {
    healthCheck: (obj: any, args: any, context: any) => ({
      memoryusage: process.memoryUsage(),
      uptime: process.uptime(),
    }),
  },
};

export default resolvers;
