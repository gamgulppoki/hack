import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider,Outlet} from 'react-router-dom';
import SeniorScheduleReminder from './SeniorScheduleReminder';
import ScheduleReminderPlanner from './ScheduleReminderPlanner';
import FirstPage from './FirstPage';
import MainPage from './MainPage';
import ScheduleList from './ScheduleList';
import { firestore } from './firebase';

export default function App() {
  const routes = [
    {
      element: <Layout />,
      children: [
        {path: '/', element: <FirstPage />}, //로그인, 회원가입 창
        {path: '/child', element: <ScheduleReminderPlanner/>},//일정 추가
        {path: '/senior', element: <SeniorScheduleReminder/>},//노인 화면. 일정 보여주기
        {path: '/main', element: <MainPage/>}, //보호자인지 노인인지 선택하는 탭
        {path: '/schedule', element: <ScheduleList/>},//자녀의 화면. +선택 시 일정 추가
      ],
    },
  ]


  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />  
  );
}

function Layout() {
	return (
		<div>
			<main>
				<Outlet />
			</main>
		</div>
	);
}