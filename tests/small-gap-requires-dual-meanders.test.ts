import { expect, test } from "bun:test"
import sampleProblem from "../fixtures/sample-10/sample-10.srj.json"
import { LengthMatchingSolver, type LengthMatchingSolverParams } from "../lib"

test("reproduces a mismatch too small for one valid meander", () => {
  // SAFETY: This repository-owned JSON is the intentionally unsolved small-gap fixture. The cast restores JSON literals widened by TypeScript module inference.
  const params = sampleProblem as unknown as LengthMatchingSolverParams
  const solver = new LengthMatchingSolver(params)

  expect(() => solver.solve()).toThrow(
    'linear regression exhausted all segment/tooth combinations for "small_gap_n"; required 0.0500mm',
  )
  expect(solver.solved).toBe(false)
  expect(solver.visualize()).toMatchGraphicsSvg(import.meta.path)
})
