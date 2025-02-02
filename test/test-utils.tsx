import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render as rtlRender } from "@testing-library/react"
import type { RenderOptions } from "@testing-library/react"
import type { ReactElement } from "react"
import type React from "react" // Added import for React

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

export function renderWithProviders(
  ui: ReactElement,
  { queryClient = createTestQueryClient(), ...renderOptions }: RenderOptions & { queryClient?: QueryClient } = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from "@testing-library/react"
export { renderWithProviders as render }

