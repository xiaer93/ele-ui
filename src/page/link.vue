<template>
  <div>
    <c-link href="https://element.eleme.io" target="_blank">默认链接</c-link>
    <c-link type="primary">主要链接</c-link>
    <c-link type="success" disabled>成功链接</c-link>
    <c-link type="warning" :underline="false">警告链接</c-link>
    <c-link type="danger">危险链接</c-link>
    <c-link type="info">信息链接</c-link>
  </div>
</template>

<script>
import CLink from '../components/link/link'

export default {
    components: {
        CLink
    }
}
</script>

<style>

</style>