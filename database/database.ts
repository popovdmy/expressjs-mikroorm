

import 'reflect-metadata';
import http from "http";
import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/core"
import { UserEntity } from '../entities/UserEntity';

export const DI = {} as {
    server: http.Server;
    orm: MikroORM,
    em: EntityManager,
    userRepository: EntityRepository<UserEntity>,
  };