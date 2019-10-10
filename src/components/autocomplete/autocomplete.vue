<template>
  <!-- 基于c-input创建的高级组件 -->

  <div
    class="c-autocomplete"
    role="combobox"

  >
    <c-input
      ref="input"
      v-bind="[$props, $attrs]"
      @input="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
    >
      <!-- 透传插槽 -->
      <template slot="prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append" v-if="$slots.append">
        <slot name="append"></slot>
      </template>
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix" v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </template>
    </c-input>
  </div>
</template>

<script>
import CInput from '../input/input'

export default {
  name: 'CAutocomplete',
  componentName: 'CAutocomplete',

  components: {
    CInput
  },

  data(){
   return {

   }
  }
}
</script>

<style lang="less" scoped>

</style>
