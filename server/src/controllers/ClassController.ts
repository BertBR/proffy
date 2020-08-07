import { Request, Response } from "express";
import DAO from "../dataAccess/dao";
import { getConnection } from "typeorm";
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ICreateBody {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: number;
  schedules: { weekDay: number; from: string; to: string }[];
}

export default class ClassController {
  private dataAccess: DAO = new DAO;

  public create = async (request: Request, response: Response) => {

    const data: ICreateBody = request.body;

    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const teacher = await this.dataAccess.addTeacher(data.name, data.avatar, data.whatsapp, data.bio);

      const classes = await this.dataAccess.addClasses(data.subject, data.cost, teacher.id);

      await this.dataAccess.addSchedules(data.schedules, classes.id);

      queryRunner.commitTransaction()

      return response.status(201).json({ message: `${data.name}, dará aulas de ${data.subject} por ${data.cost}/hora!` })

    } catch (error) {
      queryRunner.rollbackTransaction();
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }

  public index = async (request: Request, response: Response) => {

    const week_day = request.query.week_day as string;
    const subject = request.query.subject as string;
    const time = request.query.time as string;

    if(!week_day || !subject || !time){
      return response.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    const timeInMinutes = convertHourToMinutes(time as string);

    const classes = await this.dataAccess.listClasses(week_day, subject, timeInMinutes)
    response.json(classes);

  }
}