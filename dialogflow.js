const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("Server is running!");
});
app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function hi(agent) {
        console.log(`intent  =>  hi`);
        agent.add("Hello there, I am hammad from serever side!")
    }

    function fallback(agent) {
        const { number , date , email} = agent.parameters;
       agent.add("Fallback Intent called!")
    }

       function booking(agent) {
       const { arrival , destination , date, email, phone} = agent.parameters;
       agent.add(`Hi there, Your booking from ${arrival} to ${destination} at ${date} date has been booked! we sent an email at ${email} and also in your phone number ${phone} from server.!`)
       console.log(arrival)
       console.log(destination)
       console.log(date)
       console.log(phone)
       console.log(email)
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', hi); 
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('flight-booking', booking);
    agent.handleRequest(intentMap);
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
