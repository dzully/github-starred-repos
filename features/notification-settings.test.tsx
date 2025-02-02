import { render, screen } from "@/test/test-utils"
import { NotificationSettings } from "./notification-settings"
import renderer from "react-test-renderer"

describe("NotificationSettings", () => {
  it("renders email notifications section", () => {
    render(<NotificationSettings />)
    expect(screen.getByText("Email Notifications")).toBeInTheDocument()
    expect(screen.getByLabelText("New trending repositories")).toBeInTheDocument()
    expect(screen.getByLabelText("Product updates")).toBeInTheDocument()
    expect(screen.getByLabelText("Weekly newsletter")).toBeInTheDocument()
  })

  it("renders push notifications section", () => {
    render(<NotificationSettings />)
    expect(screen.getByText("Push Notifications")).toBeInTheDocument()
    expect(screen.getByLabelText("Trending repository alerts")).toBeInTheDocument()
    expect(screen.getByLabelText("New feature announcements")).toBeInTheDocument()
  })

  it("renders switches for each notification option", () => {
    render(<NotificationSettings />)
    const switches = screen.getAllByRole("switch")
    expect(switches).toHaveLength(5) // Total number of notification options
  })

  it("matches snapshot", () => {
    const tree = renderer.create(<NotificationSettings />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

