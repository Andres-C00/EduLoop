import api from './api'

export const userService = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
  changePassword: (data) => api.put('/users/me/password', data),
  deleteAccount: () => api.delete('/users/me'),
  getProgress: () => api.get('/users/me/progress'),
  getStats: () => api.get('/users/me/stats'),
  getCertificates: () => api.get('/users/me/certificates'),
  getLeaderboard: () => api.get('/leaderboard'),
}
