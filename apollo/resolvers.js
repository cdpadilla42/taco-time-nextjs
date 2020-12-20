import { Item } from './item';

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
      const newItem = new Item({
        name: 'Test',
        price: 1000,
        img: 'cool',
      });

      newItem.save((err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log(result);
        }
      });
      console.log(args);
      return args.input;
    },
  },
};
