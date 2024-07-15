-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "lugar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lon" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "svg" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tipo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "svg" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,
    CONSTRAINT "tipo_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "soporte" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "modelo" TEXT,
    "pulgadas" INTEGER,
    "imagen" TEXT NOT NULL,
    "tipo_id" TEXT NOT NULL,
    CONSTRAINT "soporte_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "soporte_id" TEXT NOT NULL,
    CONSTRAINT "item_soporte_id_fkey" FOREIGN KEY ("soporte_id") REFERENCES "soporte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "localizacion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fecha" DATETIME NOT NULL,
    "item_id" TEXT NOT NULL,
    "lugar_id" TEXT NOT NULL,
    CONSTRAINT "localizacion_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "localizacion_lugar_id_fkey" FOREIGN KEY ("lugar_id") REFERENCES "lugar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nombre_key" ON "usuario"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "lugar_lat_lon_key" ON "lugar"("lat", "lon");
