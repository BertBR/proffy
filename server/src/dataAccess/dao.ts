import 'reflect-metadata';
import { getConnection } from "typeorm";
import Teacher from '../entity/Teacher';
import Class from '../entity/Class';
import ClassSchedule from '../entity/ClassSchedule';
import Connection from '../entity/Connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

export  default class DAO {

  public async addTeacher(name: string, avatar: string, whatsapp: string, bio: string) {
    let id: any
    try {
      id = await getConnection().getRepository(Teacher).save({ name, avatar, whatsapp, bio })
    } catch (error) {
      console.log('Error: ', error);
    }
    return id;
  }

  public async addClasses(subject: string, cost: number, teacherId: string) {
    let id: any;
    try {
      id = await getConnection().getRepository(Class)
        .save({
          subject,
          cost,
          teacherId
        })
    } catch (error) {
      console.log('Error: ', error);
    }
    return id;
  }

  public async addSchedules(schedules: any[], classId: any) {
    let id: any;
    const classSchedule = schedules.map(scheduleItems => {
      return {
        classId,
        week_day: scheduleItems.week_day,
        from: convertHourToMinutes(scheduleItems.from),
        to: convertHourToMinutes(scheduleItems.to)
      }
    })

    try {
      id = await getConnection()
        .getRepository(ClassSchedule)
        .save(classSchedule)
    } catch (error) {
      console.log(error);
    }
    return id;
  }

  public async listClasses(week_day: string, subject: string, time: number) {
    const classes = await getConnection()
      .getRepository(Class)
      .find({
        where: { subject },
        relations: ['schedules', 'teacherId']
      })

    const classFiltered = classes.filter(classItem => {
      const existsDay = classItem.schedules.filter(schedule => {
        return (
          schedule.week_day === Number(week_day) &&
          schedule.from <= time &&
          schedule.to > time
        );
      });
      
      return existsDay.length > 0;
    });

    return classFiltered;
  }

 public async addConnections(teacherId: any) {
    const connection = getConnection().getRepository(Connection).save({teacherId});
    return connection;
  }

  public async listConnections() {
    const connection = getConnection().getRepository(Connection).count();
    return connection;
  }

}