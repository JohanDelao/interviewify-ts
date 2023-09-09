'use client';

import '../globals.css';
import React from 'react';
import Image from 'next/image';
import { Layout, Menu, MenuProps } from 'antd';
const { Footer, Sider } = Layout;
import Logo from '../public/images/LogoV2.png';
import {
  ClockCircleOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
  MenuOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const user = 'johandelao10@gmail.com';

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

const items: MenuProps['items'] = [
  getItem('History', 'history', <ClockCircleOutlined />),
  getItem('Profile', 'profile', <UserOutlined />, [
    getItem(user, 'user email'),
    getItem('Report a bug', 'report', <ExclamationCircleOutlined />),
    getItem('Logout', 'logout', <LogoutOutlined />),
  ]),
];

export default function RegularLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Layout className='max-h-screen overflow-hidden' hasSider>
        {/* TO DO: Have Sider animation where when it loads up have it slide up from the side */}
        <Sider
          className="SideBarNav	h-screen fixed left-0 top-0 bottom-0"
          breakpoint="sm"
          collapsedWidth={0}
        >
          <div className="flex gap-2 justify-center items-center w-11/12 mx-auto rounded-md mt-5 mb-5">
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
          />
        </Sider>
        <Layout
          className="site-layout min-h-screen grid grid-rows-10"
          style={{ background: 'white' }}
        >
          <div className="row-span-9">{children}</div>
          <Footer
            className="row-span-1 flex items-center justify-center"
            style={{ textAlign: 'center' }}
          >
            Interviewify ©2023 Created by{' '}
            <a href="https://www.linkedin.com/in/johandelao/" className="px-1">
              Johan Delao
            </a>{' '}
            &{' '}
            <a href="https://www.linkedin.com/in/abdul-andha/" className="px-1">
              Abdul Andha
            </a>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
