import React, {useState} from 'react';
import {Switch} from "@/components/ui/switch";
import {Spinner} from "../../../components/ui/Loader.jsx";
import {cn} from "../../../lib/utils.js";

const StatusToggle = ({initialStatus, onStatusChange}) => {
    const [status, setStatus] = useState(initialStatus);
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        setLoading(true);
        try {
            // Simulate a network request or async operation
            await new Promise(resolve => setTimeout(resolve, 500));

            setStatus(prevStatus => !prevStatus);
            onStatusChange(status);
        } catch (error) {
            console.error('Error toggling status:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center">

            <div className="flex w-[50px]">
                <Switch

                    checked={status}
                    onClick={handleToggle}
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                />
                {
                    loading && <Spinner size="sm" className="mx-auto" />
                }
            </div>


        </div>
    );
};

export default StatusToggle;
