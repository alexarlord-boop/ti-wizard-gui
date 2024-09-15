import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "../components/context/TourContext.jsx";

const usePageTour = (steps) => {
    const { setStartTour } = useTour();

    useEffect(() => {
        const driverObj = driver({
            popoverClass: "driverjs-theme",
            showProgress: true,
            showButtons: ["next", "previous", "close"],
            steps,
        });

        // Set the tour function for this page
        setStartTour(() => () => driverObj.drive());

        return () => {
            setStartTour(null); // Clear tour function when leaving page
        };
    }, [setStartTour, steps]);
};

export default usePageTour;
