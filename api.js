import { getRequest } from './interface.js'
import { getAuthorization } from './authorization.js'


class Spektrix {

    constructor(domain, clientName, username, secretKey) {
        this.connectionConfig = {
            domain: domain, 
            clientName: clientName,
            username: username,
            secretKey: secretKey}
    }

    async events() {
        let events = await getRequest('events')
        return events
    }


}

let apiTesting = new Spektrix
let apiRes = await apiTesting.events()
console.log(apiRes[0])

