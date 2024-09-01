export const fetchGet = async (url = "", headers = {}) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  return response.json();
};
