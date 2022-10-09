-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('ONEOFF', 'FREQUENT');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('EDIT', 'OTHER', 'VERIFY', 'CREATE', 'UPDATE', 'DELETE', 'FINISH', 'INVITE', 'MEETING', 'MESSAGE', 'TEAMSTART', 'TEAMEND', 'QUESTIONAIRE');

-- CreateEnum
CREATE TYPE "OneOffTaskState" AS ENUM ('UNSTARTED', 'STARTED', 'FINISHED');

-- CreateEnum
CREATE TYPE "QuestionOptionType" AS ENUM ('DROPDOWN', 'SELECT', 'INPUT');

-- CreateEnum
CREATE TYPE "CallLength" AS ENUM ('min25', 'min50');

-- CreateEnum
CREATE TYPE "NotifyOption" AS ENUM ('NONE', 'BOTH', 'OWNER', 'TEAMMATE');

-- CreateEnum
CREATE TYPE "OptionYesNo" AS ENUM ('YES', 'NO', 'NOTSET');

-- CreateEnum
CREATE TYPE "OptionPrivilege" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "aboutMe" TEXT,
    "avatar" TEXT,
    "missionStatement" TEXT,
    "motivation" TEXT,
    "gender" TEXT,
    "location" TEXT,
    "timeZoneUTC" TEXT,
    "profession" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT NOT NULL,
    "u1PostGraceStayInTeam" "OptionYesNo" NOT NULL DEFAULT 'NOTSET',
    "u2PostGraceStayInTeam" "OptionYesNo" NOT NULL DEFAULT 'NOTSET',

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoalBoard" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "goalOwnerId" TEXT NOT NULL,
    "teamId" TEXT,

    CONSTRAINT "GoalBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "fromGBId" TEXT NOT NULL,
    "toGBId" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "dateSent" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateAccepted" TIMESTAMP(3),

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chore" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "forDate" TIMESTAMP(3),
    "isDisabled" BOOLEAN NOT NULL DEFAULT false,
    "completedOn" TIMESTAMP(3),
    "goalBoardId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "order" INTEGER,
    "ownerId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Chore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "privilege" "OptionPrivilege" NOT NULL DEFAULT 'PUBLIC',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "goalBoardId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "order" INTEGER,
    "type" "GoalType" DEFAULT 'ONEOFF',
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "intro" TEXT,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "order" INTEGER,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "goalId" TEXT,
    "timeEst" INTEGER NOT NULL DEFAULT 0,
    "dayFrequency" INTEGER NOT NULL DEFAULT 0,
    "weekFrequency" INTEGER NOT NULL DEFAULT 0,
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskFrequency" (
    "taskId" TEXT NOT NULL,
    "forDate" TIMESTAMP(3),
    "completedOn" TIMESTAMP(3),
    "sessionStart" TIMESTAMP(3),
    "sessionEnd" TIMESTAMP(3),
    "state" "OneOffTaskState",
    "id" TEXT NOT NULL,

    CONSTRAINT "TaskFrequency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMessage" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "msgFeedback" TEXT,
    "msgQuoteId" TEXT,
    "readAt" TIMESTAMP(3),
    "teamId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "meetingId" TEXT,

    CONSTRAINT "TeamMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "msgFeedback" TEXT,
    "readAt" TIMESTAMP(3),
    "teamId" TEXT NOT NULL,
    "goalId" TEXT,
    "taskId" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "dateAccepted" TIMESTAMP(3),
    "duration" "CallLength" NOT NULL DEFAULT 'min25',
    "callStart" TIMESTAMP(3) NOT NULL,
    "callEnd" TIMESTAMP(3) NOT NULL,
    "callFrAttend" BOOLEAN,
    "callToAttend" BOOLEAN,
    "teamId" TEXT,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "actType" "ActivityType" NOT NULL DEFAULT 'OTHER',
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teamId" TEXT,
    "ownerId" TEXT NOT NULL,
    "goalId" TEXT,
    "taskId" TEXT,
    "choreId" TEXT,
    "taskFrequencyId" TEXT,
    "teamMessageId" TEXT,
    "commentId" TEXT,
    "meetingId" TEXT,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),
    "actType" "ActivityType" NOT NULL DEFAULT 'OTHER',
    "teamId" TEXT,
    "ownerId" TEXT NOT NULL,
    "noticeToId" TEXT,
    "noticeMsg" TEXT,
    "logId" TEXT,
    "notifyUser" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_reqByGB" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_reqToGB" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_callFrom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_callTo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_fromGBId_toGBId_key" ON "Invite"("fromGBId", "toGBId");

