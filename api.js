import SpektrixRequest from './interface.js'
import { getAuthorization } from './authorization.js'
import * as dotenv from 'dotenv'
dotenv.config()


class Spektrix {

    constructor({domain, clientName, username, secretKey}) {
        this.spektrixRequest = new SpektrixRequest({
            domain: domain, 
            clientName: clientName,
            username: username,
            secretKey: secretKey
        })
    }

    async events() {
        let events = await this.spektrixRequest.getRequest('customers?email=theo.pacun@spektrix.com', true)
        return events
    }


}

let apiTesting = new Spektrix({domain: 'system.spektrix.com', clientName: 'apitesting', username: process.env.USERNAME, secretKey: process.env.SECRETKEY})
let apiRes = await apiTesting.events()
console.log(apiRes[0])



