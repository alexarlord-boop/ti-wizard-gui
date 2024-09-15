// src/context/TourContext.jsx
import React, { createContext, useContext, useState } from 'react';

const TourContext = createContext(undefined);

export function useTour() {
    return useContext(TourContext);
}

export function TourProvider({ children }) {
    const [startTour, setStartTour] = useState(null);

    return (
        <TourContext.Provider value={{ startTour, setStartTour }}>
            {children}
        </TourContext.Provider>
    );
}
