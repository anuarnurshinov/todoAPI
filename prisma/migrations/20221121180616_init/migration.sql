-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "TaskList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,
    "taskListId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CanEdit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CanSee" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CanDelete" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CanCreate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "TaskList_title_key" ON "TaskList"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Task_title_key" ON "Task"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_CanEdit_AB_unique" ON "_CanEdit"("A", "B");

-- CreateIndex
CREATE INDEX "_CanEdit_B_index" ON "_CanEdit"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CanSee_AB_unique" ON "_CanSee"("A", "B");

-- CreateIndex
CREATE INDEX "_CanSee_B_index" ON "_CanSee"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CanDelete_AB_unique" ON "_CanDelete"("A", "B");

-- CreateIndex
CREATE INDEX "_CanDelete_B_index" ON "_CanDelete"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CanCreate_AB_unique" ON "_CanCreate"("A", "B");

-- CreateIndex
CREATE INDEX "_CanCreate_B_index" ON "_CanCreate"("B");

-- AddForeignKey
ALTER TABLE "TaskList" ADD CONSTRAINT "TaskList_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskListId_fkey" FOREIGN KEY ("taskListId") REFERENCES "TaskList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CanEdit" ADD CONSTRAINT "_CanEdit_A_fkey" FOREIGN KEY ("A") REFERENCES "TaskList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CanEdit" ADD CONSTRAINT "_CanEdit_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CanSee" ADD CONSTRAINT "_CanSee_A_fkey" FOREIGN KEY ("A") REFERENCES "TaskList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CanSee" ADD CONSTRAINT "_CanSee_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CanDelete" ADD CONSTRAINT "_CanDelete_A_fkey" FOREIGN KEY ("A") REFERENCES "TaskList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CanDelete" ADD CONSTRAINT "_CanDelete_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CanCreate" ADD CONSTRAINT "_CanCreate_A_fkey" FOREIGN KEY ("A") REFERENCES "TaskList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CanCreate" ADD CONSTRAINT "_CanCreate_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
