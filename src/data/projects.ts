
import type { Project } from '../types/projects';

export const projects: Project[] = [
    {
        _id: '1',
        title: 'Ero Cras',
        description: 'A full-stack platform for church community management.',
        technologies: [
            'React', 'TypeScript', 'Node.js', 'Express',
            'MongoDB', 'JWT', 'Zustand', 'Cloudinary', 'Vercel', 'Railway'
        ],
        imageUrl: '/images/erocrasLogo.png',
        repoUrl: 'https://github.com/rafaelcabanillas/ero-cras',
        url: 'https://erocras.vercel.app',
        category: 'Web Dev',
        status: 'Active',
        createdAt: '2025'
    },
    {
        _id: '2',
        title: 'Coffee Recipes',
        description: 'A vintage-themed site for coffee lovers and baristas.',
        technologies: ['React', 'Styled-Components', 'Framer Motion'],
        category: '',
        status: 'Active',
        imageUrl: '',
        url: '',
        repoUrl: '',
        createdAt: '2025'
    },
];
