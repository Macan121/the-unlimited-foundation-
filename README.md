# TUF Website

Static website for The Unlimited Foundation.

## Local Preview

Use any static file server from the project root. For example:

```sh
node -e "const http=require('http'),fs=require('fs'),path=require('path');const root=process.cwd();const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpeg':'image/jpeg','.jpg':'image/jpeg','.png':'image/png'};http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/'||!path.extname(p))p='/index.html';const f=path.join(root,p);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end('Not found')}else{res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});res.end(d)}})}).listen(4173,()=>console.log('http://127.0.0.1:4173'))"
```

Then open `http://127.0.0.1:4173`.

## Structure

- `index.html` - main page markup
- `styles.css` - visual design, responsive layout, and motion
- `script.js` - project cards, story filtering, dialogs, mobile menu, and form draft handling
- `assets/` - logo and website imagery
- `dist/` - static output used by the existing Sites deployment setup

## Content Notes

The site avoids unapproved impact statistics, team profiles, payment details, and testimonials. Replace placeholder-safe copy with approved TUF content when available.