-- CreateIndex
CREATE UNIQUE INDEX "Log_meetingId_key" ON "Log"("meetingId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_logId_key" ON "Notification"("logId");

-- CreateIndex
CREATE UNIQUE INDEX "_reqByGB_AB_unique" ON "_reqByGB"("A", "B");

-- CreateIndex
CREATE INDEX "_reqByGB_B_index" ON "_reqByGB"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_reqToGB_AB_unique" ON "_reqToGB"("A", "B");

-- CreateIndex
CREATE INDEX "_reqToGB_B_index" ON "_reqToGB"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_callFrom_AB_unique" ON "_callFrom"("A", "B");

-- CreateIndex
CREATE INDEX "_callFrom_B_index" ON "_callFrom"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_callTo_AB_unique" ON "_callTo"("A", "B");

-- CreateIndex
CREATE INDEX "_callTo_B_index" ON "_callTo"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalBoard" ADD CONSTRAINT "GoalBoard_goalOwnerId_fkey" FOREIGN KEY ("goalOwnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalBoard" ADD CONSTRAINT "GoalBoard_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_fromGBId_fkey" FOREIGN KEY ("fromGBId") REFERENCES "GoalBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_toGBId_fkey" FOREIGN KEY ("toGBId") REFERENCES "GoalBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chore" ADD CONSTRAINT "Chore_goalBoardId_fkey" FOREIGN KEY ("goalBoardId") REFERENCES "GoalBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chore" ADD CONSTRAINT "Chore_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_goalBoardId_fkey" FOREIGN KEY ("goalBoardId") REFERENCES "GoalBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFrequency" ADD CONSTRAINT "TaskFrequency_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMessage" ADD CONSTRAINT "TeamMessage_msgQuoteId_fkey" FOREIGN KEY ("msgQuoteId") REFERENCES "TeamMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMessage" ADD CONSTRAINT "TeamMessage_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMessage" ADD CONSTRAINT "TeamMessage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMessage" ADD CONSTRAINT "TeamMessage_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_choreId_fkey" FOREIGN KEY ("choreId") REFERENCES "Chore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_taskFrequencyId_fkey" FOREIGN KEY ("taskFrequencyId") REFERENCES "TaskFrequency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_teamMessageId_fkey" FOREIGN KEY ("teamMessageId") REFERENCES "TeamMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_noticeToId_fkey" FOREIGN KEY ("noticeToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reqByGB" ADD CONSTRAINT "_reqByGB_A_fkey" FOREIGN KEY ("A") REFERENCES "GoalBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reqByGB" ADD CONSTRAINT "_reqByGB_B_fkey" FOREIGN KEY ("B") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reqToGB" ADD CONSTRAINT "_reqToGB_A_fkey" FOREIGN KEY ("A") REFERENCES "GoalBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reqToGB" ADD CONSTRAINT "_reqToGB_B_fkey" FOREIGN KEY ("B") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_callFrom" ADD CONSTRAINT "_callFrom_A_fkey" FOREIGN KEY ("A") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_callFrom" ADD CONSTRAINT "_callFrom_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_callTo" ADD CONSTRAINT "_callTo_A_fkey" FOREIGN KEY ("A") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_callTo" ADD CONSTRAINT "_callTo_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
