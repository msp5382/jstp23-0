import React from "react";
/*
  วิธีการวาง Page และใช้ router นะครับ
  1.สร้าง page เป็น component ใน /page
  2.import เข้ามา ละมาเพิ่ม { name: ชื่อ, path: พาร์ท , component: <คอมโพเน้น /> },
 */

import AdminPage from "../pages/adminZone/admin";

import IndexPage from "../pages/index";
import LoginPage from "../pages/loginPage";

import CharacterGenPage from "../pages/userZone/registerZone/characterGen";
import CharacterEditPage from "../pages/userZone/registerZone/characterEdit";
import CharacterUserNamePass from "../pages/userZone/registerZone/characterUserNamePass";

import HomePage from "../pages/userZone/home";
import ChatPage from "../pages/userZone/chat";
import QuestPage from "../pages/userZone/quest";
import ViewQuestPage from "../pages/userZone/viewQuest";
import ChooseQuestPage from "../pages/userZone/chooseQuest";
import ScoreBoardPage from "../pages/userZone/menu/scoreboard";
import SettingsPage from "../pages/userZone/menu/settings";
import HistoryPage from "../pages/userZone/menu/history";
import HelpPage from "../pages/userZone/menu/help";
import DoMissionPage from "../pages/userZone/doMission";
import EventComplete from "../pages/userZone/eventComplete";

import IntroPage from "../pages/intro/introVid";

export default [
  {
    name: "intro",
    path: "/intro/",
    component: <IntroPage />,
    needLogin: false,
  },
  {
    name: "admin",
    path: "/admin_dash",
    component: <AdminPage />,
    needLogin: true,
    admin: true,
  },

  { name: "index", path: "/index", component: <IndexPage /> },
  { name: "login", path: "/login", component: <LoginPage /> },
  { name: "home", path: "/home", component: <HomePage />, needLogin: true },
  { name: "chat", path: "/chat", component: <ChatPage />, needLogin: true },
  { name: "quest", path: "/quest", component: <QuestPage />, needLogin: true },
  {
    name: "view_quest",
    path: "/view_quest/:id",
    component: <ViewQuestPage />,
    needLogin: true,
  },
  {
    name: "scoreboard",
    path: "/scoreboard",
    component: <ScoreBoardPage />,
    needLogin: true,
  },
  {
    name: "settings",
    path: "/settings",
    component: <SettingsPage />,
    needLogin: true,
  },
  {
    name: "history",
    path: "/history",
    component: <HistoryPage />,
    needLogin: true,
  },

  {
    name: "help",
    path: "/help",
    component: <HelpPage />,
    needLogin: true,
  },
  {
    name: "character_gen",
    path: "/character_gen",
    component: <CharacterGenPage />,
    needLogin: true,
  },
  {
    name: "character_edit",
    path: "/character_edit",
    component: <CharacterEditPage />,
    needLogin: true,
  },
  {
    name: "choose_quest",
    path: "/choose_quest/:location",
    component: <ChooseQuestPage />,
    needLogin: true,
  },
  {
    name: "do_mission",
    path: "/do_mission/:quest",
    component: <DoMissionPage />,
    needLogin: true,
  },

  {
    name: "event_complete",
    path: "/event_complete/",
    component: <EventComplete />,
    needLogin: true,
  },
  {
    name: "character_username_pass",
    path: "/character_username_pass/",
    component: <CharacterUserNamePass />,
    needLogin: false,
  },
];
