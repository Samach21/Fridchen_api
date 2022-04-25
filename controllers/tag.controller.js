const TagService = require('../services/tag.service');

exports.getTag = async function (req, res, next) {
    const tag_id = req.params.tag_id;
    try {
        const tag = await TagService.getTag(tag_id);
        return res.status(200).json({ status: 200, data: tag });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getAllTag = async function (req, res, next) {
    try {
        const tag = await TagService.getAllTag();
        return res.status(200).json({ status: 200, data: tag });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.newTag = async function (req, res, next) {
    const new_tag = req.body
    try {
        const tag = await TagService.newTag(new_tag);
        return res.status(200).json({ status: 200, data: tag });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteTag = async function (req, res, next) {
    const tag_id = req.params.tag_id;
    try {
        const tag = await TagService.deleteTag(tag_id);
        return res.status(200).json({ status: 200, data: tag });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}