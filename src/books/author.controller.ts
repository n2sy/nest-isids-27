import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AuthorService } from './author.service.js';

@Controller('author')
export class AuthorController {

    constructor(private authorService: AuthorService) { }

    @Post('init')
    async initialiserAuteurs(@Body() corps: any[]) {
        let result = await this.authorService.initAuthors(corps);
        return { message: "Auteurs initialisés", res: result };
    }
    @Post('add')
    async ajouterAuteur(@Body() corps: any) {
        let result = await this.authorService.addAuthor(corps);
        return { message: "Auteur ajouté", res: result };
    }
    @Get('all')
    async recupererTousLesAuteurs() {
        let result = await this.authorService.getAllAuthors();
        return result
    }
    @Get('all/:id')
    async recupererAuteurParId(@Param('id', ParseIntPipe) authorId: any) {
        let result = await this.authorService.getAuthorById(authorId);
        return result
    };


}
