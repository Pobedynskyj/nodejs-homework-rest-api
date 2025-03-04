const { Contact } = require("../../schemas/contactsSchema");
const { NotFound } = require("http-errors");

const updateStatusById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!result) {
      throw new NotFound(`Contacts with id: ${contactId} wasn't found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      date: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusById;
