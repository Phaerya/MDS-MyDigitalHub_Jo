module.exports = ({ env }) => ({
  url: env('BASE_URL', 'https://joaquim.moraisfaria.nantes.mds-project.fr/strapi/'),
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
