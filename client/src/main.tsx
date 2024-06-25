import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthContextProvider } from './context/AuthContext'
import { CookiesProvider } from 'react-cookie'
import router from '@/router'
import NextTopLoader from 'nextjs-toploader';
import '@/index.css'
const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <CookiesProvider
        defaultSetOptions={{ path: '/', maxAge: 60 * 60 * 24 * 15 }}
      >
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <AuthContextProvider>
            <RouterProvider router={router}  />
          </AuthContextProvider>
          <Toaster />
        </ThemeProvider>
      </CookiesProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
