import { Item } from './item';
import { Order } from './order';
import { calcCartTax } from '../lib/utility';
import stripe from '../lib/stripe';
import { array } from 'prop-types';

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

    async orderById(_, { id }) {
      const result = await Order.findById(id);
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
      let orderItems = [];
      console.log('itemsFromDB', itemsFromDB);
      console.log('order', order);
      // iterating through original order in case of duplicate items. Mongoose does not find these.
      const cartTotal = order.reduce((prev, item) => {
        // find the matching item
        const matchedItem = itemsFromDB.find((dbItem) => dbItem._id == item.id);
        // find the price
        console.log('matched item', matchedItem);
        // find the customization price
        let addOns = 0;
        if (item.selectedOptions) {
          console.log('searching for addons');
          addOns = Object.keys(item.selectedOptions).reduce((prev, key) => {
            console.log(
              `searching for value of ${key} : ${item.selectedOptions[key]}`
            );
            if (item.selectedOptions[key] instanceof Array) {
              return prev;
            }
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

        console.log('addOns', addOns);
        // add together and multiply by quantity
        console.log({
          price: matchedItem.price,
          addOns,
          quanitity: item.quantity,
        });
        const totalCostofSingleItem =
          (matchedItem.price + addOns) * item.quantity;

        // save price info to orderItems
        const resultItem = {
          id: matchedItem._id,
          name: matchedItem.name,
          description: matchedItem.description,
          image: matchedItem.image,
          price: totalCostofSingleItem,
          quantity: item.quantity,
        };

        orderItems.push(resultItem);

        // add to current total
        console.log('totalCostofSingleItem', totalCostofSingleItem);
        return prev + totalCostofSingleItem;
      }, 0);

      console.log('calculated total', cartTotal);

      const amount = cartTotal + Math.floor(calcCartTax(cartTotal));

      // 2. Create the stripe charge
      const charge = await stripe.charges.create({
        amount,
        currency: 'usd',
        source: args.token,
        description: 'greetings from the resolver',
      });
      console.log(charge);

      // 3. Save Order to DB
      console.log('orderItems', orderItems);
      const newOrder = await new Order({
        items: orderItems,
        total: amount,
        charge: charge.id,
      });

      const result = await newOrder.save((err, res) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Order saved to DB: ', res);
          return res;
        }
      });
      // 4. Return order to the client
      console.log(newOrder);
      return newOrder;
    },
  },
};
