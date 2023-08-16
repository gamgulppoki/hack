import React, { useState } from 'react';
import AlarmItem from './AlarmItem';
import './App.css';
import { firestore } from "./firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ScheduleReminderPlanner() {
  const navigate = useNavigate();

  //일정 보기로 돌아가기
  const navigateToScheduleList = () => {
    navigate("/schedule");
  };

  //데이터 참조방법. 여기서는 쓸 일이 없다. 
  const [alarms, setAlarms] = useState([]);
  const [newAlarm, setNewAlarm] = useState({ time: '', name: '', sound: '', memo: '' });

  const handleAlarmChange = (event) => {
    const { name, value } = event.target;
    setNewAlarm((prevAlarm) => ({ ...prevAlarm, [name]: value }));
  };

  const newSchedule = () => {
    if (newAlarm.time != '' && newAlarm.name != '' && newAlarm.memo != ''){
      console.log(alarms);
      addDoc(collection(firestore, "schedule"), {
        alarmTime: newAlarm.time,
        alarmName: newAlarm.name,
        memo: newAlarm.memo,
      });
    }
  }

  const handleAddAlarm = () => {
    setAlarms((prevAlarms) => [...prevAlarms, newAlarm]);
    newSchedule();
    setNewAlarm({ time: '', name: '', sound: '', memo: '' });
  };



  return (
    <div className="app-container">
      <div className="input-section">
        <div className="input-section time-input">
          <label>알람 시간: </label>
          <input type="time" name="time" value={newAlarm.time} onChange={handleAlarmChange} />
          <p>시간을 설정해주세요.</p>
        </div>
        <div className="input-section details-input">
          <label>알람 이름 </label>
          <input type="text" name="name" value={newAlarm.name} onChange={handleAlarmChange} />
          <label>메모 </label>
          <textarea name="memo" value={newAlarm.memo} onChange={handleAlarmChange} />
          <button onClick={() => {
            handleAddAlarm();
            navigateToScheduleList();
          }}
          >알람 추가</button>
        </div>
      </div>
    </div>
  );
}