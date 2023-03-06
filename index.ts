

import 'reflect-metadata';
import http from "http";
import express from 'express';
import cors from 'cors';
import mikroConfig from './mikro-orm.config';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { EntityManager, EntityRepository, MikroORM, RequestContext } from "@mikro-orm/core"
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { UserEntity } from './entities/UserEntity';
import { UserRouter } from './routes/UserRouter';

dotenv.config(); 

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<UserEntity>,
};

export const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(express.json());

export const main = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(mikroConfig);
  DI.em = DI.orm.em
  DI.userRepository = DI.orm.em.getRepository(UserEntity);
  
  app.use(bodyParser.json());
  app.use((_req, _res, next) => {
    RequestContext.create(DI.orm.em, next);
  });

  const corsOptions = {
    origin: "http://localhost:4000",
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));
  app.use(bodyParser.json({ type: 'application/*+json' }));
  app.use('/users/', UserRouter);
  app.use((_req, res) => res.status(404).json({ message: 'Route not found'}));

  DI.server = app.listen(PORT, () => {
    console.log(`express server started on localhost:${PORT}`)
  })
})();