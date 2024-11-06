import axios from 'axios';
import React, { useCallback, useState } from 'react';
import Input from '@/components/Input'; // Ensure your Input component is properly imported
import { signIn } from 'next-auth/react';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);
  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles'
      });
    } catch (error) {
      console.log(error);
      
    }
      }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      })
      login()
    } catch (error) {
      console.log(error);
      
    }
  }, [email,name, password, login ])


  return (
    <div className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.jpg" alt="Logo image" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  label="Username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                value={password}
              />
              <button onClick={variant === 'login' ? login :register} className="bg-blue-500 text-white p-3 rounded-md mt-4 hover:bg-blue-600">
                {variant === 'login' ? 'Login' : 'Sign up'}
              </button>
              <div onClick={() => signIn('google', {callbackUrl:'/profiles'})} className='flex flex-row item-center gap-4 mt-8 justify-center'>
                <div className='w-10 h-10 bg-white rounded-full flex item-center justify-center cursor-pointer hover:opacity-80 transition '>
                  <FcGoogle size={30}  />
                </div>
                <div onClick={() => signIn('github', {callbackUrl:'/profiles'})} className='w-10 h-10 bg-white rounded-full flex item-center justify-center cursor-pointer hover:opacity-80 transition '>
                  <FaGithub size={30}  />
                </div>
              </div>
              <p className='text-neutral-500 mt-12'>
                {variant === 'login' ? "First time using Netflix?" : "Already have an account?"}
                <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
