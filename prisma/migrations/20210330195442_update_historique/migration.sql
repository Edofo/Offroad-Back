/*
  Warnings:

  - Added the required column `vMoyen` to the `Historique` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Historique" ADD COLUMN     "vMoyen" TEXT NOT NULL;
