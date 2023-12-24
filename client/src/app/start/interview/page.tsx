'use client';
import React, { useEffect, useState } from 'react';
import GetQuestions from '@/app/utils/get-questions';
import { useRouter, useSearchParams } from 'next/navigation';
import getProfessionType from '@/app/utils/get-profession-type';
import Card from 'antd/es/card/Card';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { Button, Progress } from 'antd';

export default function Interview() {
  const params = useSearchParams();
  const router = useRouter();
  const profession = getProfessionType(params.get('profession'));
  const numQs = parseInt(
    params.get('numberQs') ? String(params.get('numberQs')) : '0',
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);

  const [muted, setMuted] = useState(false);

  const nextQuestion = () => {
    if (questionIndex >= questions.length - 1) {
      // make a function that ends the interview, leads to result screen
      router.push('/start/feedback');
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  useEffect(() => {
    const questions = GetQuestions(profession ? profession : undefined, numQs);
    setQuestions(questions);
  }, []);

  const CardTitleUI = () => {
    return (
      <div className="flex justify-between">
        <div>
          <p>
            Question {questionIndex + 1} of {numQs}
          </p>
        </div>
        <div className="flex">
          {!muted ? (
            <AudioOutlined onClick={() => setMuted(!muted)} />
          ) : (
            <AudioMutedOutlined onClick={() => setMuted(!muted)} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="lg:max-w-screen-lg lg:mx-auto lg:justify-normal flex flex-col w-full mt-8 gap-16 lg:gap-36 h-full justify-center">
      <div className='flex'>  
        <div className='w-full flex flex-col gap-2'>
          <div className='flex gap-4 items-center w-full'>
            <p className='text-3xl font-bold'>Interview</p>
            <hr className='border-l-2 border-[#BFBFBF] h-5 rounded-full'></hr>
            <p className='text-md text-[#BFBFBF]'>{numQs} questions</p>
            <Progress className='w-24 m-0' percent={((questionIndex ) / numQs)*100} showInfo={false} />
          </div>
          <div>
            <p className='text-md text-[#BFBFBF]'>{profession}</p>
          </div>
        </div>
      </div>
      <Card title={CardTitleUI()}>
        <div className="flex flex-col gap-5">
          <div>{questions[questionIndex]}</div>
          <Button onClick={nextQuestion} size="middle" className="w-44">
            Submit Response
          </Button>
        </div>
      </Card>
    </div>
  );
}
