import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Request } from "./";

@Entity()
export class Contact {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    phone_number!: string;

    @ManyToOne('Request', 'contacts', { nullable: false })
    request!: Request;
}
