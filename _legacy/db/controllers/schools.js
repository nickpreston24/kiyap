const db = require('../models');
const badEntity = 422;

module.exports = {

    findByStudent: function (req, res) {
        console.log('findbystudent()', req.params.id)
        db.School
            .find({studentId: req.params.id})
            // .findById(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.status(badEntity).json(err));
    },

    findAll: function (req, res) {
        db.School
            .find(req.query)
            .sort({
                date: -1
            })
            .then(data => res.json(data))
            .catch(err => res.status(badEntity).json(err));
    },
    findById: function (req, res) {
        db.School
            .findById(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.status(badEntity).json(err));
    },
    create: function (req, res) {
        db.School
            .create(req.body)
            .then(data => res.json(data))
            .catch(err => res.status(badEntity).json(err));
    },
    update: function (req, res) {
        db.School
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body)
            .then(data => res.json(data))
            .catch(err => res.status(badEntity).json(err));
    },
    remove: function (req, res) {
        db.School
            .findById({
                _id: req.params.id
            })
            .then(data => data.remove())
            .then(data => res.json(data))
            .catch(err => res.status(badEntity).json(err));
    }
};