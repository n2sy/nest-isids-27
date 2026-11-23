import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { rolesEnums } from "../generics/roles.enum.js";
import { TimeStamp } from "../../books/generics/timestamp.js";


@Entity('user')
export class UserEntity extends TimeStamp {
    @PrimaryGeneratedColumn()
    id: number;
    @Column(
        {
            unique: true
        }
    )
    username: string;
    @Column(
        {
            unique: true
        }
    )
    email: string;
    @Column()
    password: string;
    @Column()
    salt: string;

    @Column(
        {
            type: "enum",
            enum: rolesEnums,
            //  default : rolesEnums.ROLE_USER
        }
    )
    role: string;


}
