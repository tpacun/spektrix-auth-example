import axios from 'axios';
import { getAuthorization } from './authorization.js';

export default class SpektrixRequest {
    constructor(config = {domain: 'system.spektrix.com', clientName: 'apitesting', username: '', secretKey: ''}) {
        this.domain = config.domain
        this.clientName = config.clientName
        this.username = config.username
        this.secretKey = config.secretKey
        this.clientUrl = `https://${this.domain}/${this.clientName}/api/v3/`
    }

    async getRequest(endpoint, auth = false) {
        const datetime = new Date().toUTCString()
        let authHeader = auth ? getAuthorization('GET', this.username, datetime, this.secretKey, this.clientUrl + endpoint, null):null
        try {
            const res = await axios.get(`${this.clientUrl}${endpoint}`, {headers: {'Authorization': authHeader, 'Date': datetime, 'Host': this.domain}})
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    async postRequest(endpoint, auth = false, body) {
        const datetime = new Date().toUTCString()
        let authHeader = auth ? getAuthorization('POST', this.username, datetime, this.secretKey, this.clientUrl + endpoint, body):null
        try {
            const res = await axios.post(`${this.clientUrl}${endpoint}`, body, {headers: {'Authorization': authHeader, 'Date': datetime, 'Host': this.domain}})
            return res.data
        } catch (error) {
             console.log(error)
        }
    }
}
