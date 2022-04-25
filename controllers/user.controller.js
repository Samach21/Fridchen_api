const UserService = require('../services/user.service');

exports.newUser = async function (req, res, next) {
    const new_user = req.body;
    try {
        const saved_user = await UserService.newUser(new_user);
        return res.status(200).json({ status: 200, data: saved_user});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getUser = async function (req, res, next) {
    const user_id = req.params.user_id;
    try {
        const user = await UserService.getUser(user_id);
        return res.status(200).json({ status: 200, data: user});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteUser = async function (req, res, next) {
    const user_id = req.params.user_id;
    try {
        const user = await UserService.deleteUser(user_id);
        return res.status(200).json({ status: 200, data: user});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.leaveFamily = async function (req, res, next) {
    const family_id = req.params.family_id;
    const user_id = req.body.user_id;
    try {
        const old_user = await UserService.getUser(user_id);
        const family_ids = old_user.family_ids.filter(e => e.valueOf() !== family_id);
        const user = await UserService.updateFamily({family_ids, user_id})
        return res.status(200).json({ status: 200, data: user});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.joinFamily = async function (req, res, next) {
    const family_id = req.params.family_id;
    const user_id = req.body.user_id;
    try {
        const user = await UserService.newFamily({family_id, user_id});
        return res.status(200).json({ status: 200, data: user});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}