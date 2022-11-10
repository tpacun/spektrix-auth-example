import axios from 'axios';

async function getRequest(endpoint, config = {domain: 'system.spektrix.com', clientName: 'apitesting', username: '', secretKey: ''}) {
    try {
        const res = await axios.get(`https://${config.domain}/${config.clientName}/api/v3/${endpoint}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export { getRequest }