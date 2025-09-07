'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Page(){
  const [notes, setNotes] = useState<any[]>([]);
  useEffect(()=>{
    supabase.from('notes').select('id,title,price_cents,created_at').eq('status','approved').order('created_at',{ascending:false})
      .then(({data})=> setNotes(data||[]));
  },[]);
  return (
    <main>
      <h1>Marketplace</h1>
      <p>Approved notes for sale</p>
      <ul>{notes.map(n=>(<li key={n.id}>{n.title} — {(n.price_cents/100).toFixed(2)}€</li>))}</ul>
    </main>
  );
}
