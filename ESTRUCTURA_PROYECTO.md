# EduLoop — Estructura del Proyecto

## Stack tecnológico

| Capa       | Tecnología |
|------------|------------|
| Frontend   | React 18 · Vite · JavaScript · Tailwind CSS · React Router v6 · Recharts · Axios |
| Backend    | Java 17 · Spring Boot 3 · Spring Security · JWT · PostgreSQL · JPA/Hibernate · Swagger |
| DevOps     | Vercel (frontend) · Railway (backend) · Supabase (BD) · CI/CD · EAS Build |
| Testing    | Jest · Vitest (FE) · JUnit 5 · Mockito (BE) |

---

## Frontend — `EduLoop/frontend/`

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── images/              # Logo, ilustraciones, robot mascot
│   ├── components/
│   │   ├── activities/
│   │   │   ├── DragDrop.jsx     # HU-09: Actividad drag & drop ordenar fases
│   │   │   ├── Matching.jsx     # HU-09: Actividad emparejar términos
│   │   │   └── FillInBlank.jsx  # HU-09: Actividad completar espacios
│   │   ├── certificate/
│   │   │   └── CertificateCard.jsx  # HU-14: Vista del certificado imprimible
│   │   ├── common/
│   │   │   ├── Badge.jsx        # Etiquetas de estado y nivel
│   │   │   ├── Button.jsx       # Botón reutilizable con variantes
│   │   │   ├── Input.jsx        # Campo de texto con validación
│   │   │   ├── Modal.jsx        # Diálogo modal
│   │   │   ├── ProgressBar.jsx  # Barra de progreso animada
│   │   │   └── Spinner.jsx      # Indicador de carga
│   │   ├── dashboard/
│   │   │   ├── Leaderboard.jsx  # HU-15: Lista del ranking global
│   │   │   ├── ProgressChart.jsx# HU-07: Gráfica semanal de puntos (Recharts)
│   │   │   └── StatsCard.jsx    # HU-07: Tarjeta de métrica
│   │   ├── gamification/
│   │   │   ├── LivesCounter.jsx # HU-11: Visualización de vidas
│   │   │   ├── PointsDisplay.jsx# HU-11: Total de XP
│   │   │   └── StreakBadge.jsx  # HU-11: Racha diaria
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx    # Layout principal con Sidebar + Header
│   │   │   ├── Header.jsx       # Barra de navegación superior
│   │   │   ├── Notifications.jsx# Sistema de toasts
│   │   │   └── Sidebar.jsx      # Menú lateral persistente
│   │   └── modules/
│   │       └── ModuleCard.jsx   # Tarjeta de módulo con progreso
│   ├── context/
│   │   ├── AppContext.jsx       # Estado global: notificaciones, sidebar
│   │   └── AuthContext.jsx      # Estado de autenticación y usuario
│   ├── hooks/                   # (a implementar por sprint)
│   │   ├── useAuth.js
│   │   ├── useModules.js
│   │   ├── useProgress.js
│   │   └── useQuiz.js
│   ├── pages/
│   │   ├── ActivitiesPage.jsx   # HU-09: Hub de actividades interactivas
│   │   ├── CertificatePage.jsx  # HU-14: Descarga de certificado PDF
│   │   ├── DashboardPage.jsx    # HU-04/07: Panel principal post-login
│   │   ├── ExamPage.jsx         # HU-06: Examen final con temporizador
│   │   ├── LandingPage.jsx      # Página de bienvenida pública
│   │   ├── LeaderboardPage.jsx  # HU-15: Tabla de clasificación global
│   │   ├── LessonPage.jsx       # HU-03: Visualizador de lección
│   │   ├── LoginPage.jsx        # HU-02: Formulario de login
│   │   ├── ModuleDetailPage.jsx # HU-03/04: Detalle y lecciones del módulo
│   │   ├── ModulesPage.jsx      # HU-03/13: Lista y búsqueda de módulos
│   │   ├── NotFoundPage.jsx     # Página 404
│   │   ├── ProfilePage.jsx      # HU-12: Edición de perfil y cuenta
│   │   ├── QuizPage.jsx         # HU-05: Cuestionario con retroalimentación
│   │   └── RegisterPage.jsx     # HU-01: Formulario de registro
│   ├── router/
│   │   ├── AppRouter.jsx        # Definición de todas las rutas
│   │   └── PrivateRoute.jsx     # Guard de autenticación
│   ├── services/
│   │   ├── api.js               # Instancia Axios con interceptores JWT
│   │   ├── authService.js       # HU-01/02: login, register, logout
│   │   ├── moduleService.js     # HU-03/04/13: módulos y lecciones
│   │   ├── quizService.js       # HU-05/06/09: quizzes y actividades
│   │   └── userService.js       # HU-07/12/14/15: perfil, stats, ranking
│   ├── utils/
│   │   ├── constants.js         # Rutas, módulos CVDS, constantes de juego
│   │   └── helpers.js           # formatDate, calcProgress, shuffleArray…
│   ├── App.jsx
│   ├── index.css                # Tailwind + clases reutilizables
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js           # Tema: colores brand (teal), navy, fuentes
└── vite.config.js               # Proxy /api → localhost:8080
```

---

## Backend — `EduLoop/backend/` (referencia para el equipo BE)

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/eduloop/
│   │   │   ├── EduLoopApplication.java
│   │   │   ├── config/
│   │   │   │   ├── SecurityConfig.java       # Spring Security + JWT
│   │   │   │   ├── CorsConfig.java           # CORS para el frontend
│   │   │   │   └── SwaggerConfig.java        # OpenAPI / HU-08
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java       # POST /auth/login|register|logout
│   │   │   │   ├── UserController.java       # GET/PUT/DELETE /users/me
│   │   │   │   ├── ModuleController.java     # GET /modules, /modules/{id}
│   │   │   │   ├── LessonController.java     # GET/POST /modules/{id}/lessons
│   │   │   │   ├── QuizController.java       # GET/POST /modules/{id}/quiz|exam
│   │   │   │   ├── ProgressController.java   # GET /users/me/progress
│   │   │   │   ├── CertificateController.java# GET /users/me/certificates
│   │   │   │   └── LeaderboardController.java# GET /leaderboard
│   │   │   ├── service/
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── UserService.java
│   │   │   │   ├── ModuleService.java
│   │   │   │   ├── QuizService.java
│   │   │   │   ├── ProgressService.java
│   │   │   │   ├── GamificationService.java  # Puntos, vidas, rachas — HU-11
│   │   │   │   └── CertificateService.java   # Generación PDF — HU-14
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── ModuleRepository.java
│   │   │   │   ├── LessonRepository.java
│   │   │   │   ├── QuizRepository.java
│   │   │   │   ├── AnswerRepository.java
│   │   │   │   ├── ProgressRepository.java
│   │   │   │   └── CertificateRepository.java
│   │   │   ├── model/
│   │   │   │   ├── User.java                 # HU-01/12
│   │   │   │   ├── Module.java               # HU-03/04
│   │   │   │   ├── Lesson.java               # HU-03
│   │   │   │   ├── Quiz.java                 # HU-05
│   │   │   │   ├── Question.java             # HU-05/06
│   │   │   │   ├── UserAnswer.java
│   │   │   │   ├── Progress.java             # HU-04/07
│   │   │   │   ├── Certificate.java          # HU-14
│   │   │   │   └── Gamification.java         # HU-11: puntos, vidas, racha
│   │   │   ├── dto/
│   │   │   │   ├── request/
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   ├── UpdateProfileRequest.java
│   │   │   │   │   └── QuizSubmitRequest.java
│   │   │   │   └── response/
│   │   │   │       ├── AuthResponse.java     # { token, user }
│   │   │   │       ├── ModuleResponse.java
│   │   │   │       ├── ProgressResponse.java
│   │   │   │       └── QuizResultResponse.java
│   │   │   ├── security/
│   │   │   │   ├── JwtTokenProvider.java     # Generación y validación JWT
│   │   │   │   ├── JwtAuthFilter.java        # Filtro por request
│   │   │   │   └── UserDetailsServiceImpl.java
│   │   │   └── exception/
│   │   │       ├── GlobalExceptionHandler.java
│   │   │       ├── ResourceNotFoundException.java
│   │   │       └── UnauthorizedException.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml           # BD local
│   │       ├── application-prod.yml          # Supabase / Railway
│   │       └── data.sql                      # Seed inicial (módulos CVDS)
│   └── test/
│       └── java/com/eduloop/
│           ├── controller/
│           └── service/
├── pom.xml
└── Dockerfile
```

---

## Rutas del Frontend

| Ruta | Componente | Historia |
|------|-----------|---------|
| `/` | LandingPage | — |
| `/login` | LoginPage | HU-02 |
| `/register` | RegisterPage | HU-01 |
| `/dashboard` | DashboardPage | HU-04/07 |
| `/modulos` | ModulesPage | HU-03/13 |
| `/modulos/:id` | ModuleDetailPage | HU-03/04 |
| `/modulos/:moduleId/leccion/:lessonId` | LessonPage | HU-03 |
| `/modulos/:moduleId/cuestionario` | QuizPage | HU-05 |
| `/modulos/:moduleId/examen` | ExamPage | HU-06 |
| `/actividades` | ActivitiesPage | HU-09 |
| `/perfil` | ProfilePage | HU-12 |
| `/certificado` | CertificatePage | HU-14 |
| `/clasificacion` | LeaderboardPage | HU-15 |

---

## Comandos de inicio rápido (Frontend)

```bash
cd frontend
npm install
cp .env.example .env        # Configura VITE_API_URL
npm run dev                 # Servidor en http://localhost:5173
npm run build               # Build de producción
```
