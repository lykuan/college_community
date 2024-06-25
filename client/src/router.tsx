import { Navigate, createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'

const router = createBrowserRouter([
  // Auth routes
  {
    index: true,
    path: '/sign-in',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: '/sign-up',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },

  {
    path: '/reset-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/reset-password')).default,
    }),
  },
  // Main routes
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
    element: <Navigate to='/sign-in' replace />,
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/home')).default,
        }),
      },
      {
        path: "/idea",
        lazy: async () => ({
          Component: (await import('./pages/idea')).default
        }),
      },
      {
        path: "/story/:storyId",
        lazy: async () => ({
          Component: (await import('./pages/story')).default
        }),
      },

      {

        path: '/write',
        lazy: async () => ({
          Component: ((await import('./pages/idea/write')).default)
        }),

      },
        

      {
        path: 'tasks',
        lazy: async () => ({
          Component: (await import('./pages/tasks')).default,
        }),
      },
      {
        path: 'user/:uid',
        lazy: async () => ({
          Component: (await import('./pages/profile')).default,
        }),
      },
      {
        path: 'dating',
        lazy: async () => ({
          Component: (await import('@/pages/dating/index')).default,
        }),
        children: [
          {
            index: true,
            element: <Navigate to='/dating/matches' replace />,
            // when user navigate to /admin it automaticly navigate to /admin/organisations
          },
          {
            path: 'matches',
            lazy: async () => ({
              Component: (await import('@/pages/dating/matches')).default,
            }),
          },

          {
            path: 'likedUsers',
            lazy: async () => ({
              Component: (await import('./pages/dating/liked')).default,
            }),
          },
          {
            path: 'chat',
            lazy: async () => ({
              Component: (await import('./pages/dating/chat')).default,
            }),
          },
        ],
      },
      {
        path: 'settings',
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/settings/profile')).default,
        }),
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
