import Messages from './../models/notification.model';

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