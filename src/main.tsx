import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@/styles/main.scss";
import QueryProvider from '@/providers/QueryProvider.tsx';
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router}/>
    </QueryProvider>
  </StrictMode>,
)
