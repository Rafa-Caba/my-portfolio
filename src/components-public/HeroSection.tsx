import { usePublicContext } from '../context/public/PublicContext';
import { HeroWrapper, NameText, ProfileImage, StyledCat, StyledCoffee, StyledPaw, Subtitle } from '../styles/public/HeroStyles';

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
                <ProfileImage src={publicUser.imageUrl} alt={publicUser.name} />
            )}

            <NameText>{publicUser?.name || 'Unknown Dev'}</NameText>
            <Subtitle>{publicUser?.title || 'Developer'}</Subtitle>
        </HeroWrapper>
    );
};
