import express from 'express';
import http from 'http';
import {EntityManager, EntityRepository, MikroORM, RequestContext} from '@mikro-orm/core';

import {Reise} from './entities/Reise';
import {Reiseziel} from './entities/Reiseziel';

import {ReiseController} from './controller/reise.controller';
import {ReisezielController} from './controller/reiseziel.controller';




const Port = 4000;
const app = express();

export const DI = {} as {   
    server: http.Server,
    orm: MikroORM,
    em: EntityManager,
    reiseRepository: EntityRepository<Reise>,
    reisezielRepository: EntityRepository<Reiseziel>,

};

export const startServer = async () => {
    DI.orm = await MikroORM.init();
    DI.em = DI.orm.em;
    DI.reiseRepository = DI.orm.em.getRepository(Reise);
    DI.reisezielRepository = DI.orm.em.getRepository(Reiseziel);

    app.use((req, res, next) => {
        console.info('New request to ${req.path}');
        next();
    });

    app.use(express.json());
    app.use((req, res, next) => { RequestContext.create(DI.orm.em, next); });

    app.use('/reise', ReiseController);
    app.use('/reiseziel', ReisezielController);
    

    app.listen(Port, () => {
        console.log(`Server started on http://localhost:${Port}`);
    });
};

startServer();




