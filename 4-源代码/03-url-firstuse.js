//1.导入http模块
var http = require('http'); 
//导入url模块
const url = require('url');

//2.创建web服务
var server = http.createServer();

//3.请求，处理，响应
//req:请求
//res:响应
server.on('request',function(req,res){
  /*  if (req.url!='/favicon.ico') {
        var urlString = req.url;

        //利用url的parse将urlString 转成 urlObj
        var urlObj = url.parse(urlString,true);
        console.log(urlObj.query.username);
        console.log(urlObj.pathname);
    }*/

      if (!req.url.includes('ico')) {
        var urlString = req.url;

        //利用url的parse将urlString 转成 urlObj
        var urlObj = url.parse(urlString,true);
        console.log(urlObj.query.username);
        console.log(urlObj.pathname);
    }
    

    res.setHeader("Content-Type","text/html;charset=utf-8");
    res.end("...北京欢迎你...");
});

//4.启动web服务,监听浏览器的请求
server.listen(3000,'127.0.0.1',function(err){
    if (err) {
      console.log(err);
    }
    console.log("启动成功!");
});
