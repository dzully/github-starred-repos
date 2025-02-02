import { render, screen } from "@/test/test-utils"
import { IntegrationSettings } from "./integration-settings"
import renderer from "react-test-renderer"

describe("IntegrationSettings", () => {
  it("renders connected accounts section", () => {
    render(<IntegrationSettings />)
    expect(screen.getByText("Connected Accounts")).toBeInTheDocument()
    expect(screen.getByText("GitHub")).toBeInTheDocument()
    expect(screen.getByText("GitLab")).toBeInTheDocument()
    expect(screen.getByText("Bitbucket")).toBeInTheDocument()
  })

  it("renders API access section", () => {
    render(<IntegrationSettings />)
    expect(screen.getByText("API Access")).toBeInTheDocument()
    expect(screen.getByText("Personal Access Token")).toBeInTheDocument()
  })

  it("renders correct buttons for each integration", () => {
    render(<IntegrationSettings />)
    expect(screen.getByRole("button", { name: "Disconnect" })).toBeInTheDocument()
    expect(screen.getAllByRole("button", { name: "Connect" })).toHaveLength(2)
  })

  it("renders generate new token button", () => {
    render(<IntegrationSettings />)
    expect(screen.getByRole("button", { name: "Generate New Token" })).toBeInTheDocument()
  })

  it("matches snapshot", () => {
    const tree = renderer.create(<IntegrationSettings />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

