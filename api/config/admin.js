module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '220e40a18a1ea853d0d2d2acef198e24'),
  },
});
