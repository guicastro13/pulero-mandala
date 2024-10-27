import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

class Points {
    total: number = 0;
    reasons: string[] = [];
}

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string = ""; 

    @Column("simple-json")
    points: Points = new Points();

    @Column({ default: false })
    isMandalaPerson: boolean = false;
}