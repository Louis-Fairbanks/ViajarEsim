'use client'
import React, { useEffect, useState} from 'react'
import { signIn } from 'next-auth/react'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import { useSession } from 'next-auth/react'
import { useRouter } from '@/routing'

const AdminLogin = () => {

  const session = useSession();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(session.data?.user)
    if(session && session.data?.user && (session.data.user.email === 'viajaresimoficial@gmail.com' || session.data.user.access)){
      router.push('/panel-admin')
  }
  }, [session])

    const handleGoogleLogin = async () => {
       await signIn('google', {callbackUrl : '/panel-admin', redirect : false})
    }

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError('');
  
      const result = await signIn('credentials', {
        username,
        password,
        userType: 'admins',
        redirect: false,
      });
  
      if (result?.error) {
        setError('Invalid username or password');
      }
    };

  return (
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
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
      <ButtonDark extraClasses='p-12 w-full mt-4 bg-[#db4437]' onClick={handleGoogleLogin}>Loguear con Google</ButtonDark>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default AdminLogin
