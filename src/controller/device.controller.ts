import { Request, Response } from 'express';
import DeviceService from '../services/device.service.js';
import nodemailer from 'nodemailer';

class DeviceController {
  async registerDevice(req: Request, res: Response) {
    const { serialNo, model, weight, battery, state } = req.body;
    try {
      // Check if already exists could be a service method too
      const existing = await DeviceService.getDeviceById(serialNo); // Assuming serialNo is unique but not ID, wait
      // Actually the service uses _id. Let's stick to the logic in original
      
      const evtol = await DeviceService.createDevice(req.body);
      return res.json({
        status: "Success",
        data: evtol,
      });
    } catch (error: any) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getAllDevices(req: Request, res: Response) {
    try {
      const devices = await DeviceService.getAllDevices();
      return res.json({
        status: "Success",
        data: devices,
      });
    } catch (error: any) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getAvailableDevices(req: Request, res: Response) {
    try {
      const devices = await DeviceService.findAvailableDevices();
      return res.json({
        status: "Success",
        data: devices,
      });
    } catch (error: any) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
  }

  async sendConfirmationEmail(name: string, email: string) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ayehenz29@gmail.com",
          pass: "xfkpqulivwwhwisc",
        },
      });
      const mailOptions = {
        from: "ayehenz29@gmail.com",
        to: email,
        subject: "Drone On Its Way!",
        text: `Thank you for using our services ,\n\nThe ${name} You Requested For Is On Its Way. To track your Medication kindly use this link: https://www.linktrack.appspot.com`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export default new DeviceController();
