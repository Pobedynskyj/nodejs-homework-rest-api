const { Contact } = require("../../schemas/contactsSchema");
const { NotFound } = require("http-errors");

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId);
    if (!result) {
      throw new NotFound(`Contacts with id: ${contactId} wasn't found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
