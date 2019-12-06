import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Neighborhood {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    name!: string;
}
