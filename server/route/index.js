/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
// import swaggerUi from 'swagger-ui-express';
// import swaggerDoc from '../../public/docs/swaggerDoc.json';
import user from './user';

export default (app) => {
  app.get('/', (req, res) => res.status(200).send({
    status: 'success',
    data: 'Welcome to the pm global online system API'
  }));

  app.use('/api/v1/users', user);

  app.all('/*', (req, res) => res.status(404).send({
    status: 'error',
    error: 'This route is unavailable on this server'
  }));
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    // don't print stack traces in production environment
    // eslint-disable-next-line no-console
    if (app.get('env') !== 'production') console.log(error.stack);
    res.status(error.status || 500);
    res.send({
      status: 'error',
      error: 'Internal Server Error'
    });
  });
};
