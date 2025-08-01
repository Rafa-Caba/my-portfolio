import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import {
    CenteredContainer,
    GlassCard,
    LoginIcons,
    IconFlipWrapper,
    FlipInner,
    FlipFace,
    FlipBack,
    LoginTagline,
    // AuthSwitchLink,
} from '../styles/admin/LoginStyles';
import CatIcon from '../assets/cat-icon.svg?react';
import CoffeeIcon from '../assets/coffee-icon-fixed.svg?react';
import type { LoginPayload } from '../types';
import { showToast } from '../utils/showToast';
import { useDashboardStore } from '../store/admin/useDashboardStore';

export const LoginSection = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState<LoginPayload>({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(form);

            useDashboardStore.getState().fetchStats();
            showToast('Welcome back! 🎉', 'success');

            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid email or password');
            showToast('Login failed ❌', 'error');
        }
    };

    return (
        <CenteredContainer>
            <div style={{ width: '100%', maxWidth: 420, marginTop: '1rem' }}>
                <LoginIcons>
                    <IconFlipWrapper>
                        <FlipInner>
                            <FlipFace>
                                <CoffeeIcon />
                            </FlipFace>
                            <FlipBack>
                                <CatIcon />
                            </FlipBack>
                        </FlipInner>
                    </IconFlipWrapper>
                </LoginIcons>

                <LoginTagline>
                    Fueled by coffee. Powered by curiosity. ☕🐈‍⬛
                </LoginTagline>

                <GlassCard>
                    <Card.Body>
                        <h2 className="mb-4 text-center">Admin Login</h2>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                                className="w-100"
                            >
                                {loading ? <Spinner size="sm" animation="border" /> : 'Log In'}
                            </Button>
                        </Form>

                        {/* <AuthSwitchLink onClick={() => navigate('/admin/register')}>
                            Don't have an account? Register here
                        </AuthSwitchLink> */}
                    </Card.Body>
                </GlassCard>
            </div>
        </CenteredContainer>
    );
};
