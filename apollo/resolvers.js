import { Item } from './item';

export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return { id: 1, name: 'John Smith', status: 'cached' };
    },

    async item() {
      const result = await Item.find({});
      console.log(result);
      return result;
    },

    async itemById(_, { id }) {
      const result = await Item.findById(id);
      return result;
    },
  },
  Mutation: {
    // Possible enhancement: Seperate Customization entries to be reusable between items
    async addItem(_, args) {
      const newItem = new Item(args.input);
      console.log(
        { newItem },
        'cust',
        newItem.customizations,
        'options',
        newItem.customizations.options
      );

      const result = await newItem.save((err, result) => {
        if (err) {
          return console.error(err);
        } else {
          console.log(result);
          return newItem;
        }
      });
      return result;
    },
  },
};
