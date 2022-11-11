import axios from 'axios';


async function getEvents() {
    try {
        const res = await axios.get('https://system.spektrix.com/apitesting/api/v3/events')
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

getEvents()
