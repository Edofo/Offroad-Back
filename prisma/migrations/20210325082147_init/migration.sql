-- CreateEnum
CREATE TYPE "Level" AS ENUM ('DEBUTANT', 'AMATEUR', 'EXPERT', 'PRO');

-- CreateEnum
CREATE TYPE "Notif" AS ENUM ('YES', 'NO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "pseudo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "encryptedPassword" TEXT NOT NULL,
    "level" "Level" NOT NULL DEFAULT E'DEBUTANT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notif" "Notif" NOT NULL DEFAULT E'NO',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spot" (
    "id" SERIAL NOT NULL,
    "level" "Level" NOT NULL DEFAULT E'DEBUTANT',
    "adress" TEXT NOT NULL,
    "infos" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "spotId" INTEGER,
    "authorId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "spotId" INTEGER,
    "authorId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "spotId" INTEGER,
    "authorId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
