import type React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tabs defaultValue="general" className="w-full h-full flex flex-col">
      <TabsList className="w-full justify-start overflow-x-auto mb-6">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      <div className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4">{children}</ScrollArea>
      </div>
    </Tabs>
  )
}

