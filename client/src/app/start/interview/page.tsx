'use client';
import React, { useEffect, useState } from 'react';
import GetQuestions from '@/app/utils/get-questions';
import { useRouter, useSearchParams } from 'next/navigation';
import getProfessionType from '@/app/utils/get-profession-type';
import Card from 'antd/es/card/Card';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { Button, Progress, Modal } from 'antd';
import { ReactMic } from 'react-mic';
import axios from 'axios';

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
    setTime(30);
    setStarted(false);
    timer('end');
    if (questionIndex >= questions.length - 1) {
      evaluate();
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  // TODO: Need to discuss ways to handle sending request -> redirect to new page -> receiving info
  const evaluate = async () => {
    console.log(blobURLs);
    const resp = await axios.post('http://localhost:4000/gpt/evaluate', {
      questions: questions,
      audios: blobURLs,
      profession: profession,
    });
    console.log(resp);
    router.push('/start/feedback');
  };

  const restartQuestion = () => {
    setTime(30);
    setStarted(false);
    timer('end');
  };

  // Code for Timer
  const [started, setStarted] = useState<boolean>(false);
  const [time, setTime] = useState<number>(30);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);
  const startResponse = () => {
    setStarted(true);
    timer('start');
  };
  const timer = (action: string) => {
    if (action === 'start') {
      const intId = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
        } else {
          clearInterval(intId);
        }
      }, 1000);
      setIntervalID(intId);
    } else if (action === 'end') {
      if (intervalID !== null) {
        clearInterval(intervalID);
      }
    }
  };
  const timeConvert = (time: number) => {
    if (time < 0) {
      return '00';
    }
    if (time < 10) {
      return '0' + String(time);
    } else {
      return String(time);
    }
  };

  const [muted, setMuted] = useState<boolean>(false);

  const [blobURLs, setBlobURLs] = useState<any[]>([]);
  function handleAudio(recordedBlob: any) {
    // console.log(recordedBlob);
    setBlobURLs(prevBlobURLs => [...prevBlobURLs, recordedBlob.blobURL]);
    // console.log(blobURLs)
    // console.log('updated: ', blobURLs, recordedBlob.blobURL);
  }

  function handleData(recordedBlob: any) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  useEffect(() => {
    const questions = GetQuestions(profession ? profession : undefined, numQs);
    setQuestions(questions);
    setStarted(false);
    setTime(30);
  }, []);

  // to see when blob urls gets updated
  useEffect(() => {
    console.log('Updated Blob URLs:', blobURLs);
  }, [blobURLs]);

  const CardTitleUI = () => {
    return (
      <div className="flex justify-between">
        <div className="flex justify-center items-center">
          <p className="w-fit h-fit">
            Question {questionIndex + 1} of {numQs}
          </p>
        </div>
        <div className="flex flex-row-reverse justify-between items-center gap-5">
          {!muted ? (
            <AudioOutlined
              className="text-lg font-bold text-[#1677ff]"
              onClick={() => setMuted(!muted)}
            />
          ) : (
            <AudioMutedOutlined
              className="text-lg font-bold text-[#1677ff]"
              onClick={() => setMuted(!muted)}
            />
          )}
          <ReactMic
            record={started}
            className="w-72 h-11"
            visualSetting="sinewave"
            onStop={handleAudio}
            strokeColor="#1677ff"
            backgroundColor="#FFF"
          />
        </div>
      </div>
    );
  };

  const SubmitButton = () => {
    return (
      <Button onClick={nextQuestion} size="middle" className="w-44">
        Submit Response
      </Button>
    );
  };

  const StartButton = () => {
    return (
      <Button onClick={startResponse} size="middle" className="w-44">
        Start Response
      </Button>
    );
  };

  const handleOk = () => {
    nextQuestion();
  };

  const handleCancel = () => {
    restartQuestion();
  };

  return (
    <div className="lg:max-w-screen-lg lg:mx-auto lg:justify-normal flex flex-col w-full mt-8 gap-16 lg:gap-36 h-full justify-center">
      <Card title={CardTitleUI()}>
        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <div>
              <div>{questions[questionIndex]}</div>
            </div>
            <div className="flex justify-between items-center">
              {started ? SubmitButton() : StartButton()}
            </div>
          </div>
          <Progress
            type="circle"
            percent={Math.floor((time / 120) * 100)}
            format={() =>
              `${timeConvert(Math.floor(time / 60))}:${timeConvert(time % 60)}`
            }
            size={'small'}
          />
        </div>
      </Card>
      <Modal
        title="Time ran out"
        open={time <= 0}
        onOk={handleOk}
        onCancel={handleCancel}
        okType="default"
        okText="Submit"
        cancelText="Restart"
      >
        <p>
          For behavorial interviews, you want to make your answer short and
          concise, therefore we have a two-minute time limit for each response.
          Feel free to restart your response or submit your current one!
        </p>
      </Modal>
    </div>
  );
}
