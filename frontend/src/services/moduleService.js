import api from './api'

export const moduleService = {
  getAll: (level) => api.get('/modules', { params: { level } }),
  getById: (id) => api.get(`/modules/${id}`),
  getLessons: (moduleId) => api.get(`/modules/${moduleId}/lessons`),
  getLesson: (moduleId, lessonId) => api.get(`/modules/${moduleId}/lessons/${lessonId}`),
  search: (query, level) => api.get('/modules/search', { params: { q: query, level } }),
  completeLesson: (moduleId, lessonId) => api.post(`/modules/${moduleId}/lessons/${lessonId}/complete`),
}
