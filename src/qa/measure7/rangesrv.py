# 測試用：支援 Range 的靜態伺服器（模擬 GitHub Pages）
import http.server,os,sys,re
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
    def send_head(self):
        rg=self.headers.get('Range');path=self.translate_path(self.path)
        if not rg or not os.path.isfile(path):return super().send_head()
        m=re.match(r'bytes=(\d+)-(\d*)',rg);size=os.path.getsize(path);a=int(m.group(1));b=int(m.group(2)) if m.group(2) else size-1;b=min(b,size-1)
        f=open(path,'rb');f.seek(a);self.send_response(206);self.send_header('Content-Type',self.guess_type(path));self.send_header('Content-Range',f'bytes {a}-{b}/{size}');self.send_header('Content-Length',str(b-a+1));self.end_headers()
        self.copyfile=lambda src,dst:dst.write(src.read(b-a+1));return f
os.chdir(sys.argv[2]);http.server.ThreadingHTTPServer(('127.0.0.1',int(sys.argv[1])),H).serve_forever()
