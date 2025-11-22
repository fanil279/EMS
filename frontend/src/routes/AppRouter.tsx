import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from '../features/dashboard/pages/Dashboard';
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
