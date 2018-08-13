import { Swisspayroll } from '.'

let swisspayroll

beforeEach(async () => {
  swisspayroll = await Swisspayroll.create({ company: 'test', employee: 'test', branch: 'test', payroll: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = swisspayroll.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(swisspayroll.id)
    expect(view.company).toBe(swisspayroll.company)
    expect(view.employee).toBe(swisspayroll.employee)
    expect(view.branch).toBe(swisspayroll.branch)
    expect(view.payroll).toBe(swisspayroll.payroll)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = swisspayroll.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(swisspayroll.id)
    expect(view.company).toBe(swisspayroll.company)
    expect(view.employee).toBe(swisspayroll.employee)
    expect(view.branch).toBe(swisspayroll.branch)
    expect(view.payroll).toBe(swisspayroll.payroll)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
