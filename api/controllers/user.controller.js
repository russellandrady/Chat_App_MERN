import User from "../models/user.model.js";

export const getUser = async (req, res,next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const { password,createdAt,updatedAt, ...rest } = user._doc;
        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
    
}