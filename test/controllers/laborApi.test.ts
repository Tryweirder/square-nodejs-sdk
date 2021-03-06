import { LaborApi, CreateBreakTypeRequest, BreakType, LocationsApi, UpdateBreakTypeRequest, CreateShiftRequest, Shift, TeamApi, TeamMember, CreateTeamMemberRequest, UpdateShiftRequest, ShiftWage } from "../../src"
import { testClient } from "../testClient"
import { v4 as uuidv4 } from 'uuid'

describe('Labor API', () => {
  let laborApi     : LaborApi
  let locationsApi : LocationsApi
  let teamApi      : TeamApi

  let locationId : string
  let memberId   : string
  let breakId    : string
  let shiftId    : string
  beforeAll( async () => {
    laborApi = testClient.laborApi
    locationsApi = testClient.locationsApi
    teamApi =  testClient.teamApi

    let {result : {locations}} =  await locationsApi.listLocations()
    locationId = (locations!)[0].id!

    let teamMember1: TeamMember = {
      givenName: "Sherlock",
      familyName: "Holmes"
    }
    let body: CreateTeamMemberRequest = {
      idempotencyKey: uuidv4(),
      teamMember: teamMember1
    }
    let { result: { teamMember } } = await teamApi.createTeamMember(body)
    memberId = teamMember?.id!
  })
  it('should testListBreakTypes', async () => {
    let { statusCode } = await laborApi.listBreakTypes()
    expect(statusCode).toBe(200)
  })
  it('should testCreateBreakType', async () => {
    let breakType : BreakType = {
      locationId: locationId,
      expectedDuration: "PT0H30M0S", // 30 min duration in RFC 3339 format (https://tools.ietf.org/html/rfc3339)
      breakName: `Lunch_${uuidv4()}`,
      isPaid: true
    }
    let body : CreateBreakTypeRequest = {
      idempotencyKey: uuidv4(),
      breakType:  breakType
    }
    try {

     let  { result, statusCode } =  await laborApi.createBreakType(body)
     expect(statusCode).toBe(200)

      breakId = result.breakType?.id!
    } catch (error) {
      console.log(error)
    }
  })
  it('should testGetBreakType', async () => {
    let { result: { breakType },statusCode } = await laborApi.getBreakType(breakId)
    expect(statusCode).toBe(200)
    expect(breakType?.id!).toBe(breakId)
  })

  it('should testUpdateBreakType', async () => {
    let updtedBreakType: BreakType = {
      locationId: locationId,
      expectedDuration: "PT1H0M0S", // 1 hour duration in RFC 3339 format (https://tools.ietf.org/html/rfc3339)
      breakName: `Lunch_${uuidv4()}`,
      isPaid: true
    }
    const body : UpdateBreakTypeRequest = {
      breakType: updtedBreakType
    }
    const { result: { breakType }, statusCode } = await laborApi.updateBreakType(breakId, body)
    expect(statusCode).toBe(200)
    expect(breakType?.id!).toBe(breakId)
    expect(breakType?.expectedDuration!).toBe('PT1H')
  })
  it('should testSearchShifts', async () => {
    let { statusCode } = await laborApi.searchShifts({})
    expect(statusCode).toBe(200)
  })

  it('should testCreateShift', async () => {
    let newShift : Shift = {
      startAt: '2019-01-25T03:11:00-05:00',
      locationId: locationId,
      teamMemberId: memberId
    }
    let body : CreateShiftRequest = {
      shift: newShift,
      idempotencyKey: uuidv4(),
    }
    let { result : { shift }, statusCode } = await laborApi.createShift(body)
    expect(statusCode).toBe(200)
    expect(shift).toEqual(expect.objectContaining(shift))

    shiftId = shift?.id!
  })

  it('should testGetShift', async () => {
    let { result: {shift}, statusCode } = await laborApi.getShift(shiftId)
    expect(statusCode).toBe(200)
    expect(shift?.id!).toBe(shiftId)
  })

  it('should testUpdateShift', async () => {
    let wage: ShiftWage = {
      title: "Manager",
      hourlyRate: {
        amount: 2500,
        currency: 'USD'
      }
    }

    let updateShift: Shift = {
      wage,
      locationId: locationId,
      teamMemberId: memberId,
      startAt: "2020-03-25T12:00:00Z",
    }

    let body : UpdateShiftRequest = {
      shift: updateShift
    }

    let { result: { shift }, statusCode } = await laborApi.updateShift(shiftId, body)
    expect(statusCode).toBe(200)
    expect(shift).toEqual(expect.objectContaining({
      ...updateShift,
      wage: expect.objectContaining(wage)
    }))
  })

  it('should testDeleteShift', async () => {
    let { statusCode } = await laborApi.deleteShift(shiftId)
    expect(statusCode).toBe(200)
  })
  it('should testDeleteBreakType', async () => {
    let { statusCode } = await laborApi.deleteBreakType(breakId)
    expect(statusCode).toBe(200)
  })
  it('should testListWorkWeekConfigs', async () => {
    let { statusCode } = await laborApi.listWorkweekConfigs()
    expect(statusCode).toBe(200)
  })
})
