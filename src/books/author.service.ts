import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './entities/author.entity.js';

@Injectable()
export class AuthorService {

    constructor(@InjectRepository(AuthorEntity) private authorRepo: Repository<AuthorEntity>) { }

    async initAuthors(allAuthors: any[]) {
        let result = await this.authorRepo.save(allAuthors)
        return result
    }

    async getAllAuthors() {
        return await this.authorRepo.find()
    }

    async getAuthorById(authorId: number) {
        return await this.authorRepo.findOneBy({ id: authorId })
    }

    async addAuthor(newAuthor: any) {
        return await this.authorRepo.save(newAuthor)
    }


}
