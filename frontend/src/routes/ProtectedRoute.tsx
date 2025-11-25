import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { ProtectedRouteProps } from '../types';
import type { RootState } from '../store';

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const alertShown = useRef(false);

    useEffect(() => {
        if (!isAuthenticated && !alertShown.current) {
            alert('Register or Sign In please!');
            
            alertShown.current = true;
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    } else {
        return <>{children}</>;
    }
};

export default ProtectedRoute;
