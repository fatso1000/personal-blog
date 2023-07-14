/*
  Warnings:

  - You are about to drop the column `details_id` on the `Post` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "sub_title" TEXT,
    "description" TEXT,
    "author_name" TEXT NOT NULL,
    "verification" BOOLEAN NOT NULL,
    "reading_time" INTEGER NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_tag_id" INTEGER
);
INSERT INTO "new_Post" ("author_name", "created_at", "description", "id", "post_tag_id", "reading_time", "sub_title", "title", "updated_at", "verification") SELECT "author_name", "created_at", "description", "id", "post_tag_id", "reading_time", "sub_title", "title", "updated_at", "verification" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
