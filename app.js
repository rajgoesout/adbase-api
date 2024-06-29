// import { collections, connectToDatabase } from "./services/database.service"

const express = require('express');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT;

app.use(cors())


// Middleware to parse JSON bodies
app.use(express.json());

app.post('/pixel', (req, res) => {
    console.log("pixelreq", req.body)
    return res.status(201).json({nada: "wao"})
})

// POST /create to create a frame with a specific UUID
app.post('/create', (req, res) => {
    const uuid = req.body.uuid; // Assuming UUID is sent in the request body
    if (!uuid) {
        return res.status(400).send('UUID is required');
    }

    console.log(`Creating a frame with UUID: ${uuid}`);
    // Here you would typically add the logic to create a frame in your database or storage

    res.status(201).send(`Frame created with UUID: ${uuid}`);
});

app.get("/frame/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    console.log(`Click action received for frame with UUID: ${uuid}`);
    // const frame = await collections.frames.findOne({
    //     id: uuid
    // })
    // console.log("frame", frame);
    const resp = {
        advertiser: "",
        id: uuid,
        img: "https://sample-videos.com/img/Sample-png-image-5mb.png",
        url: "",
        title: "hello",
        description: "this si reall",
    }
    res.status(200).json(resp);
})


// POST /frame/:uuid/actions/click
app.post('/frame/:uuid/actions/click', (req, res) => {
    console.log("reqwas", req)
    const uuid = req.params.uuid;
    console.log(`Click action received for frame with UUID: ${uuid}`);
    const resp = {
        "type": "message",
        "message": "Reminder saved!",
        "link": "https://remindbot.example.com/reminders/1"
    }
    res.status(200).json(resp);
});

// POST /frame/:uuid/actions/buy
app.post('/frame/:uuid/actions/buy', (req, res) => {
    const uuid = req.params.uuid;
    console.log(`Buy action received for frame with UUID: ${uuid}`);
    res.status(200).send(`Buy action processed for frame ${uuid}`);
});

// GET /frame/:uuid/actions/click
app.get('/frame/:uuid/actions/click', (req, res) => {
    const uuid = req.params.uuid;
    console.log(`Click action requested for frame with UUID: ${uuid}`);
    res.status(200).send(`Details of click action for frame ${uuid}`);
});

// GET /frame/:uuid/actions/buy
app.get('/frame/:uuid/actions/buy', (req, res) => {
    const uuid = req.params.uuid;
    console.log(`Buy action requested for frame with UUID: ${uuid}`);
    res.status(200).send(`Details of buy action for frame ${uuid}`);
});

// connectToDatabase.then(() => {
//     // Start the server
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }).catch(error => {
//     console.log("Database connection failed", error);
//     // process.exit(1);
// })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
