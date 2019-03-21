const connection = require('./config/connection.js');
var db = require("../../../db/models/sequelize");


/** TODO:
 * 1) Refactor as separate js files and import by index.js
 * 2) Test to make sure the refactor works with your express setup
 */

module.exports = function (app) {

    /*

            ,o888888o.    8 8888888888 8888888 8888888888
           8888     `88.  8 8888             8 8888
        ,8 8888       `8. 8 8888             8 8888
        88 8888           8 8888             8 8888
        88 8888           8 888888888888     8 8888
        88 8888           8 8888             8 8888
        88 8888   8888888 8 8888             8 8888
        `8 8888       .8' 8 8888             8 8888
           8888     ,88'  8 8888             8 8888
            `8888888P'    8 888888888888     8 8888

    */

    function run(sql, res) {
        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result)
        });
    }

    app.get("/api/disciplines", function (req, res) {
        const sql = `select distinct * from disciplines order by name`;
        run(sql, res);
    });

    app.get("/api/students", function (req, res) {
        const sql = `select * from students`;
        run(sql, res);
    });

    app.get("/api/students/:id", function (req, res) {
        // console.log('searching student w/ id: ', req.params.id)
        if (!req.params.id)
            throw Error("student id cannot not be null!");

        const sql = `
            select * from students
            where id = ${req.params.id}
            limit 1;`;

        run(sql, res);
    });

    app.get("/api/teachers", function (req, res) {
        const sql = `select * from Professionals`;
        run(sql, res);
    });

    app.get("/api/certifications", function (req, res) {
        const sql = `

        # Teacher's Certifications:
        select
            concat(P.FirstName, ' ', P.LastName) as 'Teacher',
            Name as 'Teaches', concat(Belt, ' belt') as 'Rank', Degree
            from Certifications Cert
                join Professionals P
                join Disciplines D
                on Cert.ProfessionalId = P.Id and D.Id = Cert.DisciplineId;

        `;
        run(sql, res);
    });

    app.get("/api/students/:id/learning", function (req, res) {

        if (!req.params.id)
            throw Error("student id cannot not be null!");

        const sql = `
        # What is the student learning?:
        select
            concat(S.FirstName, ' ', S.LastName) as 'Student',
            Name as 'Learning' from Disciplines D
                join Training T
                on T.DisciplineId = D.Id
                join Students S
                on S.Id = T.StudentId
                where S.Id = ${req.params.id}
        `;
        run(sql, res);
    });

    app.get("/api/teachers/:id/training", function (req, res) {

        const sql = `
        # Students train with which pros:
        select
            concat(S.FirstName, ' ', S.LastName) as 'Student',
            concat(P.FirstName, ' ', P.LastName) as 'Teacher'
                from Training T
                join Students S
                join Professionals P
                on S.Id = T.StudentId and P.Id = T.ProfessionalId
            limit 10;
        `;
        run(sql, res);
    });

    /**
        8 888888888o       ,o888888o.       d888888o. 8888888 8888888888
        8 8888    `88.  . 8888     `88.   .`8888:' `88.     8 8888
        8 8888     `88 ,8 8888       `8b  8.`8888.   Y8     8 8888
        8 8888     ,88 88 8888        `8b `8.`8888.         8 8888
        8 8888.   ,88' 88 8888         88  `8.`8888.        8 8888
        8 888888888P'  88 8888         88   `8.`8888.       8 8888
        8 8888         88 8888        ,8P    `8.`8888.      8 8888
        8 8888         `8 8888       ,8P 8b   `8.`8888.     8 8888
        8 8888          ` 8888     ,88'  `8b.  ;8.`8888     8 8888
        8 8888             `8888888P'     `Y8888P ,88P'     8 8888
     */


    app.post('/api/disciplines/new', function (req, res) {
        db.discipline.create(req.body)
            .then(function (discipline) {
                res.json(discipline)
            })
            .catch(console.error)
    })

    app.post("/api/students/new", function (req, res) {
        db.student.create(req.body)
            .then(function (student) {
                res.json(student)
            })
            .catch(console.error)
    });


    app.post("/api/teachers/new", function (req, res) {
        db.professional.create(req.body)
            .then(function (professional) {
                console.info('created new professional: ', professional);
                res.json(professional)
            })
            .catch(console.error);
    });

    /**
        8 888888888o   8 8888      88 8888888 8888888888
        8 8888    `88. 8 8888      88       8 8888
        8 8888     `88 8 8888      88       8 8888
        8 8888     ,88 8 8888      88       8 8888
        8 8888.   ,88' 8 8888      88       8 8888
        8 888888888P'  8 8888      88       8 8888
        8 8888         8 8888      88       8 8888
        8 8888         ` 8888     ,8P       8 8888
        8 8888           8888   ,d8P        8 8888
        8 8888            `Y88888P'         8 8888
     */

    /**

    8 888888888o.      8 8888888888   8 8888         8 8888888888 8888888 8888888888 8 8888888888
    8 8888    `^888.   8 8888         8 8888         8 8888             8 8888       8 8888
    8 8888        `88. 8 8888         8 8888         8 8888             8 8888       8 8888
    8 8888         `88 8 8888         8 8888         8 8888             8 8888       8 8888
    8 8888          88 8 888888888888 8 8888         8 888888888888     8 8888       8 888888888888
    8 8888          88 8 8888         8 8888         8 8888             8 8888       8 8888
    8 8888         ,88 8 8888         8 8888         8 8888             8 8888       8 8888
    8 8888        ,88' 8 8888         8 8888         8 8888             8 8888       8 8888
    8 8888    ,o88P'   8 8888         8 8888         8 8888             8 8888       8 8888
    8 888888888P'      8 888888888888 8 888888888888 8 888888888888     8 8888       8 888888888888

      */
}