-- CreateTable
CREATE TABLE "faq" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_item" (
    "id" TEXT NOT NULL,
    "faq_id" TEXT NOT NULL,
    "question" TEXT NOT NULL DEFAULT '',
    "answer" TEXT NOT NULL DEFAULT '',
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "faq_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "subtitle" TEXT DEFAULT '',
    "city" TEXT DEFAULT '',
    "email" TEXT DEFAULT '',
    "summary_phones" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footer_address" (
    "id" TEXT NOT NULL,
    "footer_id" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT '',
    "phone1" TEXT DEFAULT '',
    "phone2" TEXT DEFAULT '',
    "phone3" TEXT DEFAULT '',
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "footer_address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "faq_item" ADD CONSTRAINT "faq_item_faq_id_fkey" FOREIGN KEY ("faq_id") REFERENCES "faq"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footer_address" ADD CONSTRAINT "footer_address_footer_id_fkey" FOREIGN KEY ("footer_id") REFERENCES "footer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
