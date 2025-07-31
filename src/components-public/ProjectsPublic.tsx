import { useEffect, useState } from 'react';
import { usePublicContext } from '../context/public/PublicContext';
import { ProjectCard } from '../components/ProjectCard';
import { Container, EndImage } from '../styles/public/ProjectsStyles';
import endIllustration from '../assets/cat-bye.png';
import { motion } from 'framer-motion';

export const ProjectsPublic = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(3);
    const { publicProjects, loading } = usePublicContext();

    useEffect(() => {
        const handleScroll = () => {
            const nearBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 100;

            if (nearBottom && visibleCount < publicProjects.length) {
                setVisibleCount((prev) => prev + 3);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleCount, publicProjects.length]);

    const visibleProjects = publicProjects.slice(0, visibleCount);
    const noMoreProjects = visibleCount >= publicProjects.length;

    return (
        <Container>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                My Projects
            </motion.h1>

            {loading && <p>Loading projects...</p>}

            {!loading && publicProjects.length === 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    No public projects available.
                </motion.p>
            )}

            {visibleProjects.map((project, index) => (
                <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                    <ProjectCard
                        project={project}
                        isHovered={hoveredCard === project._id}
                        isAnyHovered={hoveredCard !== null}
                        onHoverStart={() => setHoveredCard(project._id)}
                        onHoverEnd={() => setHoveredCard(null)}
                    />
                </motion.div>
            ))}

            {noMoreProjects && publicProjects.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <EndImage src={endIllustration} alt="No more projects" />
                </motion.div>
            )}
        </Container>
    );
};
