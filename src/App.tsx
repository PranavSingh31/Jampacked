import { Routes, Route } from 'react-router-dom';
import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import BusinessForm from './_auth/forms/BusinessForm';
import SwiggyZomato from './_auth/forms/SwiggyZomato';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
// import LandingPage from './_landing/LandingPage';
import { Home } from './_root/pages';
import { Toaster } from '@/components/ui/toaster';

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
          <Route path="/business-details" element={<BusinessForm />} />
          <Route path="/swiggy-zomato" element={<SwiggyZomato/>} />
        </Route>
        
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
