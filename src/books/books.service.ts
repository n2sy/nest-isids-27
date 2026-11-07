import { Injectable, NotFoundException } from '@nestjs/common';
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
        let result = await this.bookRepo.find(
            {
                withDeleted: true
            }
        )
        return result
    }

    async getBookById(bookId: any) {
        let result = await this.bookRepo.findOne({ where: { id: bookId } })
        if (!result)
            throw new NotFoundException(`Aucun livre avec l'id ${bookId} n'existe`)
        return result
    }

    async softDeleteBook(bookId: number) {
        let result = await this.bookRepo.softDelete(bookId)
        return result
    }
    async softRemoveBook(bookId: number) {
        let bookToDelete = await this.getBookById(bookId)
        let result = await this.bookRepo.softRemove(bookToDelete)
        return result
    }

    async restoreBook(bookId: number) {
        let bookToRestore = await this.bookRepo.restore(bookId);
        return bookToRestore;
    }
    async recoverBook(bookId: number) {
        //let bookToRestore = await this.bookRepo.recover()
        //return bookToRestore;
    }
}
