<template>
  <div class="test-form">
    <parser v-if="formConf.fields.length>0" :form-conf="formConf" @submit="sumbitForm1" />
  </div>
</template>

<script>
import Parser from '@/components/parser'
import { jsonToForm } from '@/components/parser/typeToTag'

export default {
  components: {
    Parser
  },
  props: {},
  data() {
    return {
      key: +new Date(),
      backData: [{
        "type": "text",
        "formKey": "text_1",
        "label": "单行输入框",
        "placeholder": "请输入",
        "maxlength": 1000,
        "required": false,
        "print": true
      },{
        "type": "number",
        "formKey": "number_5",
        "label": "数字输入框",
        "placeholder": "请输入数字",
        "unit": "",
        "isCondition": true,
        "required": false,
        "print": true
      },{
        "type": "radio",
        "formKey": "radio_6",
        "label": "单选框",
        "placeholder": "请选择",
        "options": [
          "选项1",
          "选项2",
          "选项3"
        ],
        "associated": {},
        "isCondition": true,
        "required": false,
        "print": true
      },{
        "type": "checkbox",
        "formKey": "checkbox_7",
        "label": "多选框",
        "placeholder": "请选择",
        "options": [
          "选项1",
          "选项2",
          "选项3"
        ],
        "associated": {},
        "isCondition": true,
        "required": false,
        "print": true
      },{
        "type": "amount",
        "formKey": "amount_12",
        "label": "金额（元）",
        "placeholder": "请输入金额",
        "required": false,
        "capital": true,
        "isCondition": true,
        "print": true
      },{
        "type": "amount",
        "formKey": "amount_11",
        "label": "金额（元）",
        "placeholder": "请输入金额",
        "required": false,
        "capital": true,
        "isCondition": true,
        "print": true
      },{
        "type": "date",
        "formKey": "date_3",
        "label": "日期",
        "dateType": "YYYY-MM-DD",
        "required": false,
        "print": true
      }],
      formConf: {
        fields: [],
        "formRef": "elForm",
        "formModel": "formData",
        "size": "medium",
        "labelPosition": "top",
        "formRules": "rules",
        "disabled": false,
        "formBtns": true,
        "unFocusedComponentBorder": false
      },
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.formConf.fields = jsonToForm(this.backData)
    // 表单数据回填，模拟异步请求场景
    setTimeout(() => {
      // 请求回来的表单数据
      const data = {
        mobile: ''
      }
      // 回填数据
      this.fillFormData(this.formConf, data)
      // 更新表单
      this.key2 = +new Date()
    }, 2000)
  },
  methods: {
    fillFormData(form, data) {
      form.fields.forEach(item => {
        const val = data[item.formKey]
        if (val) {
          item.__config__.defaultValue = val
        }
      })
    },
    findAddForm(formList, type) {
      return formList.findIndex(item => item.type === type)
    },
    change() {
      const t = this.formConf
      this.formConf = this.formConf2
      this.formConf2 = t
    },
    sumbitForm1(data) {
      console.log('sumbitForm1提交数据：', data)
    },
  }
}
</script>

<style lang="scss" scoped>
.test-form {
  margin: 15px auto;
  width: 800px;
  padding: 15px;
}
</style>