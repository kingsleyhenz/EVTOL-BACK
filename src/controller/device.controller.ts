import { Request, Response } from 'express';
import { DeviceService } from '../services/device.service.ts';
import { CreateDeviceDto, UpdateDeviceDto } from '../dto/device.dto.ts';
import { ResponseUtil } from '../util/response.util.ts';
import nodemailer from 'nodemailer';

class DeviceController {
  private deviceService = new DeviceService();

  public registerDevice = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data: CreateDeviceDto = req.body;
      const evtol = await this.deviceService.createDevice(data);
      return ResponseUtil.created(res, evtol, 'Device registered successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message, 400);
    }
  };

  public getAllDevices = async (req: Request, res: Response): Promise<Response> => {
    try {
      const devices = await this.deviceService.getAllDevices();
      return ResponseUtil.success(res, devices, 'Devices fetched successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };

  public getDeviceById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const device = await this.deviceService.getDeviceById(req.params.deviceId as string);
      if (!device) return ResponseUtil.notFound(res, 'Device not found');
      return ResponseUtil.success(res, device, 'Device fetched successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };

  public updateDevice = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data: UpdateDeviceDto = req.body;
      const device = await this.deviceService.updateDevice(req.params.deviceId as string, data);
      if (!device) return ResponseUtil.notFound(res, 'Device not found');
      return ResponseUtil.success(res, device, 'Device updated successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };

  public deleteDevice = async (req: Request, res: Response): Promise<Response> => {
    try {
      const device = await this.deviceService.deleteDevice(req.params.deviceId as string);
      if (!device) return ResponseUtil.notFound(res, 'Device not found');
      return ResponseUtil.success(res, null, 'Device deleted successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };

  public getAvailableDevices = async (req: Request, res: Response): Promise<Response> => {
    try {
      const devices = await this.deviceService.findAvailableDevices();
      return ResponseUtil.success(res, devices, 'Available devices fetched successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };

  public sendConfirmationEmail = async (name: string, email: string): Promise<void> => {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Drone On Its Way!',
        text: `Thank you for using our services.\n\nThe ${name} you requested is on its way.`,
      });
    } catch (error: any) {
      console.error('Email error:', error.message);
    }
  };
}

export default new DeviceController();
