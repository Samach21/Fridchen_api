// const authService = require('../services/auth.service');

class AuthController {
    async Hi(req, res, next){
        return 'Hello!'
    }

    async getFamilyByFamilyID(req, res, next) {
        try {
        const family_id = req.params.family_id ;
        const family = '';//await authService.findFamily(family_id);
        res.status(200).send({
            status: 200,
            message: `found family id: ${family_id}`,
            data: {
            ...family
            }
        });
        } catch (error) {
        next(error);
        }
    }

    async newFamily(req, res, next) {
        try {
        //   const family_id = req.params.family_id ;
        //   const family = await authService.findFamily(family_id);
        //   res.status(200).send({
        //     status: 200,
        //     message: `found family id: ${family_id}`,
        //     data: {
        //       ...family
        //     }
        //   });
        } catch (error) {
        next(error);
        }
    }
}

module.exports = {
    AuthController
}