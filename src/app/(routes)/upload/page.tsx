'use client';
import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function Upload(){
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(300);
  const [file, setFile] = useState<File|null>(null);
  const [msg, setMsg] = useState('');

  const submit = async (e:any)=>{
    e.preventDefault();
    if(!file){ setMsg('Select a file'); return; }
    const { data: u } = await supabase.auth.getUser();
    if(!u?.user){ setMsg('Please login first (top-right)'); return; }
    const path = `notes/${u.user.id}/${Date.now()}-${file.name}`;
    const up = await supabase.storage.from('notes').upload(path, file);
    if(up.error){ setMsg(up.error.message); return; }
    const ins = await supabase.from('notes').insert({
      owner_id: u.user.id, title, price_cents: price, file_path: up.data?.path, status: 'pending'
    });
    setMsg(ins.error ? ins.error.message : 'Uploaded. Pending approval.');
  };

  return (
    <main>
      <h1>Upload Note</h1>
      <form onSubmit={submit}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} /> <br/>
        <input type="number" value={price} onChange={e=>setPrice(parseInt(e.target.value||'0'))} /> cents <br/>
        <input type="file" accept=".pdf,.doc,.docx" onChange={e=>setFile(e.target.files?.[0]||null)} /> <br/>
        <button type="submit">Submit</button>
      </form>
      <p>{msg}</p>
    </main>
  );
}
