import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Swisscontons } from '.'

const app = () => express(apiRoot, routes)

let swisscontons

beforeEach(async () => {
  swisscontons = await Swisscontons.create({})
})

test('POST /swisscontons 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', code: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.code).toEqual('test')
})

test('GET /swisscontons 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /swisscontons/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${swisscontons.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(swisscontons.id)
})

test('GET /swisscontons/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /swisscontons/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${swisscontons.id}`)
    .send({ name: 'test', code: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(swisscontons.id)
  expect(body.name).toEqual('test')
  expect(body.code).toEqual('test')
})

test('PUT /swisscontons/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', code: 'test' })
  expect(status).toBe(404)
})

test('DELETE /swisscontons/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${swisscontons.id}`)
  expect(status).toBe(204)
})

test('DELETE /swisscontons/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
