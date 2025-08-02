import { usePublicContext } from '../context/public/PublicContext';
import { HeroWrapper, StyledCat, StyledCoffee, StyledPaw, Subtitle } from '../styles/public/HeroStyles';
import { StyledHeroName } from './StyledHeroName';
import { GlowingProfileWrapper, ProfileImage } from './StyledProfileImage';

export const HeroSection = () => {
    const { publicUser } = usePublicContext();

    return (
        <HeroWrapper
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <StyledCat className="cat" />
            <StyledCoffee className="coffee" />
            <StyledPaw className="paw" />

            {publicUser?.imageUrl && (
                <GlowingProfileWrapper>
                    <ProfileImage src={publicUser.imageUrl} alt={publicUser.name} />
                </GlowingProfileWrapper>
                // <ProfileImage src={publicUser.imageUrl} alt={publicUser.name} />
            )}

            <StyledHeroName>{publicUser?.name || 'So-and-So Dev'}</StyledHeroName>
            <Subtitle>{publicUser?.title || 'Developer'}</Subtitle>
        </HeroWrapper>
    );
};
