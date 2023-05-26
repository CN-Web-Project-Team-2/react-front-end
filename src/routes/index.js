import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
// paths
import { PATH_ADMIN, PATH_LEARNING, PATH_PAGE } from './paths';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },
 
    {
      path: '/demo',
      element: <Demo />,
    },
    {
      path: '/loading',
      element: <LoadingScreen fullScreen />,
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={PATH_LEARNING.test.root} replace />, index: true },
        {
          path: PATH_ADMIN.root,
          element: (
            <RoleBasedGuard accessibleRoles={['admin', 'mod']}>
              <Admin />
            </RoleBasedGuard>
          ),
        },
        {
          path: PATH_ADMIN.importTest,
          element: (
            <RoleBasedGuard accessibleRoles={['admin', 'mod']}>
              <ImportTest />
            </RoleBasedGuard>
          ),
        },
        {
          path: '/profile',
          element: (
            <AuthGuard>
              <Profile />
            </AuthGuard>
          ),
        },
        // question
        { path: PATH_LEARNING.root, element: <Navigate to={PATH_LEARNING.question.root} replace />, index: true },
        { path: PATH_LEARNING.question.root, element: <Questions /> },
        {
          path: PATH_LEARNING.question.edit,
          element: (
            <RoleBasedGuard accessibleRoles={['admin', 'mod']}>
              <EditQuestion />
            </RoleBasedGuard>
          ),
        },
        {
          path: PATH_LEARNING.question.create,
          element: (
            <RoleBasedGuard accessibleRoles={['admin', 'mod']}>
              <NewQuestion />
            </RoleBasedGuard>
          ),
        },
        { path: PATH_LEARNING.question.id, element: <Question /> },
        
    {
      path: '/',
      element: <Navigate to={PATH_LEARNING.root} replace />,
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
// const Register = Loadable(lazy(() => import('../pages/auth/Register')));
// Learning
// - Question
const Questions = Loadable(lazy(() => import('../pages/learning/question/Questions')));
const Question = Loadable(lazy(() => import('../pages/learning/question/Question')));
const NewQuestion = Loadable(lazy(() => import('../pages/learning/question/NewQuestion')));
const EditQuestion = Loadable(lazy(() => import('../pages/learning/question/EditQuestion')));

// Page
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const Demo = Loadable(lazy(() => import('../pages/Demo')));
const Admin = Loadable(lazy(() => import('../pages/admin/Admin')));
const ImportTest = Loadable(lazy(() => import('../pages/admin/ImportTest')));
const Profile = Loadable(lazy(() => import('../pages/Profile')));
