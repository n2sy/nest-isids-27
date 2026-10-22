import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('test')
export class AppController {
  @Get()
  getHi() {
    return '<h2>ISIDS</h2>';
  }
  @Get('hello')
  getHello() {
    
    return '<h2>ISIDS</h2>';
  }
  @Get('file')
  getfile(@Req() req: Request, @Res() reponse: Response) {
    console.log(req);
    // return 'index.html';
    reponse.sendFile('index.html', { root: 'src' });
  }
  @Get('yahia')
  getYahia(@Res() reponse: Response) {
    reponse.send({
      prenom: 'Yahya',
      age: 23,
      section: 'ISIDS',
    });
  }
}
