import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaEdit, FaLink, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { AdminTechBadge, StyledCard } from '../styles/ProjectsStyles';

interface Props {
    project: Project;
    onDelete: (id: string) => void;
    onOpen: (project: Project) => void;
}

export const AdminProjectCard = ({ project, onDelete, onOpen }: Props) => {
    return (
        <StyledCard >
            <Card.Img
                variant="top"
                src={project.imageUrl}
                alt={project.title}
                style={{ objectFit: 'cover', height: '200px' }}
                onClick={() => onOpen(project)}
            />
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-start">
                    <span>{project.title}</span>
                    <div className="d-flex gap-2">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Visit Project Page</Tooltip>}>
                            <Link
                                to={`${project.url}`}
                                className="btn btn-sm btn-outline-warning"
                                target='_blank'
                            >
                                <FaLink />
                            </Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                            <Link
                                to={`/admin/projects/edit/${project._id}`}
                                className="btn btn-sm btn-outline-primary"
                            >
                                <FaEdit />
                            </Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => onDelete(project._id)}
                            >
                                <FaTrash />
                            </Button>
                        </OverlayTrigger>
                    </div>
                </Card.Title>
                <Card.Text onClick={() => onOpen(project)}>
                    {project.description.length > 80
                        ? project.description.substring(0, 80) + '...'
                        : project.description}
                </Card.Text>
                <div onClick={() => onOpen(project)} className="d-flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                        <AdminTechBadge key={i}>{tech}</AdminTechBadge>
                    ))}
                </div>
            </Card.Body>
        </StyledCard>
    );
};
