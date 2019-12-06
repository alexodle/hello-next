import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class PriceRange {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    name!: string;
}
