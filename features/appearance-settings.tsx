import { TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

export const AppearanceSettings = () => {
  return (
    <TabsContent value="appearance" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Customize the look and feel of the application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="light">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">Dark</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system">System</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Font Size</CardTitle>
          <CardDescription>Adjust the text size for better readability.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider defaultValue={[16]} max={24} min={12} step={1} />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Small</span>
            <span>Medium</span>
            <span>Large</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Color Accent</CardTitle>
          <CardDescription>Choose your preferred accent color.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            {["red", "green", "blue", "purple", "orange"].map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full bg-${color}-500 hover:ring-2 ring-offset-2 ring-${color}-500 transition-all`}
                aria-label={`${color} accent color`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

