'use client'
import React, { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { redirect } from '@/routing';
import ButtonDark from '../components/ReusableComponents/ButtonDark';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { data: session } = useSession();

  if (session && session.user?.email != 'viajaresimoficial@gmail.com'
    && !session.user.access
  ) {
    redirect('/panel-influencer')
  }

  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      username,
      password,
      userType: 'influencers',
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid username or password');
    }
  };

  // const handleGoogleSignIn = () => {
  //   signIn('google', { callbackUrl: '/panel-influencer' });
  // };

  return (
    <div className='flex flex-col items-center space-y-4'>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-12'>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          className="p-12 rounded-custom border-custom"
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="p-12 rounded-custom border-custom"
        />
        <ButtonDark type="submit" extraClasses='p-12 rounded-custom'>
          Iniciar sesión
        </ButtonDark>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {/* <ButtonDark onClick={handleGoogleSignIn} extraClasses='px-4 py-2'>
        Iniciar sesión con Google
      </ButtonDark> */}
    </div>
  )
}

export default LoginForm