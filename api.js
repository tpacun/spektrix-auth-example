import SpektrixRequest from './interface.js'
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

    async customers() {
        let customer = await this.spektrixRequest.getRequest('customers?email=theo.pacun@spektrix.com', true)
        return customer
    }
}

let apiTesting = new Spektrix({domain: 'system.spektrix.com', clientName: 'apitesting', username: process.env.API_USERNAME, secretKey: process.env.SECRETKEY})
let apiRes = await apiTesting.customers()
console.log(apiRes)



