import { getRequest } from './interface.js'

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
        this.events = events
    }


}

let apiTesting = new Spektrix
await apiTesting.events()
console.log(apiTesting.events[0])

