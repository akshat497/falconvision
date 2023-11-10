
const authentication = require("../middlewares/authentication");
const Category = require("../models/category");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const WebSocketServer = require('../webSoketConnect');
const categoryController = {
    getAllCategoryByUserId: async (req, res,  next) => {
        const { userId } = req.params

        try {
            let resposne = await Category.findAll({ where: { userId: userId } })
            res.json(resposne)
        } catch (err) {
            return next(err)
        }

    },
    updateCategory: async (req, res, next) => {
      
        try {
            const { categoryId, name, userId,isActive } = req.body;
            authentication(req,res,async()=>{
                let obj = {
                    name: name, userId: userId,isActive
                }
                if(req.user.userId!==userId){
                    return next(CustomErrorHandler.UnAuthorised());
                }
                // if(req.user.isActive===false){
                //     return res.status(403).send('Forbidden')
                // }
                let findMenu=await Category.findAll({where:{categoryId: categoryId ,userId:userId}})
                if(findMenu.length<1){
                    return next(CustomErrorHandler.NotFound('NO such item found'));
                  

                }
                console.log(findMenu)
                let response = await Category.update(obj, { where: { categoryId: categoryId } });
                //  WebSocketServer.broadUpdate(response);
                 WebSocketServer.broadUpdate(userId, response, 'updatedCategory');
                res.json(response)
            })
        } catch (err) {
            return next(err)
        }
    },
    addCategory: async (req, res, next) => {
        const { name, userId,isActive } = req.body;
        try {
         authentication(req,res,async()=>{
            let obj = {
                name: name, userId: userId,isActive:isActive
            }
            if(req.user.userId!==userId){
                return next(CustomErrorHandler.UnAuthorised());
            }
            // if(req.user.isActive===false){
            //     return res.status(403).send('Forbidden')
            // }
            let response = await Category.create(obj);
            // WebSocketServer.broadUpdate(response);
            WebSocketServer.broadUpdate(userId, response, 'newCategory');
            res.json(response)
         })
        } catch (err) {
            return next(err)
        }
    },
    deleteCategory: async (req, res, next) => {
        const { categoryId ,userId} = req.params;
        try {
           authentication(req,res,async()=>{
            if(req.user.userId!==userId){
                return next(CustomErrorHandler.UnAuthorised());
            }
            // if(req.user.isActive===false){
            //     return res.status(403).send('Forbidden')
            // }
            let response = await Category.destroy({ where: { categoryId,userId } });
            WebSocketServer.broadUpdate(userId, response, 'deleteCategory');
            res.json(response)
           })
        } catch (err) {
            return next(err)
        }
    }

}
module.exports = categoryController;