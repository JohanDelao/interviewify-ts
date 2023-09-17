'use client';

import '../globals.css';
import React, { useEffect, useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
const { Footer, Sider } = Layout;
import { Suspense } from 'react';
import Loading from './loading';
import Image from 'next/image';
import {
  ClockCircleOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User } from '../utils/interfaces';
import Logo from '../../../public/images/LogoV2.png';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// const user = 'johandelao10@gmail.com';

export default function RegularLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>({
    email: '',
    username: '',
    _v: 0,
    _id: '',
  });
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const router = useRouter();

  const handleLogout = () => {
    axios
      .get('http://localhost:4000/auth/logout')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    router.push('/welcome');
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          'http://localhost:4000/auth/login/success',
          {
            withCredentials: true,
          },
        );
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  const items: MenuProps['items'] = [
    getItem('History', 'history', <ClockCircleOutlined />),
    getItem('Profile', 'profile', <UserOutlined />, [
      getItem(user.email, 'user email'),
      getItem('Report a bug', 'report', <ExclamationCircleOutlined />),
      getItem('Logout', 'logout', <LogoutOutlined />),
    ]),
  ];

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Layout className="max-h-screen overflow-hidden" hasSider>
          {/* TO DO: Have Sider animation where when it loads up have it slide up from the side */}
          <Sider
            className="SideBarNav	h-screen fixed left-0 top-0 bottom-0"
            breakpoint="sm"
            collapsedWidth={0}
          >
            <div
              className="flex gap-2 justify-center items-center w-11/12 mx-auto rounded-md mt-5 mb-5 cursor-pointer"
              onClick={() => {
                setSelectedMenuItem('');
                router.push('/start/dashboard');
              }}
            >
              <Image
                src={Logo}
                height={30}
                width={30}
                alt="logo of interviewify"
              />
              <p className="text-xl font-bold text-white">Interviewify</p>
            </div>
            <Menu
              className="SideBarMenu hover:text-white"
              mode="inline"
              items={items}
              onClick={(info) => {
                if (info.key === 'logout') {
                  handleLogout();
                } else if (info.key === 'history') {
                  setSelectedMenuItem(info.key);
                  router.push('/start/history');
                }
              }}
              selectedKeys={[selectedMenuItem]}
            />
          </Sider>
          <Layout
            className="site-layout min-h-screen grid grid-rows-10"
            style={{ background: 'white' }}
          >
            <div className="row-span-9">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
            <Footer
              className="row-span-1 flex items-center justify-center"
              style={{ textAlign: 'center' }}
            >
              Interviewify ©2023 Created by{' '}
              <a
                href="https://www.linkedin.com/in/johandelao/"
                className="px-1"
              >
                Johan Delao
              </a>{' '}
              &{' '}
              <a
                href="https://www.linkedin.com/in/abdul-andha/"
                className="px-1"
              >
                Abdul Andha
              </a>
            </Footer>
          </Layout>
        </Layout>
      </div>
    </Suspense>
  );
}
