-- CreateTable
CREATE TABLE "usuario" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "rol" STRING NOT NULL DEFAULT 'USER',
    "password" STRING NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lugar" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "lat" FLOAT8 NOT NULL,
    "lon" FLOAT8 NOT NULL,

    CONSTRAINT "lugar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "svg" STRING NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "svg" STRING NOT NULL,
    "categoria_id" STRING NOT NULL,

    CONSTRAINT "tipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soporte" (
    "id" STRING NOT NULL,
    "modelo" STRING,
    "pulgadas" INT4,
    "imagen" STRING NOT NULL,
    "tipo_id" STRING NOT NULL,

    CONSTRAINT "soporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "soporte_id" STRING NOT NULL,

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
ALTER TABLE "tipo" ADD CONSTRAINT "tipo_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soporte" ADD CONSTRAINT "soporte_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_soporte_id_fkey" FOREIGN KEY ("soporte_id") REFERENCES "soporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacion" ADD CONSTRAINT "localizacion_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacion" ADD CONSTRAINT "localizacion_lugar_id_fkey" FOREIGN KEY ("lugar_id") REFERENCES "lugar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
