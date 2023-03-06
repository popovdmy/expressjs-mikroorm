import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import mikroConfig from '../mikro-orm.config';

(async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>(mikroConfig);
  const migrator = orm.getMigrator();
  await migrator.createInitialMigration();
  await migrator.up();
  await orm.close(true);
})();
