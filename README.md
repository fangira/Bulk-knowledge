# 散装知识点

- ## HTML
   - #### AAA

- ## CSS

- ## JS
   #### 1. 闭包
   ```
   简单来说就是函数套函数。父函数被销毁 的情况下，返回出的子函数的[[scope]]中仍然保留着父级的单变量对象和作用域链，
   因此可以继续访问到父级的变量对象，这样的函数称为闭包。
   ```
   #### 2. AJAX
   一般POST请求需要设置content-type，其实就是限制传输数据的格式。
   ```js
   1. application/x-www-form-urlencoded > 如：key1=val1&key2=val2
   2. multipart/form-data > 传文件
   // 浏览器原生支持以上两种方式
   3. application/json > 传JSON
   ```
   #### 3. 实例对象、构造函数
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
- ## Vue
  #### 1. 服务端渲染(SSR) > Vue使用nuxt
  ```
  前端渲染的劣势：
      1.损耗性能：浏览器要解析打包后的一个巨型JS文件。
      2.不利于SEO：只有一个HTML模板，其他HTML由巨型JS文件动态生成。因为SEO有关的爬虫技术不能抓JS包，也可以说不能抓到后来/动态生成的HTML。
  服务端渲染：
      1.服务端把巨型JS文件解包多个HTML后，再返回给前端。
  ```
- ## React
  #### 1. Hash路由的原理
  ```
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
  
