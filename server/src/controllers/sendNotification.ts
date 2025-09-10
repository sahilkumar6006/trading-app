import { Request, Response } from "express";
import { messaging } from "../services/notification";

const sendNotification = async (req: Request, res: Response) => {
  const { title, body, imageUrl } = req.body;
  if (!title || !body || !imageUrl) throw new Error("Invalid data");

  try {
    const message = {
      notification: {
        title,
        body,
        imageUrl,
      },
      token: "token",
    };

    await messaging.send(message);
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    throw new Error("Unable to send notification");
  }
};

export { sendNotification };
