import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { ItineraryPackage } from "./";

@Entity()
export class ItineraryPackageItem {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne('ItineraryPackage', 'itinerary_items')
    itinerary_package!: ItineraryPackage;

    @Column()
    address!: string;

    @Column()
    name!: string;

    @Column()
    time!: Date;

    @Column()
    description!: string;
}
