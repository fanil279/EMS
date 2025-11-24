import { type FC, useState } from 'react';
import { Outlet } from "react-router-dom";
import { Calendar } from 'lucide-react';
import Button from '../components/Button';
import RegisterModal from '../features/auth/modals/RegisterModal';
import SigninModal from '../features/auth/modals/SigninModal';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import authService from '../services/authService';
import { logout } from '../features/auth/authSlice';

const MainLayout: FC = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch<AppDispatch>();

    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showSigninModal, setShowSigninModal] = useState(false);

    async function handleLogout() {
        try {
            const response = await authService.logout();

            if (response) {
                dispatch(logout());
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <div className='min-h-screen flex flex-col bg-gray-100'>
            <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-16">
                        <a href='/' className="flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-white" />
                            <span className="text-xl font-bold text-white">EventHub</span>
                        </a>

                        {!isAuthenticated ? (
                            <div>
                                <Button
                                    variant="secondary"
                                    className="mr-4"
                                    onClick={() => setShowRegisterModal(true)}
                                >
                                    Register
                                </Button>

                                {showRegisterModal &&  <RegisterModal onClose={() => setShowRegisterModal(false)} />}

                                <Button
                                    variant="secondary"
                                    onClick={() => setShowSigninModal(true)}
                                >
                                    Sign In
                                </Button>

                                {showSigninModal && <SigninModal onClose={() => setShowSigninModal(false)} />}
                            </div>
                        ) : (
                                <div className="flex items-center gap-20">
                                    <span className="text-white">Welcome, {user?.name}!</span>

                                    <Button
                                        variant="secondary"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            )   
                        }
                    </nav>
                </div>
            </header>

            <main className='flex-1'>
                <Outlet />
            </main>

            <footer className="bg-slate-950 text-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 md:justify-items-center gap-8 p-8">
                    <div>
                        <h4 className="font-bold mb-4 text-white">EventHub</h4>
                        <p className="text-gray-300 text-sm">Discover and attend amazing events</p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-white">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-white">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-600 pt-4 pb-4 text-center text-sm text-gray-400">
                    <p>&copy; 2025 EventHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
};

export default MainLayout;
