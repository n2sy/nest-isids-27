import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service.js';

@Controller('books')
export class BooksController {

    constructor(private bookService: BooksService) { }

    @Post('init')
    async initialiserLivres(@Body() corps: any) {
        let result = await this.bookService.initBooks(corps)
        return { message: "Bibliothéque initialisée", res: result }
        // return Reponse
    }
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
    @Patch("recover/:bookId")
    async recoverBook(@Param("bookId") id: number) {
        let res = await this.bookService.recoverBook(id);
        return { message: "Livre Restauré V2", res }

    }

    @Put("update/:bookId")
    async modifierBook(@Body() body: any, @Param("bookId", ParseIntPipe) id: number) {
        let res = await this.bookService.updateBook(body, id);
        return { message: "Livre modifié avec succès", res }
    }

    @Get("stats/v1")
    async statistiquesV1() {
        let res = await this.bookService.statistiques();
        return res
    }
    @Get("stats/v2")
    async LivresParAnnee(@Query("y1", ParseIntPipe) year1: number, @Query("y2", ParseIntPipe) year2: number) {
        let res = await this.bookService.booksbyYears(year1, year2);
        return res
    }
}
