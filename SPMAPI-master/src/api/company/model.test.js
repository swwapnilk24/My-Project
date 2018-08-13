import { Company } from '.'

let company

beforeEach(async () => {
  company = await Company.create({ name: 'test', address: 'test', website: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = company.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(company.id)
    expect(view.name).toBe(company.name)
    expect(view.address).toBe(company.address)
    expect(view.website).toBe(company.website)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = company.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(company.id)
    expect(view.name).toBe(company.name)
    expect(view.address).toBe(company.address)
    expect(view.website).toBe(company.website)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
