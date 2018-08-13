import request from 'supertest-as-promised'
import { masterKey } from '../../config'
import express from '../../services/express'
import routes, { Employee } from '.'

const app = () => express(routes)

let employee

beforeEach(async () => {
  employee = await Employee.create({})
})

test('POST /employees 201 (master)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: masterKey, FirstName: 'test', LastName: 'test', MiddleName: 'test', Sufix: 'test', DisplayName: 'test', FormalName: 'test', Title: 'test', BirthName: 'test', Initials: 'test', Prefix: 'test', Gender: 'test', MaritalStatus: 'test', MaritalStatusSince: 'test', SecondNationality: 'test', ThirdNationality: 'test', NativePreferredLanguage: 'test', ChallengeStatus: 'test', CertificateStartDate: 'test', CertificateEndDate: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.FirstName).toEqual('test')
  expect(body.LastName).toEqual('test')
  expect(body.MiddleName).toEqual('test')
  expect(body.Sufix).toEqual('test')
  expect(body.DisplayName).toEqual('test')
  expect(body.FormalName).toEqual('test')
  expect(body.Title).toEqual('test')
  expect(body.BirthName).toEqual('test')
  expect(body.Initials).toEqual('test')
  expect(body.Prefix).toEqual('test')
  expect(body.Gender).toEqual('test')
  expect(body.MaritalStatus).toEqual('test')
  expect(body.MaritalStatusSince).toEqual('test')
  expect(body.SecondNationality).toEqual('test')
  expect(body.ThirdNationality).toEqual('test')
  expect(body.NativePreferredLanguage).toEqual('test')
  expect(body.ChallengeStatus).toEqual('test')
  expect(body.CertificateStartDate).toEqual('test')
  expect(body.CertificateEndDate).toEqual('test')
})

test('POST /employees 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /employees 200 (master)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /employees 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /employees/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`/${employee.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(employee.id)
})

test('GET /employees/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${employee.id}`)
  expect(status).toBe(401)
})

test('GET /employees/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /employees/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`/${employee.id}`)
    .send({ access_token: masterKey, FirstName: 'test', LastName: 'test', MiddleName: 'test', Sufix: 'test', DisplayName: 'test', FormalName: 'test', Title: 'test', BirthName: 'test', Initials: 'test', Prefix: 'test', Gender: 'test', MaritalStatus: 'test', MaritalStatusSince: 'test', SecondNationality: 'test', ThirdNationality: 'test', NativePreferredLanguage: 'test', ChallengeStatus: 'test', CertificateStartDate: 'test', CertificateEndDate: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(employee.id)
  expect(body.FirstName).toEqual('test')
  expect(body.LastName).toEqual('test')
  expect(body.MiddleName).toEqual('test')
  expect(body.Sufix).toEqual('test')
  expect(body.DisplayName).toEqual('test')
  expect(body.FormalName).toEqual('test')
  expect(body.Title).toEqual('test')
  expect(body.BirthName).toEqual('test')
  expect(body.Initials).toEqual('test')
  expect(body.Prefix).toEqual('test')
  expect(body.Gender).toEqual('test')
  expect(body.MaritalStatus).toEqual('test')
  expect(body.MaritalStatusSince).toEqual('test')
  expect(body.SecondNationality).toEqual('test')
  expect(body.ThirdNationality).toEqual('test')
  expect(body.NativePreferredLanguage).toEqual('test')
  expect(body.ChallengeStatus).toEqual('test')
  expect(body.CertificateStartDate).toEqual('test')
  expect(body.CertificateEndDate).toEqual('test')
})

test('PUT /employees/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${employee.id}`)
  expect(status).toBe(401)
})

test('PUT /employees/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: masterKey, FirstName: 'test', LastName: 'test', MiddleName: 'test', Sufix: 'test', DisplayName: 'test', FormalName: 'test', Title: 'test', BirthName: 'test', Initials: 'test', Prefix: 'test', Gender: 'test', MaritalStatus: 'test', MaritalStatusSince: 'test', SecondNationality: 'test', ThirdNationality: 'test', NativePreferredLanguage: 'test', ChallengeStatus: 'test', CertificateStartDate: 'test', CertificateEndDate: 'test' })
  expect(status).toBe(404)
})

test('DELETE /employees/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`/${employee.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /employees/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${employee.id}`)
  expect(status).toBe(401)
})

test('DELETE /employees/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
