import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string = "";

    @Column()
    weight: number = 0;
}