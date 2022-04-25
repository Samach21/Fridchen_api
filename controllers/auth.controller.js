const Family = require('../models/family.model');

exports.Hi = async function (req, res, next) {
    req.io.emit("message", 'hello socket');
    res.send('Hello!');
}

// exports.getFamilyByFamilyID = async function (req, res, next) {
//     const family_id = req.params.family_id;
//     try {
//         const family = await authService.getFamily(family_id);
//         return res.status(200).json({ status: 200, data: family });
//     } catch (e) {
//         return res.status(400).json({ status: 400, message: e.message });
//     }
// }

// exports.newFamily = async function (req, res, next) {
//     const newFamily = req.body
//     try {
//         const family = await authService.newFamily(newFamily);
//         return res.status(200).json({ status: 200, data: family });
//     } catch (e) {
//         return res.status(400).json({ status: 400, message: e.message });
//     }
// }

// class AuthController {
//     async Hi(req, res, next){
//         return res.status(200).json({ status: 200, data: users, message: "Succesfully" });
//     }

//     async getFamilyByFamilyID(req, res, next) {
//         try {
//         const family_id = req.params.family_id ;
//         const family = '';//await authService.findFamily(family_id);
//         res.status(200).send({
//             status: 200,
//             message: `found family id: ${family_id}`,
//             data: {
//             ...family
//             }
//         });
//         } catch (error) {
//         next(error);
//         }
//     }

//     async newFamily(req, res, next) {
//         try {
//         //   const family_id = req.params.family_id ;
//         //   const family = await authService.findFamily(family_id);
//         //   res.status(200).send({
//         //     status: 200,
//         //     message: `found family id: ${family_id}`,
//         //     data: {
//         //       ...family
//         //     }
//         //   });
//         } catch (error) {
//         next(error);
//         }
//     }
// }

// module.exports = {
//     AuthController
// }