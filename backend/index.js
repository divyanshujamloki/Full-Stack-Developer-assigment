const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const con = require("./config");

const app = express();
app.use(cors()); 
app.use(bodyParser.json());


const tables = ["table2", "table3"];

tables.forEach((table) => {

  app.get(`/${table}`, (req, resp) => {
    con.query(`SELECT * FROM ${table}`, (err, result) => {
      if (err) {
        resp.status(500).send("Error fetching data");
      } else {
        resp.status(200).json(result);
      }
    });
  });

  
  app.post(`/${table}`, (req, resp) => {
    const {
      id,
      name,
      age,
      education,
      job_profile,
      years_of_experience,
      location_worked,
      companies_worked,
      technologies_worked,
    } = req.body;

    let query = "";
    let values = [];

    if (table === "table3") {
      if (!name || !age || !education || !job_profile) {
        return resp.status(400).send("Missing required fields");
      }

      query = `INSERT INTO ${table} (name, age, education, job_profile) VALUES (?, ?, ?, ?)`;
      values = [name, age, education, job_profile];
    } else if (table === "table2") {
      if (
        !years_of_experience ||
        !location_worked ||
        !companies_worked ||
        !technologies_worked
      ) {
        return resp.status(400).send("Missing required fields");
      }

      query = `INSERT INTO ${table} (years_of_experience, location_worked, companies_worked, technologies_worked) VALUES (?, ?, ?, ?)`;
      values = [
        years_of_experience,
        location_worked,
        companies_worked,
        technologies_worked,
      ];
    }

    con.query(query, values, (err, result) => {
      if (err) {
        resp.status(500).send("Error inserting data");
      } else {
        resp.status(201).send("Data inserted successfully");
      }
    });
  });

 
  app.put(`/${table}/:id`, (req, resp) => {
    const id = req.params.id;
    const {
      name,
      age,
      education,
      job_profile,
      years_of_experience,
      location_worked,
      companies_worked,
      technologies_worked,
    } = req.body;

    let query = "";
    let values = [];

    if (table === "table3") {
      if (!id || !name || !age || !education || !job_profile) {
        return resp.status(400).send("Missing required fields");
      }

      query = `UPDATE ${table} SET name = ?, age = ?, education = ?, job_profile = ? WHERE id = ?`;
      values = [name, age, education, job_profile, id];
    } else if (table === "table2") {
      if (
        !id ||
        !years_of_experience ||
        !location_worked ||
        !companies_worked ||
        !technologies_worked
      ) {
        return resp.status(400).send("Missing required fields");
      }

      query = `UPDATE ${table} SET years_of_experience = ?, location_worked = ?, companies_worked = ?, technologies_worked = ? WHERE id = ?`;
      values = [
        years_of_experience,
        location_worked,
        companies_worked,
        technologies_worked,
        id,
      ];
    }

    con.query(query, values, (err, result) => {
      if (err) {
        resp.status(500).send("Error updating data");
      } else {
        resp.status(200).send("Data updated successfully");
      }
    });
  });

  // DELETE 
  app.delete(`/${table}/:id`, (req, resp) => {
    const id = req.params.id;

    if (!id) {
      return resp.status(400).send("Missing ID parameter");
    }

    con.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, result) => {
      if (err) {
        resp.status(500).send("Error deleting data");
      } else {
        resp.status(200).send("Data deleted successfully");
      }
    });
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
