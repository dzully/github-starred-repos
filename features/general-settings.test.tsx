import { render, screen } from "@/test/test-utils"
import { GeneralSettings } from "./general-settings"
import { describe, it, expect } from "@jest/globals"
import renderer from "react-test-renderer"

describe("GeneralSettings", () => {
  it("renders profile information section", () => {
    render(<GeneralSettings />)
    expect(screen.getByText("Profile Information")).toBeInTheDocument()
    expect(screen.getByLabelText("Username")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Bio")).toBeInTheDocument()
  })

  it("renders preferences section", () => {
    render(<GeneralSettings />)
    expect(screen.getByText("Preferences")).toBeInTheDocument()
    expect(screen.getByLabelText("Preferred Language")).toBeInTheDocument()
    expect(screen.getByLabelText("Timezone")).toBeInTheDocument()
  })

  it("renders save changes button", () => {
    render(<GeneralSettings />)
    expect(screen.getByRole("button", { name: "Save Changes" })).toBeInTheDocument()
  })

  it("matches snapshot", () => {
    const tree = renderer.create(<GeneralSettings />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

