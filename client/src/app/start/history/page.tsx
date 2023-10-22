'use client';
import React, { useState } from 'react';

export default function History() {
  const [previousInterviews, setPreviousInterviews] = useState([]);

  return (
    <div className="lg:max-w-screen-lg lg:mx-auto flex flex-col w-full mt-8 gap-8 lg:gap-12">
      <div className="flex flex-col gap-4 mx-auto md:mx-auto px-4 md:px-0 md:w-11/12 w-10/12">
        <p className="text-2xl font-bold">History</p>
      </div>
      <div className="flex flex-col gap-2 mx-auto px-4 md:px-0 md:w-11/12 w-10/12">
        {previousInterviews.length === 0 ? <p>You have no history of interviews, schedule one today!</p> : previousInterviews.map((interview) => {
          return <div>{interview}</div>
        })}
      </div>
    </div>
  );
}
