# 散装知识点

- ## 网络
   ### 1. TCP和UCP
   ```js
   UTP：相对于TCP缺少了三次握手，导致不安全，但是传输速度更快，适合用于视频直播。
   ```
   ### 2. [OSI参考模型](https://www.cnblogs.com/evablogs/p/6709707.html)
- ## HTML
   ### 1. [前端性能优化，提高加载速度](https://www.cnblogs.com/MarcoHan/p/5295398.html)
   ### 2. [prefetch, preload, dns-prefetch，defer和async](https://segmentfault.com/a/1190000011577248)
   	1. 文件合并，最大化减少文件数量，请求阻塞(业务文件跟库的文件分离)
	2. [service worker](https://x5.tencent.com/tbs/guide/serviceworker.html) 
	3. 图片懒加载
	4. 首页服务器渲染 + [分包prefetch](https://www.cnblogs.com/suyuwen1/p/5506397.html)
	
	
   ### 3. [Webpack自动化工程](https://www.cnblogs.com/woodk/p/7459467.html)
   ### 4. 通过NODE_ENV快速切换配置
	配置有这些：
	- img请求地址
	- 前端请求地址，
	- node请求地址，
	- redis配置丶地址丶端口
	- 是否开启/关闭日志（会影响性能）
	- 是否开启服务器渲染等等等等   
   ### 5. [`<video>`画中画](https://mp.weixin.qq.com/s/U8n8pQo06QC5eAvH7cV6SA)
- ## CSS
   ### 1. 让图片（行内块元素）在父容器中上下左右居中
   ```html
   <!-- html -->
   <div>
      <img /><span></span>
   </div>
   ```
   ```css
   div{
      width:100px;
      height:100px;
      text-align: center;
    }
    div>img{
      vertical-align:middle;
    }
    div>span{
      vertical-align:middle;
      display:inline-block;
      height:100%;
    }
   ```
   ### 2. BFC（块级格式化上下文）
   ```
   作用：
      1.清除内部浮动
      2.BFC区域不与浮动元素重叠
   产生BFC的条件：
      1.overflow-hidden
      2.display:inline-block
      3.display:flex
      4.float:left
   ```
   ### 3. 响应式布局（自适应布局）原理
   ```
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   1.整体把px改为rem，rem即根据根节点元素的font-size。默认font-size为16px,所以默认1rem = 16px。
   额外补充：em即根据父元素的font-size
   2.所以重点就是动态改变根节点元素的font-size。
      a.媒体查询，通过@media监听，设备宽度如果达到某个区间就更改相应的根节点font-size。缺点：只能换区间，才更改。
      	//vscode设置px->rem 设置为75 
	//原设备375px * 5 = 根节点字体大小75px
	@media (min-width:320px) { html { font-size:64px !important;}}
	@media (min-width:375px) { html { font-size:75px !important;}}
	@media (min-width:414px) { html { font-size:82.8px !important;}}
	@media (min-width:768px) { html { font-size:153.6px !important;}}
	@media (min-width:1024px) { html { font-size:204.8px !important;}}
      
      b.js插件，每次更改设备宽度都会改变根节点font-size。缺点：性能损耗。（此插件在utils文件夹）
         Vscode设置：首选项->搜索cssrem->Cssrem:RootFontSize->写入设备宽度除以20。如：iphone6就输入750/20=37.5
         脚本设置：18行，750改成设备宽度。如：iphone6就输入750。
   ```
- ## JS
   ### 1. 闭包
   ```
   简单来说就是函数套函数。父函数被销毁 的情况下，返回出的子函数的[[scope]]中仍然保留着父级的单变量对象和作用域链，
   因此可以继续访问到父级的变量对象，这样的函数称为闭包。
   ```
   ### 2. AJAX
   一般POST请求需要设置content-type，其实就是限制传输数据的格式。
   ```js
   1. application/x-www-form-urlencoded > 如：key1=val1&key2=val2
   2. multipart/form-data > 传文件
   // 浏览器原生支持以上两种方式
   3. application/json > 传JSON
   ```
   ##### [预检测preflight(option请求)](https://www.jianshu.com/p/b55086cbd9af)
   ##### Form表单提交
   ```jsx
   <form>
   	<input type="text" name="uid" value="testID" />
	<input type="password" name="upsw" value="testPSW" />
   <form />
   如果用var form = new FormData(document.querySelector("form"));
   就等于默认做了 form.append("uid","testID"),form.append("upsw","testPSW");
   等于发AJAX的时候，多了两条params。
   PS:	form.append(兼容性最好)
   	form.delete/set/get(不兼容iphone6sp的WX内置浏览器)
   
   ```
   ### 3. 实例对象、构造函数
   ```js
   function A(){
      //静态方法
      A.sayMeS=function(){
      console.log("S");
    }
     //实例方法
      this.sayMeE=function(){
      console.log("E");
      }
      //原型方法
      this.prototype.sayMeP=function(){
      console.log("P");
      }
    //全局方法
    sayMeW=function(){
      console.log("W");
      }
    }
     new A(); //先执行A函数，……，最后返回实例对象（不执行此行代码，这个函数["构造函数也只是个函数"]只是个虚设）
    
   ```
   ### 4. promise
   ```js
   function test(){
      //先执行then方法
	   Promise.resolve()
         //返回reject，执行catch，直接跳过2
		   .then(()=>Promise.reject(1))
		   .then(()=> console.log(2))
         //打印1
		   .catch((err)=>console.log(err))
         //继续执行resolve，打印4
		   .then(()=>{console.log(4)})
   }
   test() // 1 4
   ```
   
- ## Vue
  ### 1. 服务端渲染(SSR) > Vue使用nuxt
  ```
  前端渲染的劣势：
      1.损耗性能：浏览器要解析打包后的一个巨型JS文件。
      2.不利于SEO：只有一个HTML模板，其他HTML由巨型JS文件动态生成。因为SEO有关的爬虫技术不能抓JS包，也可以说不能抓到后来/动态生成的HTML。
  服务端渲染：
      1.服务端把巨型JS文件解包多个HTML后，再返回给前端。
  ```
  ### 2. v-for中的key的作用
  ```
  有Key的话：
      数据与节点与key值绑定，当数据数组排序倒序时，会使整个节点跟随数据变动。 节点：1，2，3 -> 3 , 2 , 1
  无Key的话：
      就地复用，当数据改变时，节点就近使用。 节点：1，2，3 -> 1，2，3
  ```
- ## React
  ### 1. Hash路由的原理
  ```js
  //事件在当前 URL 的锚部分(以 '#' 号为开始) 发生改变时触发
  window.onhashchange=function(){
      //获取#后面的字符串
      let hash = location.hash.slice(1);
      switch(hash){
         case '/home': xxxxxx;
         break;
         case 'list': xxxxxxx;
         break;
      }
  }
  ```
  
