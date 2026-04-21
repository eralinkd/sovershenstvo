-- CreateTable
CREATE TABLE "globals" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "seo_description" TEXT,
    "seo_og_title" TEXT,
    "seo_og_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "globals_pkey" PRIMARY KEY ("id")
);
