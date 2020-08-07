import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne,
    JoinColumn
} from "typeorm";

import Class from "./Class";

@Entity('classSchedule')
class ClassSchedule {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    week_day: number;

    @Column()
    from: number;

    @Column()
    to: number; 
    
    @ManyToOne(() => Class, classes => classes.schedules)
    @JoinColumn({ name: 'classId' })
    classId: string;
    
}

export default ClassSchedule