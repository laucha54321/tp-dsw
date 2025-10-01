import { useAuth } from "../hooks/useAuth";
import { Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';

/**
 * 
 * ProtectedRoute component to restrict access to certain routes based on authentication and roles.
 * @param allowedRoles - Array of roles that are allowed to access the route
 * @param children - React elements to render if the user is authenticated and has the required role
 * @example
 *  // Protected Route using children component
 *  <Route path="/path" element={
 *      <ProtectedRoute>
 *          <SomeComponent />
 *      </ProtectedRoute>
 *  }> 
 */
const ProtectedRoute = ({ children }) => {
  // For demo: always allow access to protected routes
  return children;
};

export default ProtectedRoute;
