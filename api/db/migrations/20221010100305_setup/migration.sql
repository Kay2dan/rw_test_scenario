/*
  Warnings:

  - You are about to drop the `Chore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Goal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GoalBoard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meeting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskFrequency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_callFrom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_callTo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_reqByGB` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_reqToGB` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chore" DROP CONSTRAINT "Chore_goalBoardId_fkey";

-- DropForeignKey
ALTER TABLE "Chore" DROP CONSTRAINT "Chore_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_goalId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_goalBoardId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "GoalBoard" DROP CONSTRAINT "GoalBoard_goalOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "GoalBoard" DROP CONSTRAINT "GoalBoard_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_fromGBId_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_toGBId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_choreId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_goalId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_meetingId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_taskFrequencyId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_teamMessageId_fkey";

-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_logId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_noticeToId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_goalId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "TaskFrequency" DROP CONSTRAINT "TaskFrequency_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_user1Id_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_user2Id_fkey";

-- DropForeignKey
ALTER TABLE "TeamMessage" DROP CONSTRAINT "TeamMessage_meetingId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMessage" DROP CONSTRAINT "TeamMessage_msgQuoteId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMessage" DROP CONSTRAINT "TeamMessage_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMessage" DROP CONSTRAINT "TeamMessage_teamId_fkey";

-- DropForeignKey
ALTER TABLE "_callFrom" DROP CONSTRAINT "_callFrom_A_fkey";

-- DropForeignKey
ALTER TABLE "_callFrom" DROP CONSTRAINT "_callFrom_B_fkey";

-- DropForeignKey
ALTER TABLE "_callTo" DROP CONSTRAINT "_callTo_A_fkey";

-- DropForeignKey
ALTER TABLE "_callTo" DROP CONSTRAINT "_callTo_B_fkey";

-- DropForeignKey
ALTER TABLE "_reqByGB" DROP CONSTRAINT "_reqByGB_A_fkey";

-- DropForeignKey
ALTER TABLE "_reqByGB" DROP CONSTRAINT "_reqByGB_B_fkey";

-- DropForeignKey
ALTER TABLE "_reqToGB" DROP CONSTRAINT "_reqToGB_A_fkey";

-- DropForeignKey
ALTER TABLE "_reqToGB" DROP CONSTRAINT "_reqToGB_B_fkey";

-- DropTable
DROP TABLE "Chore";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Goal";

-- DropTable
DROP TABLE "GoalBoard";

-- DropTable
DROP TABLE "Invite";

-- DropTable
DROP TABLE "Log";

-- DropTable
DROP TABLE "Meeting";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "TaskFrequency";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "TeamMessage";

-- DropTable
DROP TABLE "_callFrom";

-- DropTable
DROP TABLE "_callTo";

-- DropTable
DROP TABLE "_reqByGB";

-- DropTable
DROP TABLE "_reqToGB";

-- DropEnum
DROP TYPE "ActivityType";

-- DropEnum
DROP TYPE "CallLength";

-- DropEnum
DROP TYPE "GoalType";

-- DropEnum
DROP TYPE "NotifyOption";

-- DropEnum
DROP TYPE "OneOffTaskState";

-- DropEnum
DROP TYPE "OptionPrivilege";

-- DropEnum
DROP TYPE "OptionYesNo";

-- DropEnum
DROP TYPE "QuestionOptionType";
