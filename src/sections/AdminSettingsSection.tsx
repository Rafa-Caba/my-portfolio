import { SiteSettingsCard } from '../components-admin/SiteSettingsCard';
import { UserSettingsCard } from '../components-admin/UserSettingsCard';
import { SettingsWrapper, SettingsTitle } from '../styles/SettingsStyles';

export const AdminSettingsSection = () => {
    return (
        <SettingsWrapper>
            <SettingsTitle>Admin Settings</SettingsTitle>

            {/* User's settings */}
            <UserSettingsCard />

            {/* Site-wide settings */}
            <SiteSettingsCard />

        </SettingsWrapper>
    );
};
