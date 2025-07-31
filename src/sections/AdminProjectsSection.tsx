// src/sections-admin/AdminProjectsSection.tsx
import { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useProjectsStore } from '../store/admin/useProjectsStore';
import { AdminSectionHeader } from '../components-admin/AdminSectionHeader';
import { AdminProjectCard } from '../components-admin/AdminProjectCard';

const MySwal = withReactContent(Swal);

export const AdminProjectsSection = () => {
    const { projects, fetchProjects, removeProject, loading } = useProjectsStore();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleDelete = async (projectId: string) => {
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            await removeProject(projectId);
        }
    };

    return (
        <div className='p-3'>
            <AdminSectionHeader
                title="Projects"
                subtitle="Manage your portfolio projects"
                buttonLabel="New Project"
                buttonTo="/admin/projects/new"
            />

            {loading ? (
                <div className="d-flex justify-content-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {projects.map((project) => (
                        <Col key={project._id}>
                            <AdminProjectCard project={project} onDelete={handleDelete} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};
