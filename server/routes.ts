import * as express from 'express';

import CatController from './controllers/CatController';
import UserController from './controllers/UserController';
import ParticipeController from './controllers/ParticipeController';
// import cat from './models/cat';
// import user from './models/user';

export default function routes(app) {

  const router = express.Router();

  const cat = new CatController();
  const user = new UserController();
  const participe = new ParticipeController();

  // cats
  router.route('/cats').get(cat.getAll);
  router.route('/cats/count').get(cat.count);
  router.route('/cat').post(cat.insert);
  router.route('/cat/:id').get(cat.get);
  router.route('/cat/:id').put(cat.update);
  router.route('/cat/:id').delete(cat.delete);

  // users
  router.route('/login').post(user.login);
  router.route('/users').get(user.getAll);
  router.route('/users/count').get(user.count);
  router.route('/user').post(user.insert);
  router.route('/user/:id').get(user.get);
  router.route('/user/:id').put(user.update);
  router.route('/user/:id').delete(user.delete);

  router.route('/participes').get(participe.getAll);
  router.route('/participes/count').get(participe.count);
  router.route('/participe').post(participe.insert);
  router.route('/participe/:id').get(participe.get);
  router.route('/participe/:id').put(participe.update);
  router.route('/participe/:id').delete(participe.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
