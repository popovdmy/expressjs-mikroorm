import { Migration } from '@mikro-orm/migrations';

export class Migration20230306173051 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_entity" ("id" serial primary key, "username" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null);');
  }

}
