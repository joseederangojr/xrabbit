import Axios from 'axios'
import { env } from '~/env.mjs'

export const axios = Axios.create({
    baseURL: env.COINMARKETCAP_ENDPOINT,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

axios.interceptors.request.use((config)=> {
    config.headers['X-CMC_PRO_API_KEY'] = env.COINMARKETCAP_TOKEN
    return config
}, err => Promise.reject(err))