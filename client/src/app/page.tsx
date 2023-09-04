'use client';
import axios from 'axios';
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
        console.log(res);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
    console.log(user);
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/welcome');
    }
  }, []);

  return <Loading />;
}
