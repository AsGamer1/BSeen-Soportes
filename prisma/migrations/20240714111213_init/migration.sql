-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL
);
