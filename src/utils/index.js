import {AUTH_TOKEN} from '../vue-apollo'

export const isAuthenticated = () => localStorage.getItem(AUTH_TOKEN) || null;