import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service.js';

@Controller('books')
export class BooksController {

    constructor(private bookService: BooksService) { }

    @Post('add')
    async ajouterLivre(@Body() corps: any) {
        let result = await this.bookService.addBook(corps)
        return { message: "Livre ajouté", res: result }
        // return Reponse
    }

    @Get("all")
    async chercherLivres() {
        let result = await this.bookService.getAllBooks()
        return result
    }
}
