-- CreateEnum
CREATE TYPE "rol" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "categoria" AS ENUM ('DIGITAL', 'CONVENCIONAL');

-- CreateTable
CREATE TABLE "usuario" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "rol" "rol" NOT NULL DEFAULT 'USER',
    "password" STRING NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color" (
    "id" STRING NOT NULL,
    "hex" STRING NOT NULL,

    CONSTRAINT "color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupo" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "colorId" STRING NOT NULL,

    CONSTRAINT "grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lugar" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "lat" FLOAT8 NOT NULL,
    "lon" FLOAT8 NOT NULL,
    "grupoId" STRING NOT NULL,

    CONSTRAINT "lugar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "svg" STRING NOT NULL,
    "categoria_id" STRING NOT NULL,
    "categoria" "categoria" NOT NULL,

    CONSTRAINT "tipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soporte" (
    "id" STRING NOT NULL,
    "tipo_id" STRING NOT NULL,

    CONSTRAINT "soporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soportedigital" (
    "id" STRING NOT NULL,
    "pulgadas" FLOAT8 NOT NULL,
    "pixeles_alto" INT4 NOT NULL,
    "pixeles_ancho" INT4 NOT NULL,
    "soporte_id" STRING NOT NULL,

    CONSTRAINT "soportedigital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soporteconvencional" (
    "id" STRING NOT NULL,
    "alto" FLOAT8 NOT NULL,
    "ancho" FLOAT8 NOT NULL,
    "espacios" INT4 NOT NULL,
    "soporte_id" STRING NOT NULL,

    CONSTRAINT "soporteconvencional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "soportedigital_id" STRING,
    "soporteconvencional_id" STRING,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "localizacion" (
    "id" STRING NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "item_id" STRING NOT NULL,
    "lugar_id" STRING NOT NULL,

    CONSTRAINT "localizacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nombre_key" ON "usuario"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "lugar_lat_lon_key" ON "lugar"("lat", "lon");

-- AddForeignKey
ALTER TABLE "grupo" ADD CONSTRAINT "grupo_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lugar" ADD CONSTRAINT "lugar_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soporte" ADD CONSTRAINT "soporte_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soportedigital" ADD CONSTRAINT "soportedigital_soporte_id_fkey" FOREIGN KEY ("soporte_id") REFERENCES "soporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soporteconvencional" ADD CONSTRAINT "soporteconvencional_soporte_id_fkey" FOREIGN KEY ("soporte_id") REFERENCES "soporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_soportedigital_id_fkey" FOREIGN KEY ("soportedigital_id") REFERENCES "soportedigital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_soporteconvencional_id_fkey" FOREIGN KEY ("soporteconvencional_id") REFERENCES "soporteconvencional"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacion" ADD CONSTRAINT "localizacion_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacion" ADD CONSTRAINT "localizacion_lugar_id_fkey" FOREIGN KEY ("lugar_id") REFERENCES "lugar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
