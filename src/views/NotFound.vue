<template>
  <div class="not-found">
    <div class="container">
      <h1>404</h1>
      <h2>页面未找到</h2>
      <p>抱歉，您访问的页面不存在或已被移除</p>
      <router-link to="/" class="back-btn">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #3a3d98 0%, #1f2c6c 100%);
  color: #fff;
  text-align: center;
  
  .container {
    max-width: 500px;
    padding: 40px 20px;
  }
  
  h1 {
    font-size: 120px;
    margin: 0;
    font-weight: 700;
    background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }
  
  h2 {
    font-size: 36px;
    margin: 0 0 20px;
    font-weight: 500;
  }
  
  p {
    font-size: 18px;
    margin-bottom: 30px;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .back-btn {
    display: inline-block;
    padding: 12px 30px;
    background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    color: #fff;
    text-decoration: none;
    border-radius: 30px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 242, 254, 0.4);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 242, 254, 0.5);
    }
  }
}
</style> 