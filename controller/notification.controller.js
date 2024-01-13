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
        throw new Error("Failed to create notification");
      }
}

export const requestAccepted = async(requestId)=>{
  try {
      const newMessage = new Messages({
        title: "Request Accepted",
        body: `Your request with ID ${requestId} has been accepted, your parcel will be picked up and deployed shortly`,
        status: "Unread"
      });
      const savedMessage = await newMessage.save();
      return savedMessage._id;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create notification");
    }
}

  export const requestDeclineDueToWeight = async(requestId)=>{
    try {
        const newMessage = new Messages({
          title: "Request Declined",
          body: `Sorry but your request with ID ${requestId} has been declined because the weight of your parcel exceeds the highest available weight for our drone devices`,
          status: "Unread"
        });
        const savedMessage = await newMessage.save();
        return savedMessage._id;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create notification");
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

export const getNotificationById = async (req, res) => {
  try {
    const userId = req.userAuth._id;  
    const notificationId = req.params.notificationId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await userModel.findById(userId).populate('notification');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const notification = user.notification.find(
      (notif) => notif._id.toString() === notificationId
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    await Messages.findByIdAndUpdate(notificationId, { status: "Read" });
    res.status(200).json(notification);
  } catch (error) {
    console.error("Error fetching notification:", error.message);
    res.status(500).json({ error: "Failed to fetch notification" });
  }
}