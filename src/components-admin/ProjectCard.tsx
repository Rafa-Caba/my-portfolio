import { ProjectStyledCard } from '../styles/ProjectsStyles';
import type { Project } from '../types';

interface Props {
    project: Project;
    onOpen: (project: Project) => void;
}

export const ProjectCard = ({ project, onOpen }: Props) => {
    return (
        <ProjectStyledCard
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpen(project)}
        >
            <img src={project.imageUrl} alt={project.title} />
            <h4>{project.title}</h4>
            <p>{project.description.slice(0, 100)}...</p>
        </ProjectStyledCard>
    );
};
