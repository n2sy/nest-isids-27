import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {

    constructor(@InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>) { }

    async initBooks(allBooks: any[]) {
        let result = await this.bookRepo.insert(allBooks);
        return result
    }

    async addBook(newBook: any) {
        let result = await this.bookRepo.save(newBook)
        return result
    }

    async getAllBooks() {
        let result = await this.bookRepo.find(
            {
                //  withDeleted: true
            }
        )
        return result
    }

    async getBookById(bookId: any) {
        let result = await this.bookRepo.findOne({ where: { id: bookId }, relations: { author: true } })
        // let result = await this.bookRepo.findOne({ where: { id: bookId }, loadRelationIds: true })
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
        let bookToRecover = await this.bookRepo.findOne({ where: { id: bookId }, withDeleted: true })
        if (!bookToRecover)
            throw new NotFoundException(`Aucun livre avec l'id ${bookId} n'existe`)
        let result = await this.bookRepo.recover(bookToRecover)
        return result;
    }

    async updateBook(uBook: any, bookId: number) {
        let updatedBook = await this.bookRepo.preload(
            {
                id: bookId,
                title: uBook.title,
                editor: uBook.editor,
                image: uBook.image,
                year: uBook.year
            }
        );
        if (!updatedBook)
            throw new NotFoundException(`On peut pas mettre à jour le livre d'id ${bookId}`)
        let res = await this.bookRepo.save(updatedBook);
        return res

    }

    async statistiques() {

        let qb = this.bookRepo.createQueryBuilder("book")
        let result = await qb.select("book.year, count(book.id) as NbreLivres")
            .groupBy("book.year")
            .getRawMany()

        return result;
    }

    async booksbyYears(year1: number, year2: number) {
        let qb = this.bookRepo.createQueryBuilder("book")
        let result = await qb.select("book")
            // .where("book.year >= :y1 and book.year <= :y2")
            .where("book.year between :y1 and :y2")
            .setParameters({ y1: year1, y2: year2 })
            .getRawMany()
        return result;
    }
}
