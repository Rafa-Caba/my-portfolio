import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { useThemeContext } from '../context/ThemeContext';
import type { RegisterPayload } from '../types';

import {
    CenteredContainer,
    GlassCard,
    LoginIcons,
    IconFlipWrapper,
    FlipInner,
    FlipFace,
    FlipBack,
    LoginTagline,
    AuthSwitchLink,
    ToggleTheme,
} from '../styles/admin/LoginStyles';

import CatIcon from '../assets/cat-icon.svg?react';
import CoffeeIcon from '../assets/coffee-icon-fixed.svg?react';
import { showToast } from '../utils/showToast';

export const RegisterSection = () => {
    const { register: registerUser, loading } = useAuth();
    const { isDark, toggleTheme } = useThemeContext();
    const navigate = useNavigate();

    const [form, setForm] = useState<RegisterPayload>({
        name: '',
        username: '',
        email: '',
        password: '',
        bio: '',
        imagen: null,
    });

    const [error, setError] = useState('');
    const [preview, setPreview] = useState<string | null>(null);

    // 🔁 Handle image input and preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);

        setForm({ ...form, imagen: file });
    };

    // 🔁 Handle all text input fields
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔁 Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('username', form.username);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('bio', form.bio || '');

        if (form.imagen) {
            formData.append('imagen', form.imagen);
        }

        try {
            await registerUser(formData);
            showToast('Registration successful!', 'success');
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Registration failed. Please check your input.');
            showToast('Registration failed 😓', 'error');
        }
    };

    return (
        <CenteredContainer>
            {/* Toggle Light/Dark */}
            <ToggleTheme onClick={toggleTheme}>
                {isDark ? '☀️ Light' : '🌙 Dark'}
            </ToggleTheme>

            <div
                style={{
                    width: '100%',
                    maxWidth: 520,
                    marginTop: '1rem',
                    padding: '0 1rem',
                }}
            >
                {/* Icons */}
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
                        <h2 className="mb-4 text-center">Admin Register</h2>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

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

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="bio">
                                <Form.Label>Bio:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="bio"
                                    value={form.bio}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Tell us something cool 😎"
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="imagen">
                                <Form.Label>Profile Picture:</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {preview && (
                                    <div className="text-center mt-3">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            style={{
                                                maxWidth: '100%',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                            }}
                                        />
                                    </div>
                                )}
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                                className="w-100"
                            >
                                {loading ? <Spinner size="sm" animation="border" /> : 'Register'}
                            </Button>
                        </Form>

                        <AuthSwitchLink onClick={() => navigate('/admin/login')}>
                            Already have an account? Log in
                        </AuthSwitchLink>
                    </Card.Body>
                </GlassCard>
            </div>
        </CenteredContainer>
    );
};
