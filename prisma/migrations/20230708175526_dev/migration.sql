/*
  Warnings:

  - You are about to drop the column `reminder_info_id` on the `Reminder` table. All the data in the column will be lost.
  - Added the required column `reminder_id` to the `ReminderInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `ReminderInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ReminderInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "details_id" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "PostTag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PostDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "post_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PostDetail_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PostToPostTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PostToPostTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PostToPostTag_B_fkey" FOREIGN KEY ("B") REFERENCES "PostTag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reminder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Reminder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reminder" ("created_at", "id", "updated_at", "user_id") SELECT "created_at", "id", "updated_at", "user_id" FROM "Reminder";
DROP TABLE "Reminder";
ALTER TABLE "new_Reminder" RENAME TO "Reminder";
CREATE TABLE "new_ReminderInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reminder_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "info" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReminderInfo_reminder_id_fkey" FOREIGN KEY ("reminder_id") REFERENCES "Reminder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReminderInfo" ("id") SELECT "id" FROM "ReminderInfo";
DROP TABLE "ReminderInfo";
ALTER TABLE "new_ReminderInfo" RENAME TO "ReminderInfo";
CREATE UNIQUE INDEX "ReminderInfo_reminder_id_key" ON "ReminderInfo"("reminder_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "PostDetail_post_id_key" ON "PostDetail"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToPostTag_AB_unique" ON "_PostToPostTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToPostTag_B_index" ON "_PostToPostTag"("B");
