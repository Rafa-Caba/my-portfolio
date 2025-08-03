import { useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useProjectsStore } from '../store/admin/useProjectsStore';
import { AdminSectionHeader } from '../components-admin/AdminSectionHeader';
import { AdminProjectCard } from '../components-admin/AdminProjectCard';
import type { Project } from '../types';
import { ProjectsGrid } from '../styles/ProjectsStyles';
import { ProjectPreviewModal } from '../components-admin/ProjectPreviewModal';

const MySwal = withReactContent(Swal);

export const AdminProjectsSection = () => {
    const { projects, fetchProjects, removeProject, loading } = useProjectsStore();
    const [selected, setSelected] = useState<Project | null>(null);

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
        <div className='p-2 p-md-3'>
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
                <Row className="g-4">
                    <ProjectsGrid>
                        {projects.map((project) => (
                            <AdminProjectCard
                                key={project._id}
                                project={project}
                                onDelete={handleDelete}
                                onOpen={setSelected}
                            />
                        ))}
                    </ProjectsGrid>
                </Row>
            )}

            <ProjectPreviewModal project={selected} onClose={() => setSelected(null)} />
        </div>
    );
};
