# CISC3140_Lab4

Backend API for car data. 

## Description

The objective of this lab is to build a backend API using a combination of SQL and JavaScript to enable users to view data that is stored in a database as well as update data.

## Set up the Node.js base project
* To start with a Node.js and Express.js project, create a new project folder. Then, create an empty NPM project, using the command: 
```npm init```. 
  This utility will walk you through creating a package.json file.

* Creating a index.js file. 
```touch index.js```


* install some base dependencies

    ```npm install express ```

    ```npm install sqlite3```

* Running the web server
  ```node index```
  (```nodemon index```automatically restarts the process)

## Source code files
* [data.csv](https://gist.github.com/katychuang/d66a59b6db4e59c16efd4c42ad411f8e): Sample data file
* [database.sql](./database.sql): Creates the required database with the specified tables using SQLite script
* [index.js](./index.js): Creates routes and API endpoints
* [API_endpoints.md](./API_endpoints.md): A description of API endpoints


## Helpful Documents

* https://www.youtube.com/watch?v=_Mun4eOOf2Q&t=1333s

* https://medium.com/@codesprintpro/rest-api-using-sqlite3-nodejs-and-expressjs-f8c0c0847fe5

* https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
