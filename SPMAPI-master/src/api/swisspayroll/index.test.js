import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Swisspayroll } from '.'

const app = () => express(apiRoot, routes)

let swisspayroll

beforeEach(async () => {
  swisspayroll = await Swisspayroll.create({})
})

test('POST /swisspayrolls 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ company: 'test', employee: 'test', branch: 'test', payroll: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.company).toEqual('test')
  expect(body.employee).toEqual('test')
  expect(body.branch).toEqual('test')
  expect(body.payroll).toEqual('test')
})

test('GET /swisspayrolls 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /swisspayrolls/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${swisspayroll.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(swisspayroll.id)
})

test('GET /swisspayrolls/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /swisspayrolls/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${swisspayroll.id}`)
    .send({ company: 'test', employee: 'test', branch: 'test', payroll: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(swisspayroll.id)
  expect(body.company).toEqual('test')
  expect(body.employee).toEqual('test')
  expect(body.branch).toEqual('test')
  expect(body.payroll).toEqual('test')
})

test('PUT /swisspayrolls/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ company: 'test', employee: 'test', branch: 'test', payroll: 'test' })
  expect(status).toBe(404)
})

test('DELETE /swisspayrolls/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${swisspayroll.id}`)
  expect(status).toBe(204)
})

test('DELETE /swisspayrolls/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
