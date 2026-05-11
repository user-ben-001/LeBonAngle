const { fetch: originalFetch } = window;

export const setAccessToken = (token) => {
  let accessToken = token;

  window.fetch = async (...args) => {
    let [ressource, config] = args;

    config = {
      credentials: "include",
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    let response = await originalFetch(ressource, config);

    return response;
  };
};

window.fetch = async (...args) => {
  let [ressource, config] = args;
  let response = await originalFetch(ressource, config)

  const json = ()=>{
    response.clone().json().then((data)=>({...data, }))
  }
};
