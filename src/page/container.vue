<template>
<div>
    <c-container>
        <c-header>Header</c-header>
        <c-main>Main</c-main>
    </c-container>

    <c-container>
        <c-header>Header</c-header>
        <c-main>Main</c-main>
        <c-footer>Footer</c-footer>
    </c-container>

    <c-container>
        <c-aside width="200px">Aside</c-aside>
        <c-main>Main</c-main>
    </c-container>

<c-container>
  <c-header>Header</c-header>
  <c-container>
    <c-aside width="200px">Aside</c-aside>
    <c-main>Main</c-main>
  </c-container>
</c-container>

<c-container>
  <c-header>Header</c-header>
  <c-container>
    <c-aside width="200px">Aside</c-aside>
    <c-container>
      <c-main>Main</c-main>
      <c-footer>Footer</c-footer>
    </c-container>
  </c-container>
</c-container>

<c-container>
  <c-aside width="200px">Aside</c-aside>
  <c-container>
    <c-header>Header</c-header>
    <c-main>Main</c-main>
  </c-container>
</c-container>

<c-container>
  <c-aside width="200px">Aside</c-aside>
  <c-container>
    <c-header>Header</c-header>
    <c-main>Main</c-main>
    <c-footer>Footer</c-footer>
  </c-container>
</c-container>
</div>
</template>

<script>
import CContainer from '../components/container/container'
import CAside from '../components/container/aside'
import CFooter from '../components/container/footer'
import CHeader from '../components/container/header'
import CMain from '../components/container/main'


export default {
    components: {
        CContainer,
        CAside,
        CFooter,
        CHeader,
        CMain
    }
}
</script>

<style scoped>
    div > .c-container{
        margin-bottom: 20px;
        border-bottom: 1px solid red;
    }
  .c-header, .c-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .c-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .c-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .c-container {
    margin-bottom: 40px;
  }
  
  .c-container:nth-child(5) .c-aside,
  .c-container:nth-child(6) .c-aside {
    line-height: 260px;
  }
  
  .c-container:nth-child(7) .c-aside {
    line-height: 320px;
  }
</style>