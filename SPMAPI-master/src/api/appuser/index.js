import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show } from './controller'
import { schema } from './model'
export AppUser, { schema } from './model'

const router = new Router()
const { name, email, userId, password, role, status } = schema.tree

router.post('/',
body({ name, email, userId, password, role, status }),
create)

router.get('/',
query(),
index)

router.get('/:id',
show)

export default router
