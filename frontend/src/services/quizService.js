import api from './api'

export const quizService = {
  getQuiz: (moduleId) => api.get(`/modules/${moduleId}/quiz`),
  submitQuiz: (moduleId, answers) => api.post(`/modules/${moduleId}/quiz/submit`, { answers }),
  getExam: (moduleId) => api.get(`/modules/${moduleId}/exam`),
  submitExam: (moduleId, answers) => api.post(`/modules/${moduleId}/exam/submit`, { answers }),
  getActivities: (moduleId) => api.get(`/modules/${moduleId}/activities`),
  submitActivity: (moduleId, activityId, result) =>
    api.post(`/modules/${moduleId}/activities/${activityId}/submit`, result),
}
