import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User, PriceRange, ItineraryItem, Neighborhood, Contact } from "./";

@Entity()
export class Request {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne('User', 'requests', { nullable: false })
    owner!: User;

    @Column()
    n_people!: number;

    @Column({ default: false })
    fulfilled!: boolean;

    @Column({ default: false })
    cancelled!: boolean;

    @Column()
    start_window!: Date;

    @Column()
    end_window!: Date;

    @Column({ nullable: true })
    notes!: string;

    @ManyToOne('Neighborhood', { nullable: false })
    neighborhood!: Neighborhood;

    @ManyToOne('PriceRange', { nullable: false })
    price_range!: PriceRange;

    @OneToMany('ItineraryItem', 'request')
    itinerary_items!: ItineraryItem[];

    @OneToMany('Contact', 'request', { cascade: true })
    contacts!: Contact[];
}
