import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import {Spinner} from "../../components/ui/Loader.jsx";

const StatusToggle = ({ initialStatus }) => {
    const [status, setStatus] = useState(initialStatus);
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        console.log("toggling")
        setLoading(true);
        try {
            // Simulate a network request or async operation
            await new Promise(resolve => setTimeout(resolve, 500));

            // Toggle status between 'on' and 'off'
            setStatus(prevStatus => (prevStatus === 'off' ? 'on' : 'off'));
        } catch (error) {
            console.error('Error toggling status:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            {loading ? (
                <Spinner size="sm" />
            ) : (
                <>
                    <Switch
                        checked={status === 'on'}
                        onClick={handleToggle}
                    />
                    <span className="ml-2">{status}</span>
                </>

            )}

        </div>
    );
};

export default StatusToggle;
