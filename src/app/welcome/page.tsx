'use client';
import { Layout, Button } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Logo from '../public/images/logo.png';
import Google from '../public/images/GoogleLogo.png';
import CoverImage from '../public/images/coverImage.png';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();

  const SignInFunction = function () {
    router.push('/start/dashboard');
  };

  return (
    <Layout style={{ background: 'white', minHeight: '80vh' }}>
      <Header className="bg-white flex justify-center md:justify-between md:items-center shadow">
        <div className="flex gap-1 md:gap-2 items-center">
          <Image src={Logo} width={50} height={50} alt="logo of interviewify" />
          <p className="font-bold text-2xl lg:text-3xl">Interviewify</p>
        </div>
        <div className="flex items-center md:block hidden">
          <Button
            className="bg-[#1677ff] flex w-44 justify-center items-center gap-2"
            size="large"
            onClick={SignInFunction}
          >
            <p className="text-white m-0 font-medium text-xl">Join for free</p>
            <ArrowRightOutlined className="text-white" />
          </Button>
        </div>
      </Header>
      <div className="lg:max-w-screen-2xl lg:mx-auto">
        <Content className="md:grid md:grid-cols-3 lg:px-10 mt-6 px-5 lg:p-0 md:mt-20 lg:mt-32 lg:mb-0 mb-6 bg-white">
          <div className="md:col-span-2 flex flex-col gap-2">
            <h2 className="font-bold text-3xl xl:text-6xl xl:leading-normal m-0 lg:w-10/12">
              Master the Behavorial Interview
            </h2>
            <p className="xl:text-2xl text-xl text-[#8E8181] xl:leading-9 lg:w-10/12">
              Improve your behavioral interview skills with our AI-powered web
              app. Get personalized feedback on your responses to common
              questions and practice at your own pace.
            </p>
            <form>
              <Button
                className="w-11/12 md:w-80 xl:w-80 h-16 rounded-md bg-[#1677ff] grid grid-cols-6 px-3 justify-center items-center mt-3"
                onClick={SignInFunction}
              >
                <div className="col-span-1 bg-slate-300 rounded-md h-4/6 flex justify-center items-center">
                  <Image src={Google} height={24} width={24} alt="..."></Image>
                </div>
                <div className="col-span-5 lg:h-4/6 flex justify-center items-center">
                  <p className="text-xl text-white font-medium">
                    Continue with Google
                  </p>
                </div>
              </Button>
            </form>
          </div>
          <div className="WelcomeContentRight">
            <Image
              className="WelcomeContentImage"
              src={CoverImage}
              width={400}
              height={392}
              alt="man on computer"
            />
          </div>
        </Content>
      </div>
    </Layout>
  );
}
