import axios from 'axios'

const HTTP = axios.create({
    withCredentials: true
})

export default HTTP;