import { useState } from 'react';
import { Form, Button, Card, Spinner, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { NewProjectPayload } from '../types';
import { showErrorToast, showSuccessToast } from '../utils/showToast';
import { Title } from '../styles/ProjectsStyles';
import { FormCard, ThemedFormCheck, ThemedFormControl, ThemedFormLabel, ThemedFormSelect } from '../styles/FormStyles';
import { useProjectsStore } from '../store/admin/useProjectsStore';

export const AdminCreateProjectSection = () => {
    const navigate = useNavigate();
    const { addProject } = useProjectsStore();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [form, setForm] = useState<NewProjectPayload>({
        title: '',
        description: '',
        url: '',
        repoUrl: '',
        technologies: '',
        category: '',
        status: 'Active',
        isPublic: false,
        image: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm((prev) => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('url', form.url);
            formData.append('technologies', form.technologies);
            formData.append('category', form.category);
            formData.append('status', form.status);
            formData.append('isPublic', String(form.isPublic));

            if (form.image) formData.append('image', form.image);

            await addProject(formData);
            showSuccessToast('Project created successfully!');

            navigate('/admin/projects');
        } catch (error) {
            console.error(error);
            showErrorToast('Error creating project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormCard>
            <Card.Body>
                <Title>Create New Project</Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Title</ThemedFormLabel>
                        <ThemedFormControl
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex flex-column">
                        <ThemedFormLabel>Description</ThemedFormLabel>
                        <ThemedFormControl
                            as="textarea"
                            name="description"
                            rows={3}
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Technologies (comma-separated)</ThemedFormLabel>
                        <ThemedFormControl
                            type="text"
                            name="technologies"
                            value={form.technologies}
                            onChange={handleChange}
                        />
                        <div className="mt-2">
                            {form.technologies.split(',').filter(Boolean).map((tech, i) => (
                                <Badge bg="info" key={i} className="me-1">{tech.trim()}</Badge>
                            ))}
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Category</ThemedFormLabel>
                        <ThemedFormControl
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Status</ThemedFormLabel>
                        <ThemedFormSelect name="status" value={form.status} onChange={handleChange}>
                            <option value="">Select status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Archived">Archived</option>
                        </ThemedFormSelect>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Live URL</ThemedFormLabel>
                        <ThemedFormControl
                            type="url"
                            name="url"
                            value={form.url}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <ThemedFormLabel>Live RepoURL</ThemedFormLabel>
                        <ThemedFormControl
                            type="repoUrl"
                            name="repoUrl"
                            value={form.repoUrl}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <ThemedFormLabel>Project Image</ThemedFormLabel>
                        <ThemedFormControl
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {preview && (
                            <img src={preview} alt="Preview" className="mt-2 rounded" style={{ maxWidth: '200px' }} />
                        )}
                    </Form.Group>

                    <ThemedFormCheck
                        type="switch"
                        id="toggle-isPublic"
                        label="Public"
                        checked={form.isPublic ? true : false}
                        onChange={handleChange}
                    />

                    <Button type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Create Project'}
                    </Button>
                    <Button className='btn btn-secondary ms-2' onClick={() => navigate('/admin/projects')}>Cancel</Button>
                </Form>
            </Card.Body>
        </FormCard>
    );
};
