/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "lugar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lon" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "svg" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tipo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "svg" TEXT NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    CONSTRAINT "tipo_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "soporte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT,
    "pulgadas" INTEGER,
    "imagen" TEXT NOT NULL,
    "tipo_id" INTEGER NOT NULL,
    CONSTRAINT "soporte_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "soporte_id" INTEGER NOT NULL,
    CONSTRAINT "item_soporte_id_fkey" FOREIGN KEY ("soporte_id") REFERENCES "soporte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "localizacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "item_id" INTEGER NOT NULL,
    "lugar_id" INTEGER NOT NULL,
    CONSTRAINT "localizacion_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "localizacion_lugar_id_fkey" FOREIGN KEY ("lugar_id") REFERENCES "lugar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "lugar_lat_lon_key" ON "lugar"("lat", "lon");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nombre_key" ON "usuario"("nombre");
