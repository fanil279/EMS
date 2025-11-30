import { useState } from 'react';

function useIsAuthModal() {
    const [showNotAuthModal, setShowNotAuthModal] = useState(false);

    return { showNotAuthModal, setShowNotAuthModal };
}

export default useIsAuthModal;
