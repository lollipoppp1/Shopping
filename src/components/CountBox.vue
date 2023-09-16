<template>
  <div class="count-box">
    <button @click="handleSub" class="minus">-</button>
    <input :value="value" @change="handleCha" class="inp" type="text" name="" id="">
    <button @click="handleAdd" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 减
    handleSub () {
      if (this.value <= 1) return
      this.$emit('input', this.value - 1)
    },
    // 加
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    // 更改数字
    handleCha (e) {
      const num = +e.target.value // 转数字处理
      // 输入不合法的文本/负值，恢复原值
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
}
.inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
}
}
</style>
