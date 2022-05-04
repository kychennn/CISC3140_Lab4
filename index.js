// Create express app
const sqlite3 = require('sqlite3');
const express = require("express");
var app = express();

// req.body
app.use(express.json())

// Server port
const HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});


// Connecting a Database
const db = new sqlite3.Database('lab4.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {
        console.log('Connected to the SQLite database.')
    }
});

// -------GET REST API Request, HTTP Method Type: GET-------
// Display results of all cars present in the CSV file
// http://localhost:8000/api/car
// Display results of all cars information with queries
// http://localhost:8000/api/car?model=TLX&year=2015
app.get("/api/car", (req, res, next) => {
    var params = [req.query.carid, req.query.year, req.query.make, req.query.model, req.query.Judge_ID, req.query.Judge_Name]
    db.all("SELECT * FROM Car WHERE Car_ID = COALESCE(?, Car_ID) AND Year = COALESCE(?, Year) AND Make = COALESCE(?, Make) AND Model = COALESCE(?, Model) AND Judge_ID = COALESCE(?, Judge_ID) AND Judge_Name = COALESCE(?, Judge_Name)", params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ 
            message: "success",
            data: rows  
        });
    });
});

// Display results of all the car owners contact information
// http://localhost:8000/api/owner
// Display results of all car owners contact information with queries
// http://localhost:8000/api/owner?name=Hernando&email=honoland13@japanpost.jp
app.get("/api/owner", (req, res, next) => {
    var params = [req.query.carid, req.query.name, req.query.email]
    db.all("SELECT * FROM Owner WHERE Car_ID = COALESCE(?, Car_ID) AND Name = COALESCE(?, Name) AND Email = COALESCE(?, Email)", params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ 
            message: "success",
            data: rows 
        });
    });
});

// Display single car information record result of selected Car_ID from Car table
// http://localhost:8000/api/car/1
app.get("/api/car/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get("SELECT * FROM Car WHERE Car_ID = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ 
            message: "success",
            data: row
        });
    });
});


// Display single owner information record result of selected Car_ID from Car table
// http://localhost:8000/api/owner/1
app.get("/api/owner/:id", (req, res, next) => {
    db.get("SELECT * FROM Owner WHERE Car_ID = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ 
            message: "success",
            data: row
        });
    });
});


// -------Create REST API Request, HTTP Method Type: POST-------
// Inserting new car data record(s)
// http://localhost:8000/api/car/
app.post("/api/car/", (req, res, next) => {
    var sql = `INSERT INTO Car (Car_ID, Year, Make, Model, Judge_ID, Judge_Name) VALUES (?, ?, ?, ?, ?, ?)`
    var params = []
    let numOfData = 0;
    var reqBody = req.body.bulk

    for(var i in reqBody) {
        var errors = []
        if(!reqBody[i].Car_ID && reqBody[i].Car_ID != 0) { errors.push("ERROR: Car ID"); }
        if(!reqBody[i].Year && reqBody[i].Year != 0) { errors.push("ERROR: Year"); }
        if(!reqBody[i].Make) { errors.push("ERROR: Make"); }
        if(!reqBody[i].Model) { errors.push("ERROR: Model"); }
        if(!reqBody[i].Judge_ID) { errors.push("ERROR: Judge_ID"); }
        if(!reqBody[i].Judge_Name) { errors.push("ERROR: Judge_Name"); }

        // indicate any errors
        if(errors.length) {
            res.status(400).json({"error": errors.join(",")});
            return;
        }
        numOfData++;
        params.push(reqBody[i].Car_ID, reqBody[i].Year, reqBody[i].Make, reqBody[i].Model, reqBody[i].Judge_ID, reqBody[i].Judge_Name)
    }

    for(var i=0; i<numOfData-1; i++) {
        sql += ", (?, ?, ?, ?, ?, ?)"
    }    
    
    db.run(sql, params, function(err, result) {
        if(err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            message: "success",
            data: params,
            id: this.lastID
        })
    });
});


// Inserting new owner data record(s)
// http://localhost:8000/owner/
app.post("/api/owner/", (req, res, next) => {
    var reqBody = req.body.bulk
    var sql = "INSERT INTO Owner (Car_ID, Name, Email) VALUES (?, ?, ?)"
    params = [];
    let numOfData = 0;
    for(var i in reqBody) {
        var errors = []
        if(!reqBody[i].Car_ID && reqBody[i].Car_ID != 0) { errors.push("ERROR: Car ID"); }
        if(!reqBody[i].Name) { errors.push("ERROR: Name"); }
        if(!reqBody[i].Email) { errors.push("ERROR: Email"); }

        if(errors.length) {
            res.status(400).json({"error": errors.join(",")});
            return;
        }
        numOfData++;
        params.push(reqBody[i].Car_ID, reqBody[i].Name, reqBody[i].Email)
    }
    for(var i=0; i<numOfData-1; i++) {
        sql += ", (?, ?, ?)"
    }

    db.run(sql, params, function(err, result) {
        if(err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
             message: "success",
             data: params,
             id: this.lastID
        })
    });
});


// -------Update REST API Request, HTTP Method Type: PATCH-------
// Updating car data record
// http://localhost:8000/car/1111
app.patch("/api/car/:id", (req, res, next) => {
    var reqBody = req.body;
    var params = [req.params.id];
    db.run("UPDATE Car set Year = ?, Make = ?, Model = ?, Judge_ID = ?, Judge_Name = ? WHERE Car_ID = ?",
    [reqBody.Year, reqBody.Make, reqBody.Model, reqBody.Judge_ID, reqBody.Judge_Name, params],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message });
                console.error()
                return;
            }
            res.status(200).json({ 
                message: "success",
                updatedID: this.changes 
            });
    });
});

// Updating owner data record
// http://localhost:8000/owner/9999
app.patch("/api/owner/:id", (req, res, next) => {
    var reqBody = req.body;
    var params = [req.params.id];
    db.run("UPDATE Owner set Name = ?, Email = ? WHERE Car_ID = ?",
        [reqBody.Name, reqBody.Email, params],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message });
                console.error()
                return;
            }
            res.status(200).json({ 
                message: "success",
                updated: this.changes
            });
    });
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});