import { Router } from 'express';

import charactersRouter from './characters';

const v1Router = Router();

v1Router.use('/v1/public/characters', charactersRouter);

export default v1Router;
