<template>
  <div>
    <section>
      <c-checkbox  v-model="model1">备选项1</c-checkbox>
    </section>

    <section>
      <c-checkbox v-model="model2" disabled>备选项1</c-checkbox>
      <c-checkbox v-model="model3" disabled>备选项1</c-checkbox>
    </section>

    <section>
      <p>自定义trueLabel/falseLabel: {{model4}}</p>
      <c-checkbox v-model="model4" true-label="yes" false-label="no">备选项1</c-checkbox>
    </section>

    <section>
      <c-checkbox-group v-model="checkList" @change="handleLog">
        <c-checkbox label="复选框 A"></c-checkbox>
        <c-checkbox label="复选框 B"></c-checkbox>
        <c-checkbox label="复选框 C"></c-checkbox>
        <c-checkbox label="禁用" disabled></c-checkbox>
        <c-checkbox label="选中且禁用" disabled></c-checkbox>
      </c-checkbox-group>
    </section>

    <section>
        <c-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</c-checkbox>
      <div style="margin: 15px 0;"></div>
      <c-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <c-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</c-checkbox>
      </c-checkbox-group>
    </section>

    <section>
      <c-checkbox border>备选项1</c-checkbox>
    </section>


  </div>
</template>

<script>
import CCheckbox from '../components/checkbox/checkbox'
import CCheckboxGroup from '../components/checkbox/checkbox-group'

export default {
  components: {
    CCheckbox,
    CCheckboxGroup
  },

  data() {
    return {
      model1: false,
      model2: false,
      model3: true,
      model4: 'yes',
      checkList: ['选中且禁用','复选框 A'],

      isIndeterminate: false,
      checkAll: false,
      checkedCities: [],
      cities: ['武汉', '广州', '北京']
    }
  },

  methods: {
    handleLog (v) {
      console.log(this.checkList)
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}
</script>

<style>

</style>