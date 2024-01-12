import { ValidationPipe } from '@nestjs/common';
import cookieSession = require('cookie-session');

export const setupApp = (app: any) => {
    app.use(cookieSession({keys: ['b3l4j4rn35t']}));
    app.useGlobalPipes(
        new ValidationPipe({ 
            whitelist: true,
        })
    );
}  