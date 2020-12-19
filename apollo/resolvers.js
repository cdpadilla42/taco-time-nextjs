export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return { id: 1, name: 'John Smith', status: 'cached' };
    },

    item() {
      return { message: 'items here!' };
    },
  },
  Mutation: {
    addItem(_, args) {
      console.log(args);
      return args.input;
    },
  },
};
