import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {Request} from "./Request";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    display_name!: string;

    @Column({unique: true})
    username!: string;

    @Column({select: false})
    password_hash!: string;

    @OneToMany('Request', 'owner')
    requests!: Request[];
}
