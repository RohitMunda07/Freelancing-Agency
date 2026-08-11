import axios from "axios"

// ====================================================
//          Axios Instance
// ====================================================
const baseUrl = import.meta.env.VITE_BACKEND_URL;
const api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },

})

const refreshApi = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})

const refreshAccessToken = async () => {
    const response = await refreshApi.post("/users/refresh-token")
    return response.data.accessToken
}

const isRefreshing = false;
const failedQueue = [];

const processQueue = (error, token) => {
    failedQueue.forEach(prom => {
        error ? prom.reject(error) : prom.resolve(token)
    })

    failedQueue = []
}

// ====================================================
//          Request Interceptor
// ====================================================
api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken")

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config

}, (error) => {
    return Promise.reject(error)
})


// ====================================================
//          Response Interceptor
// ====================================================

api.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config

    // Access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        // Refresh-token logic
        if (isRefreshing) {
            // wait for refresh to complete
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`
                        resolve(api(originalRequest)) // this is parameter resolve
                    },
                    reject: (error) => reject(error) // this is parameter reject
                })
            })
        }

        isRefreshing = true;

        try {
            const newAccessToken = await refreshAccessToken()
            localStorage.setItem("accessToken", newAccessToken)

            api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

            processQueue(null, newAccessToken)
            return api(originalRequest)
        } catch (error) {
            processQueue(error, null)
            localStorage.clear()
            window.location.href = "/"
            return Promise.reject(error)
        } finally {
            isRefreshing = false
        }
    }

    if (error.response?.status === 500) {
        console.log("Server Error")
    }

    return Promise.reject(error)
})

// ====================================================
//          Axios Methods
// ====================================================

// GET METHOD
export const get = async (url, config) => {
    const response = await api.get(url, config)
    return response
}

// POST METHOD
export const post = async (url, data, config) => {
    const response = await api.post(url, data, config)
    return response
}
// PATCH METHOD
export const patch = async (url, data, config) => {
    const response = await api.patch(url, data, config)
    return response
}

// DELETE METHOD
export const del = async (url, config) => {
    const response = await api.delete(url, config)
    return response
}