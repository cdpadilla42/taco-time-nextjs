import stripe from 'stripe';

const processToken = stripe(provess.env.STRIPE_SECRET);

export default processToken;
