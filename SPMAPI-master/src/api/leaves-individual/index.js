import { Router } from 'express';
import { create, show } from './controller';
import { schema } from './model';
export LeavesIndividual, { schema } from './model';

const router = new Router();

router.post('/', create);

router.get('/', show);

export default router;


