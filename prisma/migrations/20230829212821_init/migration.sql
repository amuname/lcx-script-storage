-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'TESTING', 'PROD');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Script" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,

    CONSTRAINT "Script_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScriptVersion" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "script_id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'DRAFT',
    "arguments_schema" JSONB NOT NULL,
    "script_schema" JSONB NOT NULL,
    "script_schema_raw" JSONB NOT NULL,
    "result_schema" JSONB NOT NULL,

    CONSTRAINT "ScriptVersion_pkey" PRIMARY KEY ("script_id","version")
);

-- CreateTable
CREATE TABLE "ProductionScript" (
    "script_ver_id" TEXT NOT NULL,
    "script_ver_version" INTEGER NOT NULL,
    "arguments_schema" JSONB NOT NULL,
    "prod_script" JSONB NOT NULL,
    "result_schema" JSONB NOT NULL,

    CONSTRAINT "ProductionScript_pkey" PRIMARY KEY ("script_ver_id","script_ver_version")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- AddForeignKey
ALTER TABLE "Script" ADD CONSTRAINT "Script_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScriptVersion" ADD CONSTRAINT "ScriptVersion_script_id_fkey" FOREIGN KEY ("script_id") REFERENCES "Script"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionScript" ADD CONSTRAINT "ProductionScript_script_ver_id_script_ver_version_fkey" FOREIGN KEY ("script_ver_id", "script_ver_version") REFERENCES "ScriptVersion"("script_id", "version") ON DELETE RESTRICT ON UPDATE CASCADE;
