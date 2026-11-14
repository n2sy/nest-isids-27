import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimeStamp } from "../generics/timestamp.js";
import { AuthorEntity } from "./author.entity.js";


@Entity('livres')
export class BookEntity extends TimeStamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            type: "varchar",
            length: 50,
            // unique: true,
            // update: false
        }
    )
    title: string;

    @Column()
    editor: string;

    @Column()
    image: string;

    @Column()
    year: number

    @ManyToOne((type) => AuthorEntity, (e) => e.id)
    author: AuthorEntity
}
