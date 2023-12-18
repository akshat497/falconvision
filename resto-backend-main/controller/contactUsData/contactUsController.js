const ContactUs = require("../../models/contactus");
const authentication = require("../../middlewares/authentication");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const contactUsController = {
  getContactUs: async (req, res, next) => {
    try {
      authentication(req, res, async () => {
        const contact = await ContactUs.findAll();
        res.status(200).json(contact);
      });
    } catch (error) {
      return next(error);
    }
  },
  createContactUs: async (req, res, next) => {
    try {
      const { name, email, message, priority } = req.body;
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1); // Set expiration to one month from now

      const newContactUs = new ContactUs({
        name: name,
        email: email,
        message: message,
        priority: priority,
        expirationDate: expirationDate,
      });

      await newContactUs.save();
      res.status(200).json({ message: "Contact Us created successfully" });
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
        const { contactUsId } = req.params;

        // Validate if contactUsId is provided
        if (!contactUsId) {
          return next(CustomErrorHandler.NotFound("contactUsId not found"));
        }

        // Delete ContactUs entry by ID
        const result = await ContactUs.destroy({where:{contactUsId}});

        if (!result) {
          return next(CustomErrorHandler.notFound("ContactUs entry not found"));
        }

        res
          .status(200)
          .json({ message: "ContactUs entry deleted successfully" });
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = contactUsController;
