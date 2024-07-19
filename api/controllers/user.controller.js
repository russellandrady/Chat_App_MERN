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
export const getAllUsers = async (req, res, next) => {
    try {
        // Assuming req.user.id holds the current user's ID
        const {id} = req.params;
        const users = await User.find({ _id: { $ne: id } }); // Exclude current user
        const userInfos = users.map((user) => {
            return { username: user.username, _id: user._id };
        });
        res.status(200).json(userInfos);
    } catch (error) {
        next(error);
    }
}