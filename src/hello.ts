export const hello = () => {
  console.log('Hello world!');

  console.log(process.env.NODE_ENV);
  console.log(process.env.PORT);
};
