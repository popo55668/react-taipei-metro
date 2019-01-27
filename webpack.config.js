module.exports = () => {
  return require(`./webpack.${process.env.NODE_ENV}.js`);
};
