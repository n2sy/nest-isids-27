import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

    @Get(":bookId")
    async chercherLivreParId(@Param("bookId") id: any) {
        let res = await this.bookService.getBookById(id);
        return { message: "Livre trouvé", res }

    }
    @Delete("delete/:bookId")
    async supprimerLivre(@Param("bookId") id: number) {
        let res = await this.bookService.softDeleteBook(id);
        return { message: "Livre supprimé", res }

    }
    @Delete("remove/:bookId")
    async supprimerLivreV2(@Param("bookId") id: number) {
        let res = await this.bookService.softRemoveBook(id);
        return { message: "Livre supprimé V2", res }

    }
    @Patch("restore/:bookId")
    async restoreBook(@Param("bookId") id: number) {
        let res = await this.bookService.restoreBook(id);
        return { message: "Livre Restauré", res }

    }
}
