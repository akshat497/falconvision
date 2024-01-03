const ContactUs = require("../../models/contactus");
const authentication = require("../../middlewares/authentication");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const CustomResponseHandler = require("../../services/CustomResponseHandler");
const contactUsController = {
  getContactUs: async (req, res, next) => {
    try {
      authentication(req, res, async () => {
        const userRole = req.user.role;
  
        if (userRole === 'superadmin') {
          // If the user is a superadmin, retrieve all contacts
          const contacts = await ContactUs.findAll();
          res.status(200).json(contacts);
        } else if (userRole === 'franchise') {
          // If the user is a franchise, retrieve only contacts with priority 2 and matching userId
          // Assuming userId is stored in req.user.id
          
          const contacts = await ContactUs.findAll({
            where: {
              priority: 2,
              userId: req.user.userId ,
            },
          });
          res.status(200).json(contacts);
        } else {
          // Handle other roles as needed
          res.status(403).json({ message: 'Unauthorized' });
        }
      });
    } catch (error) {
      return next(error);
    }
  },
  
  createContactUs : async(req, res, next) => {
    try {
      const { name, email, message, priority, userId } = req.body;
  
      // Simple validations
      if (!name || !email || !message || priority === undefined || priority < 0 || priority > 2) {
        return res.status(400).json(CustomResponseHandler.negativeResponse('Invalid input.'));
      }
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json(CustomResponseHandler.negativeResponse('Invalid email address.'));
      }
  
      // Validate message length
      if (message.length > 200) {
        return res.status(400).json(CustomResponseHandler.negativeResponse('Message cannot exceed 200 characters.'));
      }
  
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1); // Set expiration to one month from now
  
      const newContactUsData = {
        name: name,
        email: email,
        message: message,
        priority: priority,
        expirationDate: expirationDate,
      };
  
      if (userId) {
        newContactUsData.userId = userId;
      }
  
      const newContactUs = new ContactUs(newContactUsData);
  
      await newContactUs.save();
      res.status(200).json(CustomResponseHandler.positiveResponse('Contact Us created successfully', []));
    } catch (error) {
      return next(error);
    }
  },
  
  
  // Scheduled job to delete expired ContactUs entries
  deleteExpiredContactUs: async () => {
    try {
      const currentDate = new Date();
      await ContactUs.deleteMany({ expirationDate: { $lt: currentDate } });
      console.log("Expired ContactUs entries deleted successfully");
    } catch (error) {
      console.error("Error deleting expired ContactUs entries:", error);
    }
  },
  deleteContactUsById: async (req, res, next) => {
    try {
      authentication(req, res, async () => {
        const { contactUsIds ,userId } = req.body;
  
        // Validate if contactUsId is provided
       
       
  
        // Assuming you have a way to identify the user's role, replace 'userRole' with your actual method to get the user's role.
       for(const contactUsId of contactUsIds){
        if (!contactUsId) {
          return next(CustomErrorHandler.NotFound("contactUsId not found"));
        }
        const userRole = req.user.role; // Replace with your actual method to get the user's role
  
        if (userRole === 'superadmin') {
          // If the user is a superadmin, delete the ContactUs entry by ID
          const result = await ContactUs.destroy({ where: { contactUsId } });
  
          if (!result) {
            return next(CustomErrorHandler.NotFound("ContactUs entry not found"));
          }
  
          res.status(200).json(CustomResponseHandler.positiveResponse("ContactUs entry deleted successfully.",[]));
        } else if (userRole === 'franchise') {
          // If the user is a franchise, check if the contactus has priority 2
          const contactUsEntry = await ContactUs.findByPk(contactUsId);
          if(req.user.userId!==userId){
            return next(CustomErrorHandler.UnAuthorised())
          }
          if (!contactUsEntry) {
            return next(CustomErrorHandler.NotFound("ContactUs entry not found"));
          }
  
          if (contactUsEntry.priority === 2) {
            // If the contactus has priority 2, the franchise can delete it
            const result = await ContactUs.destroy({ where: { contactUsId } });
  
            if (!result) {
              return next(CustomErrorHandler.NotFound("ContactUs entry not found"));
            }
  
            res.status(200).json(CustomResponseHandler.positiveResponse("ContactUs entry deleted successfully.",[]));
          } else {
            return next(CustomErrorHandler.Forbidden("Franchise can only delete contactus with priority 2"));
          }
        } else {
          // Handle other roles as needed
          return next(CustomErrorHandler.Forbidden("User does not have permission to delete ContactUs entry"));
        }
       }
      });
    } catch (error) {
      return next(error);
    }
  },
  
};

module.exports = contactUsController;
