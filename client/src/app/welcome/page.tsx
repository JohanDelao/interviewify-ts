'use client';
import { ConfigProvider, Layout, Button } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import {
  ArrowRightOutlined,
  DatabaseTwoTone,
  CodeTwoTone,
  BulbTwoTone,
  BulbFilled,
  RightOutlined,
  GoogleOutlined,
  DatabaseFilled,
  CodeFilled,
} from '@ant-design/icons';
import WelcomeImage from '../../../public/images/Frame 4.png';
import Logo from '../../../public/images/logo.png';
import LogoV2 from '../../../public/images/logo.svg';
import Mobile from '../../../public/images/mobile.png';
import IPad from '../../../public/images/IPad.png';
import DesktopInterviewify from '../../../public/images/Frame 8.png';
import Desktop from '../../../public/images/Desktop.png';
import Google from '../../../public/images/GoogleLogo.png';
import CustomFooter from '../components/footer';
import React, { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

interface SecondContentCardProps {
  profession: string;
  icon: ReactNode;
}

function NavbarLayout() {
  return (
    <div className="w-[95%] md:max-w-5xl mx-auto md:w-full pt-2 z-[2]">
      <div className="w-full flex flex-col gap-10 md:max-w-5xl md:mx-auto">
        <div className="flex justify-between items-center">
          <Image src={LogoV2} alt={'...'} />
          <div className="grid cursor-pointer">
            <div className="rounded-full w-20 h-8 md:w-24 md:h-10 bg-white opacity-25 col-[1] row-[1]" />
            <div className="col-[1] row-[1] w-20 h-8 md:w-24 md:h-10 flex justify-center items-center gap-1">
              <p className="text-white font-medium text-sm md:text-base">
                Sign in
              </p>
              <RightOutlined className="text-white text-xs leading-none md:text-base md:leading-none" />
            </div>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}

function FirstContent() {
  return (
    <div className="flex w-full md:max-w-5xl mx-auto justify-center items-center">
      <div className="flex flex-col w-full md:grid md:grid-cols-2 justify-center items-center md:items-start">
        <div className="md:grid-cols-1 grid">
          <div className="flex flex-col gap-6 md:gap-10 z-[2] titleSection">
            <p className="text-4xl md:text-6xl font-bold text-white poppins w-full z-[2] leading-snug">
              Master the Behavioral Interview
            </p>
            <p className="text-lg font-normal text-[#F1F1F1] z-[2]">
              Improve your behavioral interview skills with our AI-powered web
              app. Get personalized feedback on your responses to common
              questions and practice at your own pace.
            </p>
            <button className="rounded-md bg-white w-8/12 md:w-6/12 h-10 z-[2] flex items-center px-3 cursor-pointer">
              <GoogleOutlined style={{ fontSize: '24px' }} />
              <p className="text-slate-600 w-full text-center">
                Continue with Google
              </p>
            </button>
          </div>
          <div className="gradientCover bg-[#3772FF] absolute bottom-0 overflow-hidden top-auto">
            <canvas className="absolute bottom-0 relative block w-[inherit] h-full" />
          </div>
        </div>
        <div className="grid-cols-1 hidden md:block">
          <div className="flex justify-center items-center relative z-[2] w-full">
            <figure className="absolute top-0 left-48 w-[900px]">
              {/* TODO: alter height based on mobile parameter that will be added */}
              <Image
                src={DesktopInterviewify}
                height={550}
                className="w-full absolute"
                alt="..."
              ></Image>
            </figure>
            <figure className="relative mt-20">
              {/* TODO: alter height based on mobile parameter that will be added */}
              <Image src={Mobile} height={500} alt="..."></Image>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondContent() {
  return (
    <div className="flex md:max-w-5xl mt-32 w-[95%] mx-auto md:w-full items-center md:mt-0">
      <div className="flex w-full flex-col">
        <div className="flex flex-col md:gap-2">
          <p className="font-bold text-[#3772FF] text-base md:text-lg">
            Field-focused preparation
          </p>
          <p className="font-bold text-black text-3xl md:text-4xl poppins">
            Practice interviewing for top tech fields{' '}
          </p>
        </div>
        <div className="flex flex-wrap-reverse w-full mt-5 justify-center gap-3 md:justify-between items-center">
          <SecondContentCard
            profession={'Data Science'}
            icon={
              <DatabaseFilled className="text-[#3772FF] text-2xl leading-none" />
            }
          />
          <SecondContentCard
            profession={'Software Engineering'}
            icon={
              <CodeFilled className="text-[#3772FF] text-2xl leading-none" />
            }
          />
          <SecondContentCard
            profession={'Product Management'}
            icon={
              <BulbFilled className="text-[#3772FF] text-2xl leading-none" />
            }
          />
        </div>
      </div>
    </div>
  );
}

function SecondContentCard({ profession, icon }: SecondContentCardProps) {
  return (
    <div className="flex justify-center justify-items bg-[#F0F0F0] rounded-md w-fit p-3">
      <div className="w-12 h-12 rounded-full bg-white flex justify-center items-center">
        {icon}
      </div>
      <div className="w-fit px-10 justify-center items-center flex">
        <p className="font-bold text-lg">{profession}</p>
      </div>
    </div>
  );
}

function ThirdContent() {
  return (
    <div className="ThirdContent mt-10 mb-20">
      <div className="flex flex-col md:max-w-5xl grid grid-cols-12 mx-auto mt-10 mb-10">
          <div className='flex flex-col gap-4 col-span-8 w-11/12'>
            <p className='font-bold text-lg poppins'>Ready to get started?</p>
            <p className='text-base text-[#434343]'>Connect your Google account instantly and start practicing your behavioral interview skills in a few minutes! Reach your full potential with the power of AI!</p>
            <div className='flex items-center gap-5'>
              <button className='flex items-center justify-center rounded-full w-3/12 py-1 text-white bg-[#3772FF] gap-2 font-medium'>
                <p>Start Now</p>
                <RightOutlined className='text-sm leading-none' />
              </button>
            </div>
          </div>
          <div className='col-span-4'>
            There
          </div>
      </div>
    </div>
  );
}

export default function Welcome() {
  useEffect(() => {
    // Create a DIV to measure the scrollbar width
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'scrollbar-measure';
    document.body.appendChild(scrollDiv);

    // Get the scrollbar width
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    console.warn(scrollbarWidth); // Mac: 15
    console.log('this is width: ' + scrollbarWidth);

    // Delete the DIV
    document.body.removeChild(scrollDiv);

    // Set the scrollbar width as a CSS variable
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${scrollbarWidth}px`,
    );
  }, []); // Run this effect only once after the component mounts

  return (
    <div
      style={{ background: 'white', minHeight: '80vh' }}
      className="max-w-md md:max-w-full"
    >
      {/* Div for slanted blue top section */}
      {/* TODO: Make blue slate absolute such as in Stripe */}
      <div className="w-full flex justify-center items-center overflow-hidden">
        <div className="w-full flex flex-col gap-10">
          <NavbarLayout />
          <FirstContent />
          <SecondContent />
          <ThirdContent />
        </div>
      </div>
    </div>
  );
}

{
  /* <Header className="bg-white flex justify-center md:justify-between md:items-center shadow">
        <div className="flex gap-1 md:gap-2 items-center">
          <Image src={Logo} width={50} height={50} alt="logo of interviewify" />
          <p className="font-bold text-2xl lg:text-3xl">Interviewify</p>
        </div>
        <div className="flex items-center md:block hidden">
          <form action="http://localhost:4000/auth/google">
            <button className="bg-[#1677ff] flex w-44 justify-center items-center gap-2 rounded-md h-10">
              <p className="text-white m-0 font-medium text-xl">
                Join for free
              </p>
              <ArrowRightOutlined className="text-white" />
            </button>
          </form>
        </div>
      </Header>
      <div className="w-full lg:mx-auto">
        <Content className="lg:px-10 mt-6 px-5 lg:p-0 md:mt-10 lg:mt-18 lg:mb-0 mb-6 bg-white">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="font-bold text-3xl md:text-3xl xl:text-6xl xl:leading-normal m-0 lg:w-11/12 lg:mx-auto text-center">
              Master the Behavorial Interview
            </h2>
            <div className='flex md:flex-col gap-2 w-full h-full flex-col-reverse'>
            <p className="xl:text-2xl md:text-lg text-base text-center lg:text-center lg:mx-auto text-[#8E8181] xl:leading-9 lg:w-10/12">
              Improve your behavioral interview skills with our AI-powered web app.
            </p>
            <div className='w-fit mx-auto flex justify-center'>
              <Image src={WelcomeImage} className='w-[21rem] md:w-[29rem] md:h-[18rem]' width={470} height={350} alt='laptop with interviewify on it' />
            </div>
            <div className='w-fit xl:text-2xl md:text-lg text-base text-center mx-auto flex md:flex-col gap-0 mt-1'>
              <p className='lg:mx-auto text-[#8E8181] xl:leading-9 lg:w-fit md:block hidden'>
                Get personalized feedback on your responses to common questions
              </p>
            </div>
            </div>
            <div className='w-fit mx-auto'>
            <form action="http://localhost:4000/auth/google" className='md:w-80 w-64 flex justify-content items-center'>
              <button className="md:w-11/12 w-full md:w-80 xl:w-80 md:h-16 h-12 rounded-md bg-[#1677ff] grid grid-cols-6 px-3 justify-center items-center md:mt-3">
                <div className="col-span-1 bg-[#D9D9D9] rounded-md h-4/6 flex justify-center items-center">
                  <Image
                    src={Google}
                    height={24}
                    width={24}
                    alt="Google logo"
                  />
                </div>
                <div className="col-span-5 lg:h-4/6 flex justify-center items-center">
                  <p className="xl:text-xl md:text-lg text-base text-white font-medium">
                    Continue with Google
                  </p>
                </div>
              </button>
            </form>
            </div>
          </div>
        </Content>
        <Content className='lg:px-10 mt-6 md:px-5 lg:p-0 md:mt-5 lg:mt-10 lg:mb-0 bg-[#1677ff] flex flex-col md:gap-10 gap-5 md:pb-10 pb-5 lg:pb-16'>
          <div className='flex flex-col gap-5 w-full justify-center items-center'>
            <div className='flex flex-col md:gap-2 gap-1 w-full md:mt-10 lg:mt-18 justify-center items-center'>
              <h2 className='xl:text-4xl text-2xl text-white font-bold mt-5 text-center mx-3'>Practice interviewing for top tech fields</h2>
              <p className='xl:text-xl md:text-lg text-sm text-[#E8E8E8]'>Questions specific to each profession</p>
            </div>
          </div>
          <div className='flex gap-2 justify-around md:w-8/12 w-screen mx-auto md:overflow-hidden overflow-scroll'>
            <div style={{maxWidth:'100vw'}} className='flex md:justify-around md:overflow-hidden overflow-x-scroll overflow-y-hidden w-full'>
              <div className='md:h-20 h-14 md:w-fit w-44 bg-white shadow flex items-center md:gap-4 gap-2 shadow md:px-5 px-2 rounded-lg mx-3'>
                <div className='bg-[#D9D9D9] rounded-full md:h-14 md:w-14 h-10 w-10 flex items-center justify-center'>
                  <DatabaseTwoTone className='md:text-4xl text-2xl' twoToneColor={'#1677ff'} />
                </div>
                <p className='xl:text-xl text-base font-semibold md:w-fit w-28 text-center'>Data Science</p>
              </div>
              <div className='md:h-20 h-14 md:w-fit w-44 bg-white shadow flex items-center md:gap-4 gap-2 drop-shadow md:px-5 px-2 rounded-lg mx-3'>
                <div className='bg-[#D9D9D9] rounded-full md:h-14 md:w-14 h-10 w-10 flex items-center justify-center'>
                  <CodeTwoTone className='md:text-4xl text-2xl' twoToneColor={'#1677ff'} />
                </div>
                <p className='xl:text-xl text-base font-semibold md:w-fit w-32 text-center'>Software Engineering</p>
              </div>
              <div className='md:h-20 h-14 md:w-fit w-44 bg-white shadow flex items-center md:gap-4 gap-2 drop-shadow md:px-5 px-2 rounded-lg mx-3'>
                <div className='bg-[#D9D9D9] rounded-full md:h-14 md:w-14 h-10 w-10 flex items-center justify-center'>
                  <BulbTwoTone className='md:text-4xl text-2xl' twoToneColor={'#1677ff'} />
                </div>
                <p className='xl:text-xl text-base font-semibold md:w-fit w-32 text-center'>Product Management</p>
              </div>
            </div>
          </div>
        </Content>
      </div>
      <CustomFooter /> */
}
