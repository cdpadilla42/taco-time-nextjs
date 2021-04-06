export const dummyData = {
  img: 'https://picsum.photos/id/237/300/200',
  name: 'Chips & Guac',
  description: 'Yummy green good stuff!',
  id: Math.random() * 100,
  price: 300,
  customizations: [
    {
      name: 'tortilla',
      title: 'Choose a tortilla',
      required: false,
      options: [
        {
          name: 'Flour',
        },
        {
          name: 'Corn',
        },
        {
          name: 'Wheat',
        },
        {
          name: 'Double Corn',
          price: '15',
        },
      ],
    },
  ],
};
const arr = new Array(6);
arr.fill(dummyData);

export default arr;
