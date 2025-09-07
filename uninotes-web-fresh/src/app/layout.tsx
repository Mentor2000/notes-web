export const metadata = { title: 'UniNotes', description: 'Student notes marketplace' };
export default function RootLayout({ children }) {
  return (<html lang="en"><body style={{fontFamily:'system-ui', margin:0}}>
    <nav style={{display:'flex',gap:12,padding:12,borderBottom:'1px solid #eee'}}>
      <a href="/">Marketplace</a>
      <a href="/(routes)/upload">Upload</a>
      <a href="/(routes)/library">Library</a>
      <a href="/(routes)/admin" style={{marginLeft:'auto'}}>Admin</a>
      <a href="/(routes)/login">Login</a>
    </nav>
    <div style={{padding:24}}>{children}</div>
  </body></html>);
}
