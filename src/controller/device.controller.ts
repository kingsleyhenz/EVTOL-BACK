import { Request, Response } from 'express';
import DeviceService from '../services/device.service.js';
import { CreateDeviceDto, UpdateDeviceDto } from '../dto/device.dto.js';
import nodemailer from 'nodemailer';
import { ResponseUtil } from '../util/response.util.js';

class DeviceController {
  public async registerDevice(req: Request, res: Response): Promise<Response> {
    const data: CreateDeviceDto = req.body;
    try {
      const evtol = await DeviceService.createDevice(data);
      return ResponseUtil.success(res, evtol, 201);
    } catch (error: any) {
      return ResponseUtil.error(res, error.message, 400);
    }
  }

  public async getAllDevices(req: Request, res: Response): Promise<Response> {
    try {
      const devices = await DeviceService.getAllDevices();
      return res.status(200).json({
        status: "Success",
        data: devices,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  public async getAvailableDevices(req: Request, res: Response): Promise<Response> {
    try {
      const devices = await DeviceService.findAvailableDevices();
      return res.status(200).json({
        status: "Success",
        data: devices,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  public async sendConfirmationEmail(name: string, email: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER || "ayehenz29@gmail.com",
          pass: process.env.EMAIL_PASS || "xfkpqulivwwhwisc",
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USER || "ayehenz29@gmail.com",
        to: email,
        subject: "Drone On Its Way!",
        text: `Thank you for using our services ,\n\nThe ${name} You Requested For Is On Its Way.`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error: any) {
      console.log("Email error:", error.message);
    }
  }
}

export default new DeviceController();
