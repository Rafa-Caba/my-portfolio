import { usePublicContext } from '../context/public/PublicContext';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import {
    SocialWrapper,
    SocialBox,
    SocialTitle,
    SocialLinks,
    SocialItem,
} from '../styles/public/SocialStyles';

export const SocialPublic = () => {
    const { publicSettings: settings } = usePublicContext();

    const links = settings?.socialLinks;
    const visible = settings?.visibility?.socialLinks;

    if (!links || !visible) return null;

    const socialList = [
        { name: 'GitHub', icon: <FaGithub />, url: links.github },
        { name: 'LinkedIn', icon: <FaLinkedin />, url: links.linkedin },
        { name: 'Facebook', icon: <FaFacebook />, url: links.facebook },
    ];

    const filtered = socialList.filter((s) => !!s.url);

    return (
        <SocialWrapper>
            <SocialBox>
                <SocialTitle>Mi Social Media Accounts</SocialTitle>
                <SocialLinks>
                    {filtered.map((social) => (
                        <SocialItem
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={social.name}
                        >
                            {social.icon}
                        </SocialItem>
                    ))}
                </SocialLinks>
            </SocialBox>
        </SocialWrapper>
    );
};
