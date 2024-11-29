// frontend/tct/src/MainPage/navigateFunctions.js
import { useState } from 'react';

export function useNavigateToNextPage() {
    const [showNextPage, setShowNextPage] = useState(false);

    const handleNextPageClick = () => {
        setShowNextPage(true);
    };

    return { showNextPage, handleNextPageClick };
}
