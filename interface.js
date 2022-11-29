import SpektrixRequest from './requester.js'
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

    async customers(emailAddress) {
        let customer = await this.spektrixRequest.getRequest(`customers?email=${emailAddress}`, true)
        return customer
    }

    async getTags() {
        let tags = await this.spektrixRequest.getRequest('tags', true)
        return tags
    }

    async getCustomersTags(customerId) {
        let tags = await this.spektrixRequest.getRequest(`customers/${customerId}/tags`, true)
        return tags
    }

    async assignTags(customerId, body) {
        let res = await this.spektrixRequest.postRequest(`customers/${customerId}/tags`, true, body)
        return res
    }
}

let apiTesting = new Spektrix({domain: 'system.spektrix.com', clientName: 'apitesting', username: process.env.API_USERNAME, secretKey: process.env.SECRETKEY})

let customerAddress = await apiTesting.customers('theo.pacun@spektrix.com')


// Returns:
// {
//     ...
//     email: 'theo.pacun@spektrix.com',
//     ...
//     id: 'I-K222-7WRS',
//   }

if (customerAddress.id) {
    let assignment = await apiTesting.assignTags(customerAddress.id, [{ 'id': '11001ATRSBGDJMQQMCVKRJSQJPSBBHRPT'}])
}

let res = await apiTesting.getCustomersTags('I-K222-7WRS')
console.log(res)

// Returns:
// [
//   { id: '9201AHVHRSJHSLBLCDVNMMJTBCSRGGTMK', name: 'B test' },      
//   { id: '9401ARBBPNBJQCDPKKQGHNMPKPQNNHPMG', name: 'A test' },      
//   { id: '11001ATRSBGDJMQQMCVKRJSQJPSBBHRPT', name: 'Silver Member' }
// ]