-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vegetable" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "vendor_id" UUID,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vegetable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR(255),
    "image" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "vendor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "vegetable" ADD CONSTRAINT "vegetable_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

