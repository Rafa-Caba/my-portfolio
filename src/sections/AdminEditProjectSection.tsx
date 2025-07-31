import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import type { Project } from '../types';
import { useProjectsStore } from '../store/admin/useProjectsStore';
import { FormCard, ThemedFormCheck, ThemedFormControl, ThemedFormLabel, ThemedFormSelect } from '../styles/FormStyles';
import { Title } from '../styles/ProjectsStyles';

const MySwal = withReactContent(Swal);

export const AdminEditProjectSection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { editProject, fetchProjectById } = useProjectsStore();

    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState<Partial<Project>>({});
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [newImage, setNewImage] = useState<File | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                if (!id) return;
                const data = await fetchProjectById(id);
                if (!data) return;

                setForm({
                    ...data,
                    technologies: data.technologies,
                });
                setImagePreview(data.imageUrl || null);
            } catch (error) {
                console.error('Error loading project:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (name === 'technologies') {
            setForm((prev) => ({
                ...prev,
                technologies: value.split(',').map((tech) => tech.trim()),
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : value,
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        const formData = new FormData();
        formData.append('title', form.title || '');
        formData.append('description', form.description || '');
        formData.append('url', form.url || '');
        formData.append('repoUrl', form.repoUrl || '');
        formData.append('technologies', (form.technologies || '').toString());
        formData.append('category', form.category || '');
        formData.append('status', form.status || '');
        formData.append('isPublic', String(form.isPublic));

        if (newImage) formData.append('image', newImage);

        try {
            await editProject(id, formData);

            await MySwal.fire({
                title: '✅ Project updated!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
            });
            navigate('/admin/projects');
        } catch (err) {
            console.error(err);
            MySwal.fire({
                title: '❌ Error updating project',
                text: 'Please check the form and try again.',
                icon: 'error',
            });
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <FormCard>
            <Card.Body>
                <Title>Editing Project: {form.title}</Title>
                <Form onSubmit={handleSubmit} className="p-3 p-md-4">
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <ThemedFormLabel>Title</ThemedFormLabel>
                                <ThemedFormControl
                                    type="text"
                                    name="title"
                                    value={form.title || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 d-flex flex-column">
                                <ThemedFormLabel>Description</ThemedFormLabel>
                                <ThemedFormControl
                                    as="textarea"
                                    name="description"
                                    value={form.description || ''}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <ThemedFormLabel>URL</ThemedFormLabel>
                                <ThemedFormControl
                                    type="text"
                                    name="url"
                                    value={form.url || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <ThemedFormLabel>Repo URL</ThemedFormLabel>
                                <ThemedFormControl
                                    type="text"
                                    name="repoUrl"
                                    value={form.repoUrl || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <ThemedFormLabel>Technologies (comma separated)</ThemedFormLabel>
                                <ThemedFormControl
                                    type="text"
                                    name="technologies"
                                    value={(form.technologies || []).join(', ')}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <ThemedFormLabel>Category</ThemedFormLabel>
                                <ThemedFormControl
                                    type="text"
                                    name="category"
                                    value={form.category || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <ThemedFormLabel>Status</ThemedFormLabel>
                                <ThemedFormSelect
                                    name="status"
                                    value={form.status || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Archived">Archived</option>
                                </ThemedFormSelect>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <ThemedFormLabel>Project Image</ThemedFormLabel>
                                <ThemedFormControl
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {imagePreview && (
                                    <div className="mt-3 text-center">
                                        <Image src={imagePreview} thumbnail style={{ maxHeight: '200px' }} />
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    <ThemedFormCheck
                        type="switch"
                        id="toggle-isPublic"
                        label="Public"
                        name="isPublic"
                        checked={form.isPublic || false}
                        onChange={handleChange}
                    />

                    <div className="text-center mt-4">
                        <Button variant="primary" type="submit">Update Project</Button>
                        <Button className='btn btn-secondary ms-2' onClick={() => navigate('/admin/projects')}>Cancel</Button>
                    </div>
                </Form>
            </Card.Body>
        </FormCard>
    );
};
