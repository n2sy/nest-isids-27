import { Body, Controller, Post } from '@nestjs/common';
import { AuthorService } from './author.service.js';

@Controller('author')
export class AuthorController {

    constructor(private authorService: AuthorService) { }

    @Post('init')
    async initialiserAuteurs(@Body() corps: any[]) {
        let result = await this.authorService.initAuthors(corps);
        return { message: "Auteurs initialisés", res: result };
    }

}
