'use client';
import { useState } from 'react';
import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import { ProfessionType } from '@/app/interfaces';

export default function Dashboard() {
  const [profession, setProfession] = useState('Software Engineer');
  const [numberQuestions, setNumberQuestions] = useState(1);
  const router = useRouter();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setProfession(e.key);
  };

  const handleNumberClick: MenuProps['onClick'] = (e) => {
    setNumberQuestions(parseInt(e.key));
  };

  const startInterview = () => {
    router.push(
      `/start/interview?profession=${profession}&numberQs=${numberQuestions}`,
    );
  };

  const items: MenuProps['items'] = [
    {
      label: ProfessionType.SOFTWARE_ENGINEER,
      key: 'Software Engineer',
      icon: <UserOutlined />,
    },
    {
      label: ProfessionType.DATA_SCIENTIST,
      key: 'Data Scientist',
      icon: <UserOutlined />,
    },
    {
      label: ProfessionType.PRODUCT_MANAGER,
      key: 'Product Manager',
      icon: <UserOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const numberProps = {
    items: [
      {
        label: '1',
        key: '1',
      },
      {
        label: '2',
        key: '2',
      },
      {
        label: '3',
        key: '3',
      },
      {
        label: '4',
        key: '4',
      },
    ],
    onClick: handleNumberClick,
  };

  return (
    <div className="lg:max-w-screen-lg lg:mx-auto flex flex-col w-full mt-8 gap-16 lg:gap-36">
      <div className="flex flex-col gap-4 mx-auto md:mx-auto px-4 md:px-0 md:w-11/12 w-10/12">
        <p className="text-2xl font-bold">Profession</p>
        <div className="flex flex-col w-fit">
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                {profession}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 md:gap-2">
        <div className="w-fit md:w-11/12 mx-auto lg:max-w-screen-lg border-2 h-fit md:h-32 rounded-md shadow-md border-[C8C8C8] flex flex-col gap-4 md:gap-0 py-4 md:py-0 px-4 md:px-0 md:flex-row items-center justify-around md:grid md:grid-cols-10">
          <p className="text-2xl font-semibold drop-shadow-none text-center justify-center w-full md:text-center col-span-4">
            Mock Behavorial Interview
          </p>
          <div className="flex drop-shadow-none items-center justify-center gap-2 md:col-span-3">
            <p className="drop-shadow-none text-base font-medium text-center">
              Number of Questions
            </p>
            <Dropdown menu={numberProps}>
              <Button>
                <Space>
                  {numberQuestions}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div className="flex md:col-span-3 justify-center">
            <Button
              className="h-10 w-52 md:w-36 lg:w-52 bg-[#3772FF] rounded-md text-white text-base font-medium"
              onClick={() => startInterview()}
            >
              Begin Interview
            </Button>
          </div>
        </div>
        <p className="text-xs font-medium md:text-sm text-[#474747] lg:max-w-screen-lg lg:w-11/12 text-justify mx-2 md:text-center md:pl-5 md:mx-auto">
          Leveraging the power of OpenAIs GPT-4, an advanced language model, you
          will be given comprehensive feedback and constructive criticism on
          audio responses to question prompts.
        </p>
      </div>
    </div>
  );
}
