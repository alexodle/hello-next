import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Request } from "./";

@Entity()
export class ItineraryItem {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne('Request', {nullable: false})
    request!: Request;

    @Column()
    address!: string;

    @Column()
    name!: string;

    @Column()
    time!: Date;

    @Column()
    description!: string;
}
