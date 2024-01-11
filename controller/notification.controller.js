import Messages from './../models/notification.model';

export const requestSent = async(req, res)=>{
    try {
        const newMessage = new Messages({
          title: "Request Created",
          body: `Your request with ID ${requestId} has been successfully created.`,
          status: "Unread"
        });
        await newMessage.save();
        res.status(201).json({
          message: "Notification created successfully",
          notification: newMessage
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create notification" });
      }
}