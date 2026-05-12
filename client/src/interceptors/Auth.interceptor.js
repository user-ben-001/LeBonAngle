const { fetch: originalFetch } = window;

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

// window.fetch = async (...args) => {
//   let [ressource, config] = args;

//   let response = await originalFetch(ressource, config);

//   return response;
// };

window.fetch = async (...args) => {
  let [ressource, config] = args;

  config.headers.authorization = `Bearer ${accessToken}`;

  let response = await originalFetch(ressource, config);

  if (!response.ok && response.status === 401 && !originalFetch.once) {
    originalFetch.once = true;
    try {
      const refresh = await fetch("http://localhost:3000/auth/refresh", {
        credentials: "include",
      });
      accessToken = refresh.accessToken;
    } catch (error) {
      accessToken = null;
      window.location.href = "/login";
      return Promise.reject(error);
    }
  }
  return response;
};
