import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Band_Applicable_plan, { schema } from './model'

const router = new Router()
const { plan, band, performance_year} = schema.tree

router.post('/',
    body({ plan, band, performance_year }),
    create)

router.get('/',
    query(),
    index)
    
router.get('/:id',
    show)

router.put('/:id',
    body({ plan, band, performance_year }),
    update)

router.delete('/:id',
    destroy)  

export default router
