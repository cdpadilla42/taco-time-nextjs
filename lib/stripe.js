import stripe from 'stripe';

const processToken = stripe(process.env.STRIPE_SECRET);

export default processToken;
