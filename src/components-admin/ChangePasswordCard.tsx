// src/components-admin/ChangePasswordCard.tsx
import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useUserStore } from '../store/admin/useUserStore';
import { ThemedFormControl, ThemedFormLabel } from '../styles/FormStyles';

export const ChangePasswordCard = () => {
    const { updatePassword, loading } = useUserStore();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await updatePassword({ currentPassword, newPassword });
            setSuccess(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('Error updating password');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-3 col-md-9 mx-auto">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Password updated successfully</Alert>}

            <Form.Group className="mb-3">
                <ThemedFormLabel>Current Password</ThemedFormLabel>
                <ThemedFormControl
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <ThemedFormLabel>New Password</ThemedFormLabel>
                <ThemedFormControl
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <ThemedFormLabel>Confirm New Password</ThemedFormLabel>
                <ThemedFormControl
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Button type="submit" variant="secondary" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border" /> : 'Update Password'}
            </Button>
        </Form>
    );
};
