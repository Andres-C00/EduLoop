import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import AppLayout from '../components/layout/AppLayout'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import ModulesPage from '../pages/ModulesPage'
import ModuleDetailPage from '../pages/ModuleDetailPage'
import LessonPage from '../pages/LessonPage'
import QuizPage from '../pages/QuizPage'
import ExamPage from '../pages/ExamPage'
import ActivitiesPage from '../pages/ActivitiesPage'
import ProfilePage from '../pages/ProfilePage'
import CertificatePage from '../pages/CertificatePage'
import LeaderboardPage from '../pages/LeaderboardPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/modulos" element={<ModulesPage />} />
          <Route path="/modulos/:id" element={<ModuleDetailPage />} />
          <Route path="/modulos/:moduleId/leccion/:lessonId" element={<LessonPage />} />
          <Route path="/modulos/:moduleId/cuestionario" element={<QuizPage />} />
          <Route path="/modulos/:moduleId/examen" element={<ExamPage />} />
          <Route path="/actividades" element={<ActivitiesPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/certificado" element={<CertificatePage />} />
          <Route path="/clasificacion" element={<LeaderboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
