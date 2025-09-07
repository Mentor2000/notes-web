'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function Library(){
  const [items, setItems] = useState<any[]>([]);
  useEffect(()=>{
    supabase.from('note_access').select('note_id, notes(title,file_path)').then(({data})=> setItems(data||[]));
  },[]);

  return (
    <main>
      <h1>My Library</h1>
      <ul>
        {items.map((x:any)=>(<li key={x.note_id}>
          {x.notes?.title} — <a href="#" onClick={async(e)=>{
            e.preventDefault();
            const { data } = await supabase.storage.from('notes').createSignedUrl(x.notes.file_path, 60);
            if(data?.signedUrl){ window.location.href = data.signedUrl; }
          }}>Download</a>
        </li>))}
      </ul>
    </main>
  );
}
