import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type React from "react"

const queryClient = new QueryClient()

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </body>
    </html>
  )
}

export default RootLayout



import './globals.css'