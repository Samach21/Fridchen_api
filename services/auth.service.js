const Family = require('../models/family.model');

exports.testFamily = async function (query, page, limit) {
    try {
        var family = new Family({
            name: 'smart',
            members: [],
            menu: [],
        });
        family.save();
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}

exports.getFamily = async function (query) {
    try {
        const family = await Family.findById(query);
        return family
    } catch (e) {
        throw Error('Error while Paginating Families')
    }
}

exports.newFamily = async function (query) {
    try {
        const family = new Family(query);
        family.save();
        return query
    } catch (e) {
        throw Error('Error can not create new family')
    }
}