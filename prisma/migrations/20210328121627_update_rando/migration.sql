/*
  Warnings:

  - The migration will remove the values [PRO] on the enum `Level`. If these variants are still used in the database, the migration will fail.
  - You are about to drop the column `average` on the `Historique` table. All the data in the column will be lost.
  - You are about to drop the column `average` on the `Rando` table. All the data in the column will be lost.
  - You are about to drop the column `longueur` on the `Rando` table. All the data in the column will be lost.
  - You are about to drop the column `max` on the `Rando` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Level_new" AS ENUM ('DEBUTANT', 'INTERMEDIAIRE', 'AVANCE', 'EXPERT');
ALTER TABLE "public"."User" ALTER COLUMN "level" TYPE "Level_new" USING ("level"::text::"Level_new");
ALTER TABLE "public"."Spot" ALTER COLUMN "level" TYPE "Level_new" USING ("level"::text::"Level_new");
ALTER TYPE "Level" RENAME TO "Level_old";
ALTER TYPE "Level_new" RENAME TO "Level";
DROP TYPE "Level_old";
COMMIT;

-- AlterTable
ALTER TABLE "Historique" DROP COLUMN "average";

-- AlterTable
ALTER TABLE "Rando" DROP COLUMN "average",
DROP COLUMN "longueur",
DROP COLUMN "max";
