// Cookies (accessToken/refreshToken) are managed server-side via httpOnly cookies.
// Authorization header is no longer needed — cookies are sent automatically.
export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  dispatch?: any,
  logoutAction?: any
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>)
  };

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include'
  };

  // First attempt
  let response = await fetch(url, config);

  // If access token expired, try refreshing via internal route handler
  if (response.status === 401) {
    try {
      const refreshRes = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'
      });

      if (!refreshRes.ok) {
        if (dispatch && logoutAction) dispatch(logoutAction());
        return response;
      }

      // Retry — the refresh route set a new accessToken cookie
      response = await fetch(url, config);
    } catch {
      if (dispatch && logoutAction) dispatch(logoutAction());
    }
  }

  return response;
};
