import { Module } from '@nestjs/common';
import { BooksController } from './books.controller.js';
import { BooksService } from './books.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity.js';
import { AuthorController } from './author.controller.js';
import { AuthorService } from './author.service.js';
import { AuthorEntity } from './entities/author.entity.js';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
    controllers: [BooksController, AuthorController],
    providers: [BooksService, AuthorService]
})
export class BooksModule { }
