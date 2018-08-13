import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Meritgroup } from '.'

const app = () => express(routes)

let meritgroup

beforeEach(async () => {
  meritgroup = await Meritgroup.create({})
})

test('POST /meritgroups 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ name: 'test', min: 'test', max: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.min).toEqual('test')
  expect(body.max).toEqual('test')
})

test('GET /meritgroups 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /meritgroups/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${meritgroup.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(meritgroup.id)
})

test('GET /meritgroups/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /meritgroups/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${meritgroup.id}`)
    .send({ name: 'test', min: 'test', max: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(meritgroup.id)
  expect(body.name).toEqual('test')
  expect(body.min).toEqual('test')
  expect(body.max).toEqual('test')
  expect(body.avg).toEqual('test')
})

test('PUT /meritgroups/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ name: 'test', min: 'test', max: 'test' })
  expect(status).toBe(404)
})

test('DELETE /meritgroups/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${meritgroup.id}`)
  expect(status).toBe(204)
})

test('DELETE /meritgroups/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
