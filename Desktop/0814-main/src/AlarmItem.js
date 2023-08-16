import React from 'react';

function AlarmItem({ alarm }) {
  const { time, name, sound, memo } = alarm;

  const handlePlaySound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>알람 시간: {time}</p>
      <p>메모: {memo}</p>
      <button onClick={handlePlaySound}>알람 울리기</button>
    </div>
  );
}

export default AlarmItem;

