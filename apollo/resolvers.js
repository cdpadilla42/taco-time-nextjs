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
      const newItem = new Item(args.input);
      console.log(
        { newItem },
        'cust',
        newItem.customizations,
        'options',
        newItem.customizations.options
      );

      newItem.save((err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log(result);
        }
      });
      return newItem;
    },
  },
};
