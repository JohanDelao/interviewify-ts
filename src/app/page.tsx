'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './components/loading';

export default function Home() {
  const [user, setUser] = useState(false);
  const router = useRouter();

  const getUser = function () {
    setUser(!user);
  };

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/welcome');
    }
  }, []);

  return <Loading />;
}
