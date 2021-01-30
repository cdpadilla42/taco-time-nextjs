import { Item } from './item';
import stripe from '../lib/stripe';

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
      console.log('args', args);
      const newItem = await new Item(args.input);
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
    async createOrder(_, args, ctx, info) {
      // 1. Recalculate the total for the price
      const order = args.cart.cart;
      const orderIDS = order.map((item) => item.id);
      const itemsFromDB = await Item.find().where('_id').in(orderIDS).exec();
      console.log(itemsFromDB);
      // iterating through original order in case of duplicate items. Mongoose does not find these.
      order.reduce((prev, item) => {
        // find the matching item
        const matchedItem = itemsFromDB.find((dbItem) => dbItem._id == item.id);
        // find the price
        console.log('matched item', matchedItem);
        // find the customization price
        let addOns = 0;
        if (item.selectedOptions) {
          console.log('searching for addons');
          // todo reduce the selectedOptions to their total additional price
          addOns = Object.keys(item.selectedOptions).reduce((prev, key) => {
            console.log(
              `searching for value of ${key} : ${item.selectedOptions[key]}`
            );
            const value = item.selectedOptions[key];
            const foundOption = matchedItem.customizations.find(
              (customization) => customization.name === key
            );
            console.log('foundOption', foundOption);
            const foundCustomization = foundOption.options.find(
              (option) => option.name == value
            );
            console.log('found customization', foundCustomization);
            if (foundCustomization.price) {
              return foundCustomization.price + prev;
            }
            return prev;
          }, 0);
        }
        // TODO almost there! Figure out what's going on here!
        // add together and multiply by quantity
        const totalCostofSingleItem = (price + addOns) * item.quantity;
        // add to current total
        return prev + totalCostofSingleItem;
      }, 0);

      console.log('calculated total');

      const amount = 500;
      // 2. Create the stripe charge
      // TODO UNCOMMENT WHEN READY TO HOOK UP
      // const charge = await stripe.charges.create({
      //   amount,
      //   currency: 'usd',
      //   source: args.token,
      //   description: 'greetings from the resolver',
      // });
      console.log(charge);
      // 3. Convert CartItems to OrderItems
      // 4. Clean up Cart
      // 5. Return order to the client
      return args;
    },
  },
};
