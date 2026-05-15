const { fetch: originalFetch } = window;

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

window.fetch = async (...args) => {
  let [ressource, config] = args;

  config.headers.authorization = `Bearer ${accessToken}`;

  let response = await originalFetch(ressource, config);

  if (!response.ok && response.status === 401 && !originalFetch.once) {
    originalFetch.once = true;

    try {
      const refresh = await fetch(
        import.meta.env.VITE_API_URL + "/auth/refresh",
        {
          credentials: "include",
        },
      );

      setAccessToken(refresh.accessToken);
    } catch (error) {
      accessToken = null;
      window.location.href = "/login";
      return Promise.reject(error);
    }
  }
  return response;
};
