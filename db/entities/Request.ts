import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { User } from "./User";

@Entity()
export class Request {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne('User', 'requests')
    owner!: User;

    @Column()
    n_people!: number;

    @Column()
    fulfilled!: boolean;

    @Column()
    start_window!: Date;

    @Column()
    end_window!: Date;

    @Column()
    location!: string;

    @Column({ nullable: true })
    notes!: string;
}
