// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await window.fetch(endpoint, config)
    data = await response.json()
    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      }
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

// async http get
client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

// async http post
client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body })
}

// async http put
client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'PUT', body })
}

// async http delete 
client.delete = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'DELETE' })
}
