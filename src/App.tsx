import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './_root/pages';
import { Toaster } from '@/components/ui/toaster';
import { useUserContext } from './context/AuthContext';
import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import BusinessForm from './_auth/forms/BusinessForm';
import SwiggyZomato from './_auth/forms/SwiggyZomato';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
// import LandingPage from './_landing/LandingPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) {
    return <Navigate to="/sign-up" replace />;
  }

  return children;
};


const App = () => {

  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public routes
        <Route path="/landing-page" element={<LandingPage />} /> */}

        {/* Auth routes with shared layout */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Route>

        <Route path="/business-details" element={
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <ProtectedRoute>
              <BusinessForm />
            </ProtectedRoute>
          </section>
        } />
        <Route path="/swiggy-zomato" element={
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <ProtectedRoute>
              <SwiggyZomato />
            </ProtectedRoute>
          </section>
        } />

        {/* Private routes with shared layout */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          {/* ... other private routes ... */}
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App;
