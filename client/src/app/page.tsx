'use client';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './components/loading';

export default function Home() {
  const [user, setUser] = useState(false);
  const router = useRouter();

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
        if (res.data.user) {
          router.push('start/dashboard');
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/welcome');
    }
  }, []);

  return <Loading />;
}
