import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Retiralbenifits } from '.'

const app = () => express(apiRoot, routes)

let retiralbenifits

beforeEach(async () => {
  retiralbenifits = await Retiralbenifits.create({})
})

test('POST /retiralbenifits 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', country: 'test', company: 'test', region: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.company).toEqual('test')
  expect(body.region).toEqual('test')
})

test('POST /retiralbenifits 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /retiralbenifits 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /retiralbenifits/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${retiralbenifits.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(retiralbenifits.id)
})

test('GET /retiralbenifits/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /retiralbenifits/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${retiralbenifits.id}`)
    .send({ name: 'test', country: 'test', company: 'test', region: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(retiralbenifits.id)
  expect(body.name).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.company).toEqual('test')
  expect(body.region).toEqual('test')
})

test('PUT /retiralbenifits/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', country: 'test', company: 'test', region: 'test' })
  expect(status).toBe(404)
})

test('DELETE /retiralbenifits/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${retiralbenifits.id}`)
  expect(status).toBe(204)
})

test('DELETE /retiralbenifits/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
