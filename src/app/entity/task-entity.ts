import { Table, Column, PrimaryGeneratedColumn } from "ionic-orm-3";

@Table()
export class TaskEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column()
    points: number;

    @Column()
    completed: boolean

}
