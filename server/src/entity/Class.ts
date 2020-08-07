import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToMany, 
    ManyToOne,
    OneToOne,
    JoinColumn
} from "typeorm";

import Teacher from "./Teacher";
import ClassSchedule from "./ClassSchedule";

@Entity('classes')
class Class {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    subject: string;

    @Column()
    cost: number;

    @OneToOne(() => Teacher)
    @JoinColumn({ name: 'teacherId'})
    teacherId: string;

    @OneToMany(() => ClassSchedule, schedules => schedules.classId)
    schedules: ClassSchedule[];
  
}

export default Class;