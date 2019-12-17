import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export interface NeighborhoodImages {
    images: {
        type: 'fullscreen' | 'thumbnail'
        path: string
    }[]
}

@Entity()
export class Neighborhood {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @Column({ type: 'json', nullable: true })
    images!: NeighborhoodImages;
}
