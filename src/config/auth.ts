export default {
  jwt: {
    secret: process.env.TOKEN_HASH,
    expiresIn: '1d',
  },
};
