const FamilyService = require('../services/family.service');
const UserService = require('../services/user.service');

exports.getFamilyByFamilyID = async function (req, res, next) {
    const family_id = req.params.family_id;
    try {
        const family = await FamilyService.getFamily(family_id);
        return res.status(200).json({ status: 200, data: family });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.newFamily = async function (req, res, next) {
    const newFamily = req.body
    try {
        const family = await FamilyService.newFamily(newFamily);
        return res.status(200).json({ status: 200, data: family });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createFamily = async function (req, res, next) {
    const new_family = req.body;
    const user_id = req.params.user_id;
    try {
        let family = await FamilyService.newFamily(new_family);
        const family_id = family._id;
        const user = await UserService.newFamily({family_id, user_id});
        return res.status(200).json({ status: 200, data: {family, user}});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
