<template>
  <div>
    <c-row>
  <c-button @click="handleClick">默认按钮</c-button>
  <c-button type="primary">主要按钮</c-button>
  <c-button type="success">成功按钮</c-button>
  <c-button type="info">信息按钮</c-button>
  <c-button type="warning">警告按钮</c-button>
  <c-button type="danger">危险按钮</c-button>
</c-row>

<c-row>
  <c-button plain>朴素按钮</c-button>
  <c-button type="primary" plain>主要按钮</c-button>
  <c-button type="success" plain>成功按钮</c-button>
  <c-button type="info" plain>信息按钮</c-button>
  <c-button type="warning" plain>警告按钮</c-button>
  <c-button type="danger" plain>危险按钮</c-button>
</c-row>

<c-row>
  <c-button round>圆角按钮</c-button>
  <c-button type="primary" round>主要按钮</c-button>
  <c-button type="success" round>成功按钮</c-button>
  <c-button type="info" round>信息按钮</c-button>
  <c-button type="warning" round>警告按钮</c-button>
  <c-button type="danger" round>危险按钮</c-button>
</c-row>

<c-row>
  <c-button icon="el-icon-search" circle></c-button>
  <c-button type="primary" icon="el-icon-edit" circle></c-button>
  <c-button type="success" icon="el-icon-check" circle></c-button>
  <c-button type="info" icon="el-icon-message" circle></c-button>
  <c-button type="warning" icon="el-icon-star-off" circle></c-button>
  <c-button type="danger" icon="el-icon-delete" circle></c-button>
</c-row>

<c-row>
  <c-button type="primary" disabled>主要按钮</c-button>
  <c-button type="text">文字按钮</c-button>
</c-row>

<c-row>
    <c-button-group>
        <c-button type="primary" icon="el-icon-arrow-left">上一页</c-button>
        <c-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></c-button>
    </c-button-group>
</c-row>
  </div>
</template>

<script>
import CButtonGroup from '../components/button/button-group'
import CButton from '../components/button/button'
import CRow from '../components/layout/row'

export default {
    components: {
        CButtonGroup,
        CButton,
        CRow
    },

    methods: {
      handleClick (ev) {
        console.log(ev)
      }
    }
}
</script>

<style scoped>
    .c-row{
        margin-bottom: 20px;
    }
</style>