'use client';
import { Layout, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Logo from '../../../public/images/logo.png';

export default function Welcome() {
  return (
    <Layout>
      <Header className="WelcomeNav">
        <div className="WelcomeNavLeft">
          <Image
            className="WelcomeNavLogo"
            src={Logo}
            width={50}
            height={50}
            alt="logo of interviewify"
          />
          <p className="WelcomeNavTitle">Interviewify</p>
        </div>
        <div className="WelcomeNavRight">
          <Button className="WelcomeNavJoin" size="large">
            <p className="WelcomeNavJoinText">Join for free</p>
            <ArrowRightOutlined style={{ color: 'white', width: '30px' }} />
          </Button>
        </div>
      </Header>
    </Layout>
  );
}
