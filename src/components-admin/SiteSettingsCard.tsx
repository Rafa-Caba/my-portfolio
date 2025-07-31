// src/components-admin/SiteSettingsCard.tsx
import { useEffect, useState } from 'react';
import { Card, Form, Button, Spinner, Row, Col, Image } from 'react-bootstrap';
import { useSettingsStore } from '../store/admin/useSettingsStore';
import { showSuccessToast, showErrorToast } from '../utils/showToast';
import { defaultVisibility, type SiteSettings } from '../types';
import { FormCard, ThemedFormCheck, ThemedFormControl, ThemedFormLabel } from '../styles/FormStyles';

export const SiteSettingsCard = () => {
    const { settings, loading, fetchSettings, saveSettings } = useSettingsStore();

    const [formData, setFormData] = useState<SiteSettings>({
        homepageTagline: '',
        aboutText: '',
        contactEmail: '',
        socialLinks: {
            github: '',
            linkedin: '',
            facebook: '',
        },
        visibility: defaultVisibility,
    });

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [faviconFile, setFaviconFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState('');
    const [faviconPreview, setFaviconPreview] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    useEffect(() => {
        if (settings) {
            setFormData({
                homepageTagline: settings.homepageTagline || '',
                aboutText: settings.aboutText || '',
                contactEmail: settings.contactEmail || '',
                socialLinks: settings.socialLinks || {
                    github: '',
                    linkedin: '',
                    facebook: '',
                },
                visibility: settings.visibility || defaultVisibility,
                logoUrl: settings.logoUrl,
                faviconUrl: settings.faviconUrl,
            });
            setLogoPreview(settings.logoUrl || '');
            setFaviconPreview(settings.faviconUrl || '');
        }
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name in formData.socialLinks!) {
            setFormData((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, [name]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (type === 'logo') {
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        } else {
            setFaviconFile(file);
            setFaviconPreview(URL.createObjectURL(file));
        }
    };

    type VisibilityField = keyof SiteSettings['visibility'];

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
        try {
            if (!formData) return;

            const form = new FormData();
            form.append('homepageTagline', formData.homepageTagline);
            form.append('aboutText', formData.aboutText);
            form.append('contactEmail', formData.contactEmail);
            form.append('socialLinks.github', formData.socialLinks.github || '');
            form.append('socialLinks.linkedin', formData.socialLinks.linkedin || '');
            form.append('socialLinks.facebook', formData.socialLinks.facebook || '');
            form.append('visibility', JSON.stringify(formData.visibility || {}));

            if (logoFile) form.append('logo', logoFile);
            if (faviconFile) form.append('favicon', faviconFile);

            await saveSettings(form);
            showSuccessToast('Site settings updated successfully');
        } catch (err) {
            showErrorToast('Failed to update site settings');
        }
    };

    return (
        <FormCard className="mb-4">
            <Card.Body>
                <Card.Title className='col-md-9 mx-auto mb-4'>Site-Wide Settings</Card.Title>
                {loading && <Spinner animation="border" className="mb-3" />}

                <Form onSubmit={handleSubmit} encType="multipart/form-data" className='col-md-9 mx-auto'>
                    <Form.Group className="my-3">
                        <ThemedFormLabel>Homepage Tagline</ThemedFormLabel>
                        <ThemedFormControl
                            name="homepageTagline"
                            value={formData.homepageTagline}
                            onChange={handleChange}
                        />
                        <ThemedFormCheck
                            type="switch"
                            id="toggle-homepageTagline"
                            label="Public"
                            checked={formData.visibility?.homepageTagline}
                            onChange={() => handleVisibilityChange('homepageTagline')}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex flex-column">
                        <ThemedFormLabel>About Text</ThemedFormLabel>
                        <ThemedFormControl
                            as="textarea"
                            rows={4}
                            name="aboutText"
                            value={formData.aboutText}
                            onChange={handleChange}
                        />
                        <ThemedFormCheck
                            type="switch"
                            id="toggle-aboutText"
                            label="Public"
                            checked={formData.visibility?.aboutText}
                            onChange={() => handleVisibilityChange('aboutText')}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Contact Email</ThemedFormLabel>
                        <ThemedFormControl
                            name="contactEmail"
                            type="email"
                            value={formData.contactEmail}
                            onChange={handleChange}
                        />
                        <ThemedFormCheck
                            type="switch"
                            id="toggle-contactEmail"
                            label="Public"
                            checked={formData.visibility?.contactEmail}
                            onChange={() => handleVisibilityChange('contactEmail')}
                        />
                    </Form.Group>

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <ThemedFormLabel>GitHub</ThemedFormLabel>
                                <ThemedFormControl
                                    name="github"
                                    value={formData.socialLinks.github}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <ThemedFormLabel>LinkedIn</ThemedFormLabel>
                                <ThemedFormControl
                                    name="linkedin"
                                    value={formData.socialLinks.linkedin}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <ThemedFormLabel>Facebook</ThemedFormLabel>
                                <ThemedFormControl
                                    name="facebook"
                                    value={formData.socialLinks.facebook}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <ThemedFormCheck
                        type="switch"
                        id="toggle-socialLinks"
                        label="Public"
                        checked={formData.visibility?.socialLinks}
                        onChange={() => handleVisibilityChange('socialLinks')}
                    />

                    <Row>
                        <Col md={6} className="text-center">
                            <Form.Group className="mb-3">
                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                    <ThemedFormLabel>Logo</ThemedFormLabel>
                                    {logoPreview && <Image src={logoPreview} width={120} className="mb-3 rounded" />}
                                </div>
                                <ThemedFormControl
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e as React.ChangeEvent<HTMLInputElement>, 'logo')}
                                />
                                <ThemedFormCheck
                                    type="switch"
                                    id="toggle-logoUrl"
                                    label="Public"
                                    checked={formData.visibility?.logoUrl}
                                    onChange={() => handleVisibilityChange('logoUrl')}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="text-center">
                            <Form.Group className="mb-3">
                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                    <ThemedFormLabel>Favicon</ThemedFormLabel>
                                    {faviconPreview && <Image src={faviconPreview} width={120} className="mb-3" />}
                                </div>
                                <ThemedFormControl
                                    type="file"
                                    accept="image/*,image/x-icon"
                                    onChange={(e) => handleFileChange(e as React.ChangeEvent<HTMLInputElement>, 'favicon')}
                                />
                                <ThemedFormCheck
                                    type="switch"
                                    id="toggle-faviconUrl"
                                    label="Public"
                                    checked={formData.visibility?.faviconUrl}
                                    onChange={() => handleVisibilityChange('faviconUrl')}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </Form>
            </Card.Body>
        </FormCard>
    );
};
