import { Meritgroup } from '.'

let meritgroup

beforeEach(async () => {
  meritgroup = await Meritgroup.create({ name: 'test', min: 'test', max: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = meritgroup.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(meritgroup.id)
    expect(view.name).toBe(meritgroup.name)
    expect(view.min).toBe(meritgroup.min)
    expect(view.max).toBe(meritgroup.max)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = meritgroup.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(meritgroup.id)
    expect(view.name).toBe(meritgroup.name)
    expect(view.min).toBe(meritgroup.min)
    expect(view.max).toBe(meritgroup.max)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
