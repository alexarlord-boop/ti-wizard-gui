import React from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription} from '../ui/dialog';
import { Button } from '../ui/button.jsx';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, allowConfirmation=true, title, description, content }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {description}
                </DialogDescription>
                {content}
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    {allowConfirmation && <Button variant="destructive" onClick={onConfirm}>Confirm</Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationModal;