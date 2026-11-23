import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { rolesEnums } from './generics/roles.enum.js';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {

    }

    async signUp(credentials: any) {
        let roleDesigned;
        if (await this.userRepo.count() == 0) {
            roleDesigned = rolesEnums.ROLE_ADMIN;
        }
        else {
            roleDesigned = rolesEnums.ROLE_USER
        }


        let newUser = this.userRepo.create({
            email: credentials.email,
            username: credentials.username,
            salt: await bcrypt.genSalt(),
            role: roleDesigned
        });

        newUser.password = await bcrypt.hash(credentials.password, newUser.salt);

        return await this.userRepo.save(newUser);
    }


}
