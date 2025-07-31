import ReactMarkdown from 'react-markdown';
import { usePublicContext } from '../context/public/PublicContext';
import { AboutCard, AboutContainer, AboutImage, AboutText, QuickFactsList } from '../styles/public/AboutStyles';

export const AboutPublic = () => {
    const { publicUser: user } = usePublicContext();

    const quickFacts = user?.quickFacts ?? []

    return (
        <AboutContainer
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >
            <AboutCard>
                <AboutImage src={user?.imageUrl} alt={user?.name} />
                <AboutText>
                    {user?.bio && (
                        <>
                            <h2 className='mb-4'>👋 About Me</h2>
                            <ReactMarkdown>{user.bio}</ReactMarkdown>
                        </>
                    )}

                    {quickFacts.length > 0 && (
                        <>
                            <h4 className="mt-4">✨ Quick Facts:</h4>
                            <QuickFactsList>
                                {user?.quickFacts?.map((fact, i) => (
                                    <li key={i}>{fact}</li>
                                ))}
                            </QuickFactsList>
                        </>
                    )}
                </AboutText>
            </AboutCard>
        </AboutContainer>
    );
};
