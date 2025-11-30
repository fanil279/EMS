export function requireAuth(
    isAuthenticated: boolean,
    action: () => void,
    onFail: () => void
) {
    if (isAuthenticated) action();
    else onFail();
}
