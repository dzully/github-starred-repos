import { TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const NotificationSettings = () => {
  return (
    <TabsContent value="notifications" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Manage your email preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="new-repos" className="flex-grow">
              New trending repositories
            </Label>
            <Switch id="new-repos" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="updates" className="flex-grow">
              Product updates
            </Label>
            <Switch id="updates" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="newsletter" className="flex-grow">
              Weekly newsletter
            </Label>
            <Switch id="newsletter" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Control your mobile app notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="trending-alerts" className="flex-grow">
              Trending repository alerts
            </Label>
            <Switch id="trending-alerts" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="new-features" className="flex-grow">
              New feature announcements
            </Label>
            <Switch id="new-features" />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

