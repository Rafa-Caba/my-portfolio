import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { useThemeContext } from './context/ThemeContext';

// Layouts
import { MainLayout } from './layout/MainLayout';
import { AdminLayout } from './layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/pages-public/Home';
import { ProjectsPage } from './pages/pages-public/Projects';
import { SocialPage } from './pages/pages-public/Social';
import { AboutPage } from './pages/pages-public/About';
import { ContactPage } from './pages/pages-public/Contact';

// Admin Pages
import { DashboardPage } from './pages/pages-admin/DashboardPage';
import { PrivateRoute } from './components-admin/PrivateRoute';
import { LoginPage } from './pages/pages-admin/Login';
import { RegisterPage } from './pages/pages-admin/Register';
import { AdminProjectsPage } from './pages/pages-admin/AdminProjectsPage';
import { AdminCreateProjectPage } from './pages/pages-admin/CreateProjectPage';
import { AdminEditProjectPage } from './pages/pages-admin/AdminEditProjectPage';
import { AdminRedirect } from './pages/pages-admin/AdminRedirect';
import { AdminSettingsPage } from './pages/pages-admin/AdminSettingsPage';
import { useAuth } from './hooks/useAuth';
import { useSettingsStore } from './store/admin/useSettingsStore';
import { AdminVisitsPage } from './pages/pages-admin/AdminVisitsPage';

function App() {
    const { toggleTheme, currentMode } = useThemeContext();
    const { user } = useAuth();
    const { settings } = useSettingsStore();

    useEffect(() => {
        if (!settings?.logoUrl) return;

        const existing = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (existing) {
            existing.href = settings.logoUrl;
        } else {
            const link = document.createElement('link');
            link.rel = 'icon';
            link.href = settings.logoUrl;
            document.head.appendChild(link);
        }
    }, [settings?.logoUrl]);

    return (
        <>
            <GlobalStyle />
            <Routes>
                {/* Public Site */}
                <Route
                    path="/"
                    element={
                        <MainLayout toggleTheme={toggleTheme} isDark={user?.personalTheme === 'dark'} />
                    }
                >
                    <Route index element={<HomePage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="social" element={<SocialPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                </Route>

                <Route path="/admin" element={<AdminRedirect />} />

                {/* Admin Panel */}
                <Route
                    path="/admin/*"
                    element={
                        <PrivateRoute>
                            <AdminLayout toggleTheme={toggleTheme} isDark={currentMode === 'dark'} />
                        </PrivateRoute>
                    }
                >
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="projects" element={<AdminProjectsPage />} />
                    <Route path="projects/new" element={<AdminCreateProjectPage />} />
                    <Route path="projects/edit/:id" element={<AdminEditProjectPage />} />
                    <Route path="settings" element={<AdminSettingsPage />} />
                    <Route path="visits" element={<AdminVisitsPage />} />
                </Route>

                {/* Auth Pages */}
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/admin/register" element={<RegisterPage />} />
            </Routes>
        </>
    );
}

export default App;
