import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class LoginFlow {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  oauth_state!: string;

  @Column()
  timestamp!: Date;
}
