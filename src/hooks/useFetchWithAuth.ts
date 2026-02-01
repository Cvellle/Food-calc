import {endpoint} from '../../config/endpoint';

const BASE_URL = endpoint || 'http://localhost:3000';

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  dispatch?: any,
  logoutAction?: any,
  accessToken?: string
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>)
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include'
  };

  // First attempt
  let response = await fetch(`${BASE_URL}${url}`, config);

  // If access token expired / missing
  if (response.status === 401) {
    try {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
      });

      if (!refreshRes.ok) {
        if (dispatch && logoutAction) dispatch(logoutAction());
        return response;
      }

      const {accessToken: newAccessToken} = await refreshRes.json();

      const retryConfig: RequestInit = {
        ...config,
        headers: {
          ...headers,
          Authorization: `Bearer ${newAccessToken}`
        }
      };

      // Retry ORIGINAL request with new token
      response = await fetch(`${BASE_URL}${url}`, retryConfig);

      // optionally expose new token to caller
      (response as any).newAccessToken = newAccessToken;
    } catch {
      if (dispatch && logoutAction) dispatch(logoutAction());
    }
  }

  return response;
};
