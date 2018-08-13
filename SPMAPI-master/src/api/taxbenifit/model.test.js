import { Taxbenifit } from '.'

let taxbenifit

beforeEach(async () => {
  taxbenifit = await Taxbenifit.create({ name: 'test', country: 'test', company: 'test', region: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = taxbenifit.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(taxbenifit.id)
    expect(view.name).toBe(taxbenifit.name)
    expect(view.country).toBe(taxbenifit.country)
    expect(view.company).toBe(taxbenifit.company)
    expect(view.region).toBe(taxbenifit.region)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = taxbenifit.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(taxbenifit.id)
    expect(view.name).toBe(taxbenifit.name)
    expect(view.country).toBe(taxbenifit.country)
    expect(view.company).toBe(taxbenifit.company)
    expect(view.region).toBe(taxbenifit.region)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
