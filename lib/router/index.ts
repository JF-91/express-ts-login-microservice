import {Router} from 'express';
import {login, register} from '../controllers/loginController';
class AppRouter {

    static get config():Router {
    
        const router = Router();
        
        router.post('/api/login', login);

        router.post('/api/register', register);

        return router    
    }
}

export default AppRouter;