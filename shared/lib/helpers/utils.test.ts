import { cn } from "./utils"

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
    expect(cn("foo", null)).toBe("foo")
    expect(cn("foo", undefined, "bar")).toBe("foo bar")
  })

  it("handles conditional classes", () => {
    expect(cn("foo", true && "bar", false && "baz")).toBe("foo bar")
  })

  it("handles Tailwind class conflicts", () => {
    expect(cn("p-4", "p-6")).toBe("p-6")
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
  })

  it("handles empty inputs", () => {
    expect(cn()).toBe("")
    expect(cn("")).toBe("")
    expect(cn(null)).toBe("")
    expect(cn(undefined)).toBe("")
  })
})

