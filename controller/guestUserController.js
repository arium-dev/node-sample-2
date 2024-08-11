import GuestUser from "../model/GuestUser.js";

export const CreateGuestUser = async (req, res) => {
  try {
    const guestUser = await GuestUser.create({
      name: req.body.first_name,
      email: req.body.email,
      contact_Info: req.body.contact_Info,
    });

    if (guestUser) {
      return res.status(201).json({
        user: guestUser,
        code: 201,
        message: "Guest user created successfully",
      });
    } else {
      throw { code: 400, message: "Something went wrong while creating the guest user" };
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error." });
  }
};

