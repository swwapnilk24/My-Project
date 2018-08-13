import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Swizzdeductions } from '.'

const app = () => express(apiRoot, routes)

let swizzdeductions

beforeEach(async () => {
  swizzdeductions = await Swizzdeductions.create({})
})

test('POST /swizzdeductions 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', empCont: 'test', employerCont: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.empCont).toEqual('test')
  expect(body.employerCont).toEqual('test')
})

test('GET /swizzdeductions 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /swizzdeductions/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${swizzdeductions.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(swizzdeductions.id)
})

test('GET /swizzdeductions/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /swizzdeductions/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${swizzdeductions.id}`)
    .send({ name: 'test', empCont: 'test', employerCont: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(swizzdeductions.id)
  expect(body.name).toEqual('test')
  expect(body.empCont).toEqual('test')
  expect(body.employerCont).toEqual('test')
})

test('PUT /swizzdeductions/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', empCont: 'test', employerCont: 'test' })
  expect(status).toBe(404)
})

test('DELETE /swizzdeductions/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${swizzdeductions.id}`)
  expect(status).toBe(204)
})

test('DELETE /swizzdeductions/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
