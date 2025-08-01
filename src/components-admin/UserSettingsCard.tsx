import { useEffect, useState } from 'react';
import { Card, Form, Button, Spinner, Collapse, Image } from 'react-bootstrap';
import { useUserStore } from '../store/admin/useUserStore';
import { useAuth } from '../hooks/useAuth';
import { ChangePasswordCard } from './ChangePasswordCard';
import { showErrorToast, showSuccessToast } from '../utils/showToast';
import { FormCard, ThemedFormCheck, ThemedFormControl, ThemedFormLabel, ThemedFormSelect } from '../styles/FormStyles';
import { userDefaultVisibility, type User } from '../types';

export const UserSettingsCard = () => {
    const { user: authUser } = useAuth();
    const {
        user,
        loading,
        fetchUserById,
        editUser,
    } = useUserStore();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        title: '',
        bio: '',
        personalTheme: '',
        telephone: '',
        visibility: userDefaultVisibility,
        quickFacts: ['']
    });

    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [showPasswordCard, setShowPasswordCard] = useState(false);

    const userId = authUser?.id!;

    useEffect(() => {
        if (userId) fetchUserById(userId);
    }, [userId]);

    useEffect(() => {
        if (user) {

            let userVisibility = userDefaultVisibility;

            if (user.visibility) {
                userVisibility = {
                    name: user.visibility.name || false,
                    username: user.visibility.username || false,
                    email: user.visibility.email || false,
                    title: user.visibility.title || false,
                    role: user.visibility.role || false,
                    imageUrl: user.visibility.imageUrl || false,
                    personalTheme: user.visibility.personalTheme || false,
                    bio: user.visibility.bio || false,
                    telephone: user.visibility.telephone || false,
                    quickFacts: user.visibility.quickFacts || false
                };
            }

            setFormData({
                name: user.name,
                username: user.username,
                email: user.email,
                bio: user.bio || '',
                title: user.title || '',
                personalTheme: user.personalTheme || '',
                telephone: user.telephone || '',
                visibility: userVisibility,
                quickFacts: user.quickFacts || []
            });

            setImagePreview(user.imageUrl || '');
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (name === 'quickFacts') {
            const items = value.split(',').map(item => item.trim()).filter(Boolean);
            setFormData(prev => ({
                ...prev,
                [name]: items,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    type VisibilityField = keyof User['visibility'];

    const handleVisibilityChange = <T extends VisibilityField>(field: T) => {
        setFormData((prev) => ({
            ...prev,
            visibility: {
                ...prev.visibility,
                [field]: !prev.visibility?.[field],
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) return;

        try {
            const form = new FormData();
            form.append('name', formData.name);
            form.append('username', formData.username);
            form.append('email', formData.email);
            form.append('title', formData.title);
            form.append('bio', formData.bio);
            form.append('personalTheme', formData.personalTheme);
            form.append('telephone', formData.telephone);
            form.append('quickFacts', JSON.stringify(formData.quickFacts || ['']));
            form.append('visibility', JSON.stringify(formData.visibility || {}));

            console.log({ formData });

            if (imageFile) {
                form.append('image', imageFile);
            }

            await editUser(userId, form);
            showSuccessToast('Profile updated successfully');
        } catch (err) {
            showErrorToast('Error updating profile');
        }
    };

    return (
        <FormCard className="mb-4">
            <Card.Body>
                <Card.Title className='col-md-9 mx-auto mb-4'>User Settings</Card.Title>

                {loading && <Spinner animation="border" />}

                <Form onSubmit={handleSubmit} encType="multipart/form-data" className='col-md-9 mx-auto'>
                    <div className="mb-3 text-center">
                        {imagePreview && (
                            <Image src={imagePreview} roundedCircle width={100} height={100} />
                        )}
                        <Form.Group className="mt-2">
                            <ThemedFormLabel>Profile Picture</ThemedFormLabel>
                            <ThemedFormControl type="file" accept="image/*" onChange={handleImageChange} />
                            <ThemedFormCheck
                                type="switch"
                                id="toggle-imageUrl"
                                label="Public"
                                checked={formData.visibility?.imageUrl}
                                onChange={() => handleVisibilityChange('imageUrl')}
                            />
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Name</ThemedFormLabel>
                        <ThemedFormControl name="name" value={formData.name} onChange={handleChange} />
                        <ThemedFormCheck
                            type="switch"
                            id="toggle-name"
                            label="Public"
                            checked={formData.visibility?.name}
                            onChange={() => handleVisibilityChange('name')}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Username</ThemedFormLabel>
                        <ThemedFormControl name="username" value={formData.username} onChange={handleChange} />
                        <ThemedFormCheck
                            type="switch"
                            id="toggle-username"
                            label="Public"
                            checked={formData.visibility?.username}
                            onChange={() => handleVisibilityChange('username')}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Email</ThemedFormLabel>
                        <ThemedFormControl name="email" type="email" value={formData.email} onChange={handleChange} />
                        <ThemedFormCheck
                            type="switch"
                            id="toggle-email"
                            label="Public"
                            checked={formData.visibility?.email}
                            onChange={() => handleVisibilityChange('email')}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Title</ThemedFormLabel>
                        <ThemedFormControl name="title" value={formData.title} onChange={handleChange} />
                        <ThemedFormCheck
                            type="switch"
                            id="toggle-title"
                            label="Public"
                            checked={formData.visibility?.title}
                            onChange={() => handleVisibilityChange('title')}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex flex-column">
                        <ThemedFormLabel>Bio</ThemedFormLabel>
                        <ThemedFormControl
                            as="textarea"
                            rows={3}
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                        />
                        <ThemedFormCheck
                            type="switch"
                            id="toggle-bio"
                            label="Public"
                            checked={formData.visibility?.bio}
                            onChange={() => handleVisibilityChange('bio')}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex flex-column">
                        <ThemedFormLabel>Quick Facts</ThemedFormLabel>
                        <ThemedFormControl
                            type="text"
                            name="quickFacts"
                            value={Array.isArray(formData.quickFacts) ? formData.quickFacts.join(', ') : ''}
                            onChange={handleChange}
                        />
                        <ThemedFormCheck
                            type="switch"
                            id="toggle-quickFacts"
                            label="Public"
                            checked={formData.visibility?.quickFacts}
                            onChange={() => handleVisibilityChange('quickFacts')}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Telephone</ThemedFormLabel>
                        <ThemedFormControl name="telephone" value={formData.telephone} onChange={handleChange} type="tel" />
                        <ThemedFormCheck
                            type="switch"
                            id="toggle-telephone"
                            label="Public"
                            checked={formData.visibility?.telephone}
                            onChange={() => handleVisibilityChange('telephone')}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Preferred Theme</ThemedFormLabel>
                        <ThemedFormSelect
                            name="personalTheme"
                            value={formData.personalTheme}
                            onChange={handleChange}
                        >
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                        </ThemedFormSelect>
                        <ThemedFormCheck
                            type="switch"
                            id="toggle-personalTheme"
                            label="Public"
                            checked={formData.visibility?.personalTheme}
                            onChange={() => handleVisibilityChange('personalTheme')}
                        />
                    </Form.Group>


                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </Form>

                <div className='col-md-9 mx-auto'>
                    <hr />
                    <Button
                        variant="outline-secondary"
                        onClick={() => setShowPasswordCard(!showPasswordCard)}
                        aria-controls="password-collapse"
                        aria-expanded={showPasswordCard}
                        className='mx-auto'
                    >
                        {showPasswordCard ? 'Hide Password Form' : 'Change Password'}
                    </Button>
                </div>

                <Collapse in={showPasswordCard}>
                    <div id="password-collapse">
                        <ChangePasswordCard />
                    </div>
                </Collapse>
            </Card.Body>
        </FormCard>
    );
};
