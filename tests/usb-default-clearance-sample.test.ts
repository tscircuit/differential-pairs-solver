import { expect, test } from "bun:test"
import sampleProblem from "../fixtures/sample-09/sample-09.srj.json"
import { LengthMatchingSolver, type LengthMatchingSolverParams } from "../lib"

test("matches a USB pair using the automatic meander clearance", () => {
  // SAFETY: This repository-owned JSON is shared with the Cosmos fixture. The cast restores literal tuple and obstacle discriminants widened by JSON module inference.
  const params = sampleProblem as unknown as LengthMatchingSolverParams
  const solver = new LengthMatchingSolver(params)

  solver.solve()

  expect(solver.solved).toBe(true)
  const tunedRoute = solver.matchedHdRoutes[1]?.route
  if (!tunedRoute) throw new Error("Expected the USB D- route to be present")
  const verticalLegXs: number[] = []
  for (let index = 0; index < tunedRoute.length - 1; index++) {
    const start = tunedRoute[index]
    const end = tunedRoute[index + 1]
    if (!start || !end) continue
    if (Math.abs(start.x - end.x) < 1e-9 && Math.abs(start.y - end.y) > 0.4)
      verticalLegXs.push(start.x)
  }

  expect(verticalLegXs).toHaveLength(2)
  const firstLegX = verticalLegXs[0]
  const secondLegX = verticalLegXs[1]
  if (firstLegX === undefined || secondLegX === undefined)
    throw new Error("Expected two vertical USB meander legs")
  expect(secondLegX - firstLegX).toBeCloseTo(0.45)
})
