// lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import AppRouter from "./router";
class App {
    public app: express.Application;
    port: Number;
    
    constructor(port: number) {
    this.app = express(); 
    this.port = port;
    this.config();
    this.router();
    
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    } 

    private router(): void{
        this.app.use('/', AppRouter.config);
    }

    listening(){
        this.app.listen(this.port, () => {
            console.log('Express server listening on port ' + this.port);
        })
    
    }
}

export default App;