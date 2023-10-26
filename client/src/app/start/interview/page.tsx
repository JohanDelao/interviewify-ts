'use client';
import React, { useEffect, useRef, useState } from 'react';
import GetQuestions from '@/app/utils/get-questions';
import { useRouter, useSearchParams } from 'next/navigation';
import getProfessionType from '@/app/utils/get-profession-type';
import Card from 'antd/es/card/Card';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { Button, Progress, Modal } from 'antd';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function Interview() {
  const params = useSearchParams();
  const router = useRouter();
  const profession = getProfessionType(params.get('profession'));
  const numQs = parseInt(
    params.get('numberQs') ? String(params.get('numberQs')) : '0',
  );
  
  // Code to keep track of question location
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const nextQuestion = () => {
    if(recognitionRef.current){
      recognitionRef.current.stop();
    }
    console.log(transcript);
    setTime(30);
    setStarted(false);
    timer('end');
    if (questionIndex >= questions.length - 1) {
      // make a function that ends the interview, leads to result screen
      router.push('/start/feedback');
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const restartQuestion = () => {
    setTime(30);
    setStarted(false);
    timer('end');
  }

  // Code for Timer
  const [started, setStarted] = useState<boolean>(false);
  const [time, setTime] = useState<number>(30);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);
  const startResponse = () => {
    setStarted(true);
    timer('start');
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event:any) => {
      const {transcript} = event.results[event.results.length - 1][0];
      console.log(transcript)
      console.log(event)
      // setTranscript((prevTranscript) => prevTranscript + ' ' + transcript);
    }
    recognitionRef.current.start();
  }
  const timer = (action: string) => {
    if(action === 'start'){
      const intId = setInterval(() => {
        if(time > 0){
            setTime((prevTime) => prevTime - 1);
        } else {
            // setTimeUp(true);
            clearInterval(intId);
        }
      }, 1000);
      setIntervalID(intId)
    } else if (action === 'end') {
      if(intervalID !== null){
        clearInterval(intervalID);
      }
    }
  }
  const timeConvert = (time: number) => {
    if (time < 0){
        return '00';
    }
    if(time < 10){
        return '0' + String(time);
    } else {
        return String(time)
    }
}
  
  const [muted, setMuted] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const recognitionRef = useRef<any>(null);
  
  
  useEffect(() => {
    const questions = GetQuestions(profession ? profession : undefined, numQs);
    setQuestions(questions);
    setStarted(false);
    setTime(30);
    return () => {
      if(recognitionRef.current){
        recognitionRef.current.stop();
      }
    }
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

  const SubmitButton = () => {
    return (
      <Button onClick={nextQuestion} size="middle" className="w-44">
        Submit Response
      </Button>
    )
  }

  const StartButton = () => {
    return (
      <Button onClick={startResponse} size="middle" className="w-44">
        Start Response
      </Button>
    )
  }

  const handleOk = () => {
    nextQuestion();
  };

  const handleCancel = () => {
    restartQuestion();
  };

  return (
    <div className="lg:max-w-screen-lg lg:mx-auto lg:justify-normal flex flex-col w-full mt-8 gap-16 lg:gap-36 h-full justify-center">
      <Card title={CardTitleUI()}>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-5'>
            <div>
              <div>{questions[questionIndex]}</div>     
            </div>
            <div className='flex justify-between items-center'>
              {started ? SubmitButton() : StartButton()}
            </div>
          </div>
          <Progress type='circle' percent={Math.floor(time/120 * 100)} format={() => `${timeConvert(Math.floor(time / 60))}:${timeConvert(time % 60)}`} size={'small'} />
        </div>
      </Card>
      <Modal title="Time ran out" open={time <= 0} onOk={handleOk} onCancel={handleCancel} okType='default' okText='Submit' cancelText='Restart'>
        <p>For behavorial interviews, you want to make your answer short and concise, therefore we have a two-minute time limit for each response. Feel free to restart your response or submit your current one!</p>
      </Modal>
    </div>
  );
}
