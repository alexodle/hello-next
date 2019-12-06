import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Neighborhood, PriceRange } from "./";

@Entity()
export class ItineraryPackage {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;
    
    @ManyToOne('Neighborhood', {nullable: false})
    neighborhood!: Neighborhood;

    @ManyToOne('PriceRange', {nullable: false})
    price_range!: PriceRange;
}
