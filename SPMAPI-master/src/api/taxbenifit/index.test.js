import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Taxbenifit } from '.'

const app = () => express(apiRoot, routes)

let taxbenifit

beforeEach(async () => {
  taxbenifit = await Taxbenifit.create({})
})

test('POST /taxbenifits 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', country: 'test', company: 'test', region: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.company).toEqual('test')
  expect(body.region).toEqual('test')
})

test('GET /taxbenifits 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /taxbenifits/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${taxbenifit.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(taxbenifit.id)
})

test('GET /taxbenifits/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /taxbenifits/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${taxbenifit.id}`)
    .send({ name: 'test', country: 'test', company: 'test', region: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(taxbenifit.id)
  expect(body.name).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.company).toEqual('test')
  expect(body.region).toEqual('test')
})

test('PUT /taxbenifits/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', country: 'test', company: 'test', region: 'test' })
  expect(status).toBe(404)
})

test('DELETE /taxbenifits/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${taxbenifit.id}`)
  expect(status).toBe(204)
})

test('DELETE /taxbenifits/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
