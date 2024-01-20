import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
    const isAuthenticated = false;
    const isSignupComplete = false; // Replace this with actual logic to determine if the user completed the signup process

    return (
        <>
            {isAuthenticated && !isSignupComplete ? (
                <Navigate to="/business-details" />
            ) : isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <section className="flex flex-1 justify-center items-center flex-col py-10">
                    <Outlet />
                </section>
            )}
        </>
    );
}

export default AuthLayout;
