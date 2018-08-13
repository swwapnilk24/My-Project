import { Role } from '.'

let role

beforeEach(async () => {
  role = await Role.create({ name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = role.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(role.id)
    expect(view.name).toBe(role.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = role.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(role.id)
    expect(view.name).toBe(role.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
