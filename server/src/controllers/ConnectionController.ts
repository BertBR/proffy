import { Request, Response } from "express";
import DAO from "../dataAccess/dao";

export default class ConnectionController {
  private dataAccess: DAO = new DAO();

  public index = async(request: Request, response: Response) => {
    const totalConnections = await this.dataAccess.listConnections()
    return response.json({total: totalConnections});
  }

  public create = async (request: Request, response: Response) => {
    const {teacherId} = request.body
    const connections = await this.dataAccess.addConnections(teacherId);
    return response.json(connections);
  }
}