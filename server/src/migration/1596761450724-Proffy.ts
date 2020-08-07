import {MigrationInterface, QueryRunner} from "typeorm";

export class Proffy1596761450724 implements MigrationInterface {
    name = 'Proffy1596761450724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "proffy"."teachers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "avatar" character varying NOT NULL, "whatsapp" character varying NOT NULL, "bio" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2634bac7c78d82decc772ba479a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proffy"."classSchedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "week_day" integer NOT NULL, "from" integer NOT NULL, "to" integer NOT NULL, "classId" uuid, CONSTRAINT "PK_017b81cc3f39b7a5caa365545b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proffy"."classes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subject" character varying NOT NULL, "cost" integer NOT NULL, "teacherId" uuid, CONSTRAINT "REL_084361243cbc5de68e1c43b315" UNIQUE ("teacherId"), CONSTRAINT "PK_b8031853a21ced9e8b10741771c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proffy"."connections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "teacherId" uuid, CONSTRAINT "PK_06d421efa6cf89ca4af45885337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "proffy"."classSchedule" ADD CONSTRAINT "FK_c79f5501068407794be9d4145a8" FOREIGN KEY ("classId") REFERENCES "proffy"."classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proffy"."classes" ADD CONSTRAINT "FK_084361243cbc5de68e1c43b3157" FOREIGN KEY ("teacherId") REFERENCES "proffy"."teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proffy"."connections" ADD CONSTRAINT "FK_bc634dc2a8dfc636dd5b744f074" FOREIGN KEY ("teacherId") REFERENCES "proffy"."teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proffy"."connections" DROP CONSTRAINT "FK_bc634dc2a8dfc636dd5b744f074"`);
        await queryRunner.query(`ALTER TABLE "proffy"."classes" DROP CONSTRAINT "FK_084361243cbc5de68e1c43b3157"`);
        await queryRunner.query(`ALTER TABLE "proffy"."classSchedule" DROP CONSTRAINT "FK_c79f5501068407794be9d4145a8"`);
        await queryRunner.query(`DROP TABLE "proffy"."connections"`);
        await queryRunner.query(`DROP TABLE "proffy"."classes"`);
        await queryRunner.query(`DROP TABLE "proffy"."classSchedule"`);
        await queryRunner.query(`DROP TABLE "proffy"."teachers"`);
    }

}
