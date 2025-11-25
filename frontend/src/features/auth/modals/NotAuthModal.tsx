import { type FC } from 'react';
import Button from '../../../components/Button';
import type { AuthModalProps } from '../../../types';

const NotAuthModal: FC<AuthModalProps> = ({ onClose }) => (
    <div className='fixed inset-0 z-50 flex items-center backdrop-blur justify-center p-4'>
        <div className='absolute bg-white rounded-3xl shadow-lg w-full max-w-2xl p-10 max-h-[90vh] overflow-y-auto relative'>
            <button
                onClick={onClose}
                className='absolute top-6 right-6 text-gray-500 cursor-pointer hover:text-gray-700 text-3xl font-bold'
            >
                &times;
            </button>

            <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
                You are not authenticated
            </h2>

            <div>
                <Button
                    variant='primary'
                    className='w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white pointer-events-none font-semibold rounded-lg shadow-lg transition'
                >
                    Register or Sign In please!
                </Button>
            </div>
        </div>
    </div>
);

export default NotAuthModal;
