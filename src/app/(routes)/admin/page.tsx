'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Admin(){
  const [notes, setNotes] = useState<any[]>([]);
  useEffect(()=>{ refresh(); },[]);

  const refresh = async()=>{
    const { data } = await supabase.from('notes').select('*').eq('status','pending');
    setNotes(data||[]);
  };

  const approve = async(id:string)=>{
    await supabase.from('notes').update({ status:'approved' }).eq('id', id);
    refresh();
  };
  const reject = async(id:string)=>{
    await supabase.from('notes').update({ status:'rejected' }).eq('id', id);
    refresh();
  };

  return (
    <main>
      <h1>Admin – Pending notes</h1>
      <p>(Temporary panel – we will add admin guard later)</p>
      <ul>
        {notes.map(n=>(<li key={n.id}>
          {n.title} — {(n.price_cents/100).toFixed(2)}€
          <button onClick={()=>approve(n.id)} style={{marginLeft:8}}>Approve</button>
          <button onClick={()=>reject(n.id)} style={{marginLeft:8}}>Reject</button>
        </li>))}
      </ul>
    </main>
  );
}
