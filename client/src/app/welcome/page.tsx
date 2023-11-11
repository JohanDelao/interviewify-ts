'use client';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { ArrowRightOutlined, DatabaseTwoTone, CodeTwoTone, BulbTwoTone } from '@ant-design/icons';
import Image from 'next/image';
import WelcomeImage from '../../../public/images/Frame 4.png';
import Logo from '../../../public/images/logo.png';
import Google from '../../../public/images/GoogleLogo.png';
import CustomFooter from '../components/footer';
import React from 'react';

export default function Welcome() {
  return (
    <Layout style={{ background: 'white', minHeight: '80vh' }} className='max-w-md md:max-w-full overflow-x-scroll overflow-y-hidden'>
      <Header className="bg-white flex justify-center md:justify-between md:items-center shadow">
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
      <CustomFooter />
    </Layout>
  );
}
