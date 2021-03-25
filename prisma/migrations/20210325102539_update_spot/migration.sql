/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[adress]` on the table `Spot`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Spot.adress_unique" ON "Spot"("adress");
