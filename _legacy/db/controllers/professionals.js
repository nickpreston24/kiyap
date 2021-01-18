const db = require('../models');
const badEntity = 422;

module.exports = {
    findAll: function (req, res) {
        db.Professional
            .find(req.query)
            .sort({
                date: -1
            })
            .then(data => res.json(data))
            .catch(err => res.status(badEntity).json(err));
    },
    findById: function (req, res) {
        db.Professional
            .findById(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.status(badEntity).json(err));
    },
    create: function (req, res) {
        db.Professional
            .create(req.body)
            .then(data => res.json(data))
            .catch(err => res.status(badEntity).json(err));
    },
    update: function (req, res) {
        db.Professional
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body)
            .then(data => res.json(data))
            .catch(err => res.status(badEntity).json(err));
    },
    remove: function (req, res) {
        db.Professional
            .findById({
                _id: req.params.id
            })
            .then(data => data.remove())
            .then(data => res.json(data))
            .catch(err => res.status(badEntity).json(err));
    }
};