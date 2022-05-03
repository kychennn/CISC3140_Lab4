const sqlite3 = require('sqlite3');
const express = require("express");
var app = express();

// req.body
app.use(express.json())

const HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

const db = new sqlite3.Database('lab4.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {
        console.log('Connected to the SQLite database.')
    }
});

// GET REST API Request, HTTP Method Type: GET

// Display results of all cars present in the CSV file
// http://localhost:8000/car
app.get("/car", (req, res, next) => {
    db.all("SELECT * FROM Car", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});

// Display results of all the car owners contact information
// http://localhost:8000/owner
app.get("/owner", (req, res, next) => {
    db.all("SELECT * FROM Owner", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});

// Display single car information record result of selected Car_ID from Car table
// http://localhost:8000/car/1
app.get("/car/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get("SELECT * FROM Car where Car_ID = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json(row);
    });
});

// Display single owner information record result of selected Car_ID from Car table
// http://localhost:8000/owner/1
app.get("/owner/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get("SELECT * FROM Owner where Car_ID = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json(row);
    });
});


// Create REST API Request, HTTP Method Type: POST
app.post("/car/", (req, res, next) => {
    var reqBody = req.body;
    db.run("INSERT INTO Car (Car_ID, Year, Make, Model, Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower, Car_Overall, Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness, Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness, Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP, Mods_Overall) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [reqBody.Car_ID, reqBody.Year, reqBody.Make, reqBody.Model, reqBody.Racer_Turbo, reqBody.Racer_Supercharged, reqBody.Racer_Performance, reqBody.Racer_Horsepower, reqBody.Car_Overall, reqBody.Engine_Modifications, reqBody.Engine_Performance, reqBody.Engine_Chrome, reqBody.Engine_Detailing, reqBody.Engine_Cleanliness, reqBody.Body_Frame_Undercarriage, reqBody.Body_Frame_Suspension, reqBody.Body_Frame_Chrome, reqBody.Body_Frame_Detailing, reqBody.Body_Frame_Cleanliness, reqBody.Mods_Paint, reqBody.Mods_Body, reqBody.Mods_Wrap, reqBody.Mods_Rims, reqBody.Mods_Interior, reqBody.Mods_Other, reqBody.Mods_ICE, reqBody.Mods_Aftermarket, reqBody.Mods_WIP, reqBody.Mods_Overall],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "Car_ID": this.lastID
            })
        });
});


app.post("/owner/", (req, res, next) => {
    var reqBody = req.body;
    db.run("INSERT INTO Owner (Car_ID, Name, Email) VALUES (?, ?, ?)",
        [reqBody.Car_ID, reqBody.Name, reqBody.Email],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "Car_ID": this.lastID
            })
        });
});


// update
app.patch("/owner/", (req, res, next) => {
    var reqBody = req.body;
    db.run("UPDATE Owner set Name = ?, Email = ?, WHERE Car_ID = ?",
        [reqBody.Name, reqBody.Email, reqBody.Car_ID],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});