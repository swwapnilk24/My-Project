import { Retiralbenifits } from '.'

let retiralbenifits

beforeEach(async () => {
  retiralbenifits = await Retiralbenifits.create({ name: 'test', country: 'test', company: 'test', region: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = retiralbenifits.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(retiralbenifits.id)
    expect(view.name).toBe(retiralbenifits.name)
    expect(view.country).toBe(retiralbenifits.country)
    expect(view.company).toBe(retiralbenifits.company)
    expect(view.region).toBe(retiralbenifits.region)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = retiralbenifits.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(retiralbenifits.id)
    expect(view.name).toBe(retiralbenifits.name)
    expect(view.country).toBe(retiralbenifits.country)
    expect(view.company).toBe(retiralbenifits.company)
    expect(view.region).toBe(retiralbenifits.region)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
