import m from "mithril";

export function extractErrors(errorObj) {
    const messages = [];
  
    console.log(errorObj);
    for (const key in errorObj) {
      const value = errorObj[key];
  
      if (Array.isArray(value)) {
        value.forEach((msg) => {
          if (key === "non_field_errors" || key === "detail") {
            messages.push(msg);
          } else {
            messages.push(`${key}: ${msg}`);
          }
        });
      } else if (typeof value === "string") {
        // fallback in case it's a single string
        messages.push(`${key}: ${value}`);
      }
    }
  
    return messages;
  }
  
 export function authRequest(options) {
    function refreshToken() {
        return m.request({
          method: "POST",
          url: `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
          body: {
            refresh: localStorage.refresh,
          },
        }).then((data) => {
          localStorage.token = data.access;
        }).catch(() => {
          // Refresh gagal, mungkin token refresh udah expired
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          m.route.set("/login");
          throw new Error("Session expired, please login again");
        });
    }
      
    options.headers = options.headers || {};
    options.headers.Authorization = "Bearer " + localStorage.token;
  
    return m.request(options).catch((err) => {
      if (err.code === 401 && localStorage.refresh) {
        return refreshToken().then(() => {
          options.headers.Authorization = "Bearer " + localStorage.token;
          return m.request(options);
        });
      } else {
        throw err;
      }
    });
  }
  