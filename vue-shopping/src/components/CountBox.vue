<template>
  <div>
    <div class="count-box">
      <div @click="handleSub" class="minus">-</div>
      <input :value="value" @change="handleChange" class="inp" type="text">
      <div @click="handleAdd" class="add">+</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) {
        return
      }
      // 参数： (父组件的方法，需要的参数)
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      // 时间处理对象 e
      // console.log(e.target.value)  //得到的是字符串
      const num = +e.target.value // 转数字处理 ：（1）数字 （2）NaN

      if (isNaN(num) || num < 0) {
        // 输入了不合法的值 或者 输入了负值 ，回退成原来的值
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
  .minus, .add {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    line-height: 30px;
    text-align: center;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    border: none;
    outline: none;
    text-align: center;
    margin: 0 5px;
    background-color: #efefef;
  }
}

</style>
