const select = state => state.auth

export default select
export const isAuthenticated = state => select(state).authenticated
