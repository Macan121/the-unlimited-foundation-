# TUF Website

Static website for The Unlimited Foundation.

## Local Preview

Build first, then use any static file server for `dist`. For example:

```sh
node tools/build.mjs
node -e "const http=require('http'),fs=require('fs'),path=require('path');const root=path.join(process.cwd(),'dist');const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpeg':'image/jpeg','.jpg':'image/jpeg','.png':'image/png','.xml':'application/xml','.txt':'text/plain'};http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);let f=path.join(root,p);if(p==='/'||!path.extname(p))f=path.join(root,p,'index.html');fs.readFile(f,(e,d)=>{if(e)fs.readFile(path.join(root,'404.html'),(_,notFound)=>{res.writeHead(404,{'Content-Type':'text/html'});res.end(notFound)});else{res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});res.end(d)}})}).listen(4173,()=>console.log('http://127.0.0.1:4173'))"
```

Then open `http://127.0.0.1:4173`.

## Checks and build

```sh
npm run check
npm run build
```

The build recreates `dist/` with only the files and assets used by the public site. It does not deploy the site.

To verify the content-first fallback with browser scripts blocked, run `node tools/preview-nojs.mjs` after building and open `http://127.0.0.1:4175`.

## Structure

- `tools/site.mjs` - shared layout and content for all generated routes
- `styles.css` - visual design, responsive layout, and motion
- `script.js` - progressive motion, navigation enhancement, configured links, image fallback, and email-draft handling
- `tools/` - dependency-free static generator and checks
- `assets/` - logo and website imagery
- `dist/` - generated multi-page output used by the existing Sites deployment setup

## Content Notes

See `CONTENT_DEPENDENCIES.md` for launch dependencies and omitted unapproved content.
