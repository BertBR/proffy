import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne, 
    CreateDateColumn,
    JoinColumn
} from "typeorm";

import Teacher from "./Teacher";

@Entity('connections')
class Connection {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Teacher)
    @JoinColumn( {name: 'teacherId'} )
    teacherId: string;

}

export default Connection;