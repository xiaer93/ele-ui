<template>
  <div>
    <section>
      <c-radio v-model="radio" label="1">备选项</c-radio>
      <c-radio v-model="radio" label="2">备选项</c-radio>
      <c-radio v-model="radio" label="3" disabled >禁选项</c-radio>
    </section>
    <section>
      <c-radio-group v-model="radio2">
        <c-radio label="1">备选项</c-radio>
        <c-radio label="2">备选项</c-radio>
        <c-radio label="3" disabled >禁选项</c-radio>
      </c-radio-group>
    </section>
    <section>
      <c-radio v-model="radio3" label="1" border>备选项1</c-radio>
      <c-radio v-model="radio3" label="2" border>备选项2</c-radio>
       <c-radio v-model="radio3" label="3" disabled border>备选项2</c-radio>
    </section>
  </div>
</template>

<script>
import CRadio from '../components/radio/radio'
import CRadioGroup from '../components/radio/radio-group'

export default {
  components: {
    CRadio,
    CRadioGroup
  },

  data () {
    return {
      radio: '1',
      radio2: '3',
      radio3: '1'
    }
  }
}
</script>

<style>

</style>