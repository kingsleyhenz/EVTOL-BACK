import userModel from '../models/user.model.js';
import Messages from './../models/notification.model.js';

export const requestSent = async(requestId)=>{
    try {
        const newMessage = new Messages({
          title: "Request Created",
          body: `Your request with ID ${requestId} has been successfully created.`,
          status: "Unread"
        });
        const savedMessage = await newMessage.save();
        return savedMessage._id;
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create notification" });
      }
}

export const getMyNotifications = async (req, res) => {
  try {
    const userId = req.userAuth._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await userModel.findById(userId).populate('notification');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.notification);
  } catch (error) {
    console.error("Error fetching user notifications:", error.message);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};