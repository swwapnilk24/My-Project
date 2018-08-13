import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export TargetPlans, { schema } from './model'

const router = new Router()
const { id, name, vesting_period, description, special_plan } = schema.tree

router.post('/',
    body({ name, vesting_period, description, special_plan }),
    create)

router.get('/',
    query(),
    index)
    
router.get('/:id',
    show)

router.put('/:id',
    body({ name, vesting_period }),
    update)

router.delete('/:id',
    destroy)  

export default router
