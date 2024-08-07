import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.auth);
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute