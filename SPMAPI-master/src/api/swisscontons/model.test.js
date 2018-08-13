import { Swisscontons } from '.'

let swisscontons

beforeEach(async () => {
  swisscontons = await Swisscontons.create({ name: 'test', code: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = swisscontons.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(swisscontons.id)
    expect(view.name).toBe(swisscontons.name)
    expect(view.code).toBe(swisscontons.code)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = swisscontons.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(swisscontons.id)
    expect(view.name).toBe(swisscontons.name)
    expect(view.code).toBe(swisscontons.code)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
