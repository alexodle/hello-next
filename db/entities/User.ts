import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {Request} from "./";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    username!: string;

    @Column()
    display_name!: string;

    @Column({select: false})
    password_hash!: string;

    @OneToMany('Request', 'owner')
    requests!: Request[];
}
