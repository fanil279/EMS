import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../features/dashboard/pages/Dashboard';
import Events from '../features/events/pages/Events';
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={<MainLayout />}
                >
                    <Route index element={<Dashboard />} />
                </Route>

                <Route
                    path='/events'
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Events />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
