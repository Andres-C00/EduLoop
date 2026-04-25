export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  MODULES: '/modulos',
  MODULE_DETAIL: '/modulos/:id',
  LESSON: '/modulos/:moduleId/leccion/:lessonId',
  QUIZ: '/modulos/:moduleId/cuestionario',
  EXAM: '/modulos/:moduleId/examen',
  ACTIVITIES: '/actividades',
  PROFILE: '/perfil',
  CERTIFICATE: '/certificado',
  LEADERBOARD: '/clasificacion',
}

export const LEVELS = {
  BASIC: 'basico',
  ADVANCED: 'avanzado',
}

export const LEVEL_LABELS = {
  basico: 'Nivel Básico',
  avanzado: 'Nivel Avanzado',
}

export const CVDS_MODULES = [
  { id: 1, title: 'Ingeniería de Requerimientos', icon: '📋', color: 'from-blue-600 to-blue-800', description: 'Elicitación, análisis y especificación de requisitos del software.' },
  { id: 2, title: 'Diseño del Sistema',           icon: '🏗️', color: 'from-purple-600 to-purple-800', description: 'Arquitectura, patrones de diseño y modelado UML.' },
  { id: 3, title: 'Implementación',                icon: '💻', color: 'from-brand-700 to-brand-500', description: 'Codificación, estándares de código y control de versiones.' },
  { id: 4, title: 'Pruebas de Software',           icon: '🧪', color: 'from-green-600 to-green-800', description: 'Testing unitario, integración, sistema y aceptación.' },
  { id: 5, title: 'Despliegue y CI/CD',            icon: '🚀', color: 'from-orange-600 to-orange-800', description: 'Pipelines, contenedores y entrega continua.' },
  { id: 6, title: 'Mantenimiento',                 icon: '🔧', color: 'from-rose-600 to-rose-800', description: 'Evolución del software, deuda técnica y refactoring.' },
]

export const MAX_LIVES = 5
export const PASS_SCORE = 70
export const POINTS_PER_CORRECT = 10
export const STREAK_BONUS = 5

export const TOKEN_KEY = 'eduloop_token'
export const USER_KEY = 'eduloop_user'
