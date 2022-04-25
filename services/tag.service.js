const Tag = require('../models/tag.model');

exports.getTag = async function (id) {
    try {
        const tag = await Tag.findById(id);
        return tag
    } catch (e) {
        throw Error(`Error can not find tag_id: ${id}`)
    }
}

exports.newTag = async function (new_tag) {
    try {
        const tag = new Tag(new_tag);
        await tag.save();
        return tag
    } catch (e) {
        throw Error('Error can not create new tag')
    }
}

exports.deleteTag = async function (id) {
    try {
        const deleted_tag = await Tag.findByIdAndDelete(id, {returnOriginal: true});
        return deleted_tag
    } catch (e) {
        throw Error(`Error can not find tag_id: ${id}`)
    }
}