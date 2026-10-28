import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimeStamp } from "../generics/timestamp.js";


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
}
