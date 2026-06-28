import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,   // 5 minutes — prevents refetch on window focus
      gcTime: 10 * 60 * 1000,     // 10 minutes — keep cache alive during pagination
      retry: 2,                   // retry failed requests twice before showing error
      refetchOnWindowFocus: false, // avoid surprise refetches while navigating
    },
  },
})

export default function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}   
