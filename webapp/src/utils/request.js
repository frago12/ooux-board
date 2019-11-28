// @flow
type Dispatch = (options: { type: string }) => void;

let dispatch: ?Dispatch = null;

export function setDispatch(_dispatch: Dispatch) {
  dispatch = _dispatch;
}

type Config = {
  method?: string,
  // $FlowFixMe
  body?: { [any]: any },
};

function FetchRequest(url: string, config: Config = {}) {
  const csrftoken = getCookie("csrftoken");

  if (config.method === undefined) config.method = "get";

  config.method = config.method.toUpperCase();

  if ((config.method === "POST" || config.method === "PUT") && config.body) {
    config.body = JSON.stringify(config.body);
  }

  return fetch(url, {
    credentials: "include",
    mode: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    ...config,
  })
    .then(status)
    .then(json)
    .then(data => data)
    .catch(error => {
      if (error.status === 401 || error.status === 403) {
        // $FlowFixMe
        dispatch({ type: "logout" });
      } else if (error.status === 500) {
        // $FlowFixMe
        dispatch({ type: "showErrorPage" });
      }
      throw error;
    });
}

export default FetchRequest;

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject({
      status: response.status,
      message: response.statusText,
    });
  }
}

function json(response) {
  return response.json();
}

function getCookie(name) {
  var cookieValue = "";
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
