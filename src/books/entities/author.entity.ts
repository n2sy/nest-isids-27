import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TimeStamp } from "../generics/timestamp.js";



@Entity("auteurs")
export class AuthorEntity extends TimeStamp {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    prenom: string;

    @Column()
    nom: string;

    // @OneToMany(...)
    // listeLivres
}
