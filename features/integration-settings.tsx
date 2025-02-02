import { TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Gitlab, GithubIcon as Bitbucket } from "lucide-react"

export const IntegrationSettings = () => {
  return (
    <TabsContent value="integrations" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>Manage your linked version control accounts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Github className="w-8 h-8" />
              <div>
                <p className="font-medium">GitHub</p>
                <p className="text-sm text-gray-500">Connected</p>
              </div>
            </div>
            <Button variant="outline">Disconnect</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Gitlab className="w-8 h-8" />
              <div>
                <p className="font-medium">GitLab</p>
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
            </div>
            <Button>Connect</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bitbucket className="w-8 h-8" />
              <div>
                <p className="font-medium">Bitbucket</p>
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
            </div>
            <Button>Connect</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>Manage your API keys and access tokens.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Personal Access Token</p>
              <p className="text-sm text-gray-500">Created on May 15, 2023</p>
            </div>
            <Button variant="outline">Revoke</Button>
          </div>
          <Button className="w-full">Generate New Token</Button>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

