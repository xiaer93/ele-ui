<template>
<div>
  <section>
    <c-input class="demo-input"></c-input>
    <c-input class="demo-input" disabled></c-input>
  </section>

  <section>
    <c-input class="demo-input" clearable v-model="input1"></c-input>
    <p>您输入的内容：{{input1}}</p>
  </section>

  <section>
    <c-input placeholder="请输入密码" class="demo-input" v-model="input2" show-password></c-input>
  </section>

  <section>
    <c-input class="demo-input" placeholder="请选择日期" suffix-icon="c-icon-date"></c-input>
    <c-input class="demo-input" placeholder="请选择日期"><i slot="suffix" class="c-input__icon c-icon-date"></i></c-input>
  </section>

  <section>
    <c-input placeholder="请输入内容">
      <template slot="append">.com</template>
    </c-input>
  </section>

  <section>
    <c-input type="text" placeholder="请输入内容" v-model="input3" maxlength="10" show-word-limit></c-input>
  </section>
</div>

</template>

<script>
import CInput from '../components/input/input'

export default {
  name:'',
  components: {
    CInput
  },

  data(){
   return {
     input1: '',
     input2: '',
     input3: ''
   }
  }
}
</script>

<style lang="less" scoped>
.demo-input{
  width: 140px;
}
</style>
