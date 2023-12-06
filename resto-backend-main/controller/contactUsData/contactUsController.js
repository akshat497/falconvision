const ContactUs = require("../../models/contactus");
const authentication = require("../../middlewares/authentication");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const contactUsController={
getContactUs:async(req,res,next)=>{
    try {
        authentication(req,res,async()=>{
            if(req,user.role!=="superadmin"){
                return next(CustomErrorHandler.forbiddden())
            }
            const contact=await ContactUs.findAll();
            res.status(200).json({success:"true",data:{contact}})

        })
    } catch (error) {
        return next(error);
    }
},
 createContactUs :async (req, res, next) => {
    try {
      const { name, email, message,priority } = req.body;
      const newContactUs = new ContactUs({
        name: name,
        email: email,
        message: message,
        priority:priority
      });
      await newContactUs.save();
      res.status(200).json({message:'Contact Us created successfully'});
    } catch (error) {
      return next(error);
    }
  }
  
}
module.exports=contactUsController