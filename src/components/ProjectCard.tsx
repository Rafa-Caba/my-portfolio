import type { JSX } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { type Project } from '../types/projects';
import {
    SiReact,
    SiMongodb,
    SiStyledcomponents,
    SiNodedotjs,
    SiTypescript
} from 'react-icons/si';
import {
    Description,
    Image,
    Links,
    Placeholder,
    TechBadge,
    TechContainer,
    Title
} from '../styles/ProjectsStyles';
import { Card } from '../styles/public/ProjectsStyles';

interface Props {
    project: Project;
    isHovered: boolean;
    isAnyHovered: boolean;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}

const techIcons: Record<string, JSX.Element> = {
    React: <SiReact title="React" />,
    TypeScript: <SiTypescript title="TypeScript" />,
    'Node.js': <SiNodedotjs title="Node.js" />,
    MongoDB: <SiMongodb title="MongoDB" />,
    'Styled-Components': <SiStyledcomponents title="Styled-Components" />,
};

export const ProjectCard = ({ project, isHovered, isAnyHovered, onHoverStart, onHoverEnd }: Props) => {
    return (
        <Card
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, ease: 'easeOut' }}

            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            animate={{
                scale: isHovered ? 1.05 : isAnyHovered ? 0.96 : 1,
                opacity: isHovered ? 1 : isAnyHovered ? 0.6 : 1,
                zIndex: isHovered ? 10 : 1,
                filter: isHovered ? 'blur(0) brightness(1.1)' : 'none',
                backdropFilter: isHovered ? 'blur(4px)' : 'none',
                boxShadow: isHovered ? '0px 4px 20px rgba(0,0,0,0.2)' : 'none',
            }}
        >
            {project.imageUrl ? (
                <Image src={project.imageUrl} alt={project.title} />
            ) : (
                <Placeholder>No image</Placeholder>
            )}

            <Title>{project.title}</Title>
            <Description>{project.description}</Description>

            <TechContainer>
                {project.technologies.map((tech) => (
                    <TechBadge key={tech} title={tech}>
                        {techIcons[tech] ?? <span>{tech}</span>}
                    </TechBadge>
                ))}
            </TechContainer>

            <Links>
                {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                )}
                {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt />
                    </a>
                )}
            </Links>
        </Card>
    );
};