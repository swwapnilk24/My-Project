import request from 'supertest-as-promised'
import { masterKey } from '../../config'
import express from '../../services/express'
import routes, { Role } from '.'

const app = () => express(routes)

let role

beforeEach(async () => {
  role = await Role.create({})
})

test('POST /roles 201 (master)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: masterKey, name: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
})

test('POST /roles 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /roles 200 (master)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /roles 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /roles/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`/${role.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(role.id)
})

test('GET /roles/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${role.id}`)
  expect(status).toBe(401)
})

test('GET /roles/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /roles/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`/${role.id}`)
    .send({ access_token: masterKey, name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(role.id)
  expect(body.name).toEqual('test')
})

test('PUT /roles/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${role.id}`)
  expect(status).toBe(401)
})

test('PUT /roles/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test' })
  expect(status).toBe(404)
})

test('DELETE /roles/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`/${role.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /roles/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${role.id}`)
  expect(status).toBe(401)
})

test('DELETE /roles/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
