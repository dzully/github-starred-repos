import { SettingsLayout } from "@/widgets/settings-layout"
import { GeneralSettings } from "@/features/general-settings"
import { NotificationSettings } from "@/features/notification-settings"
import { AppearanceSettings } from "@/features/appearance-settings"
import { IntegrationSettings } from "@/features/integration-settings"

export const SettingsPage = () => {
  return (
    <div className="h-full pb-24 md:pb-6">
      <SettingsLayout>
        <GeneralSettings />
        <NotificationSettings />
        <AppearanceSettings />
        <IntegrationSettings />
      </SettingsLayout>
    </div>
  )
}

