'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Login(){
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  return (
    <main>
      <h1>Login</h1>
      <input placeholder="Academic email" value={email} onChange={e=>setEmail(e.target.value)} />
      <button onClick={async()=>{
        const { error } = await supabase.auth.signInWithOtp({ email });
        setMsg(error ? error.message : 'Check your email for the magic link.');
      }}>Send magic link</button>
      <p>{msg}</p>
    </main>
  );
}
