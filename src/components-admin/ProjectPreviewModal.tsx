import { Modal } from 'react-bootstrap';
import type { Project } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
    project: Project | null;
    onClose: () => void;
}

export const ProjectPreviewModal = ({ project, onClose }: Props) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {project && (
                <Modal show={true} onHide={onClose} size="lg" centered backdrop="static">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{project.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <motion.img
                                src={project.imageUrl}
                                alt={project.title}
                                style={{ width: '100%', borderRadius: 8 }}
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.3 }}
                            />
                            <p className="mt-3">{project.description}</p>
                        </Modal.Body>
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    );
};
