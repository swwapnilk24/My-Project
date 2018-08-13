import { Router } from 'express'
import { createSubscriptionPlan, getSubscriptionPlans } from './controller';
import { schema } from './model';
export CompanySubscription, { schema } from './model';

const router = new Router();

// router.post('/',
// createSubscriptionPlan);

// router.get('/',
// getSubscriptionPlans);

export default router;
