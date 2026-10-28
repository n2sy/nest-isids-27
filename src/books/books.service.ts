import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {

    constructor(@InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>) { }

    async addBook(newBook: any) {
        let result = await this.bookRepo.save(newBook)
        return result
    }

    async getAllBooks() {
        let result = await this.bookRepo.find()
        return result
    }
}
