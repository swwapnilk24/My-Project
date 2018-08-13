import { Swizzdeductions } from '.'

let swizzdeductions

beforeEach(async () => {
  swizzdeductions = await Swizzdeductions.create({ name: 'test', empCont: 'test', employerCont: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = swizzdeductions.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(swizzdeductions.id)
    expect(view.name).toBe(swizzdeductions.name)
    expect(view.empCont).toBe(swizzdeductions.empCont)
    expect(view.employerCont).toBe(swizzdeductions.employerCont)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = swizzdeductions.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(swizzdeductions.id)
    expect(view.name).toBe(swizzdeductions.name)
    expect(view.empCont).toBe(swizzdeductions.empCont)
    expect(view.employerCont).toBe(swizzdeductions.employerCont)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
