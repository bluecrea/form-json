<template>
  <div class="test-form">
    <parser v-if="formConf.fields.length>0" :form-conf="formConf" @submit="sumbitForm1" />
    <el-button @click="change">
      change
    </el-button>
  </div>
</template>

<script>
import Parser from '@/components/parser'

// 若parser是通过安装npm方式集成到项目中的，使用此行引入
// import Parser from 'form-gen-parser'

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
        "formBtns": false,
        "unFocusedComponentBorder": false
      },
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    const fields = []
    let itemObj
    const typeToTagIndex = this.backData.findIndex(item => {
      if (item.type==='amount'&& item.capital) {
        itemObj = item
      }
      return item.type==='amount'&& item.capital
    })
    if (typeToTagIndex !== -1) {
      this.backData.splice(typeToTagIndex,1,itemObj,{tag: 2, err: 3})
    }
    console.log(this.backData)
    /*this.backData.forEach((item,index) => {
      let Obj = {}
      Obj.maxlength = item.maxlength
      switch (item.type) {
        case 'text':
        case 'number':
        case 'amount':
        case 'idCard':
        case 'phone':
          item.tag = 'el-input'
          break
        case 'textarea':
          item.tag = 'el-textarea'
          break
        case 'radio':
          item.tag = 'el-select'
          Obj.multiple = false
          break
        case 'checkbox':
          item.tag = 'el-select'
          Obj.multiple = true
          break
        case 'date':
          item.tag = 'el-date-picker'
          Obj.format = 'yyyy-MM-dd'
          Obj['value-format'] = 'yyyy-MM-dd'
          break
        case 'score':
          item.tag = 'el-rate'
          Obj.max = item.score
          break
      }
      if (item.type === 'radio'|| item.type === 'checkbox') {
        Obj['__slot__'] = {
          options: item.options
        }
      }
      Obj.__config__ = {
        label: item.label,
        tag: item.tag,
        required: item.required,
        layout: 'colFormItem',
        regList: []
      }
      Obj.formKey = item.formKey
      Obj.placeholder = item.placeholder
      Obj.maxlength = item.maxlength
      Obj['show-word-limit'] = true
      fields.push(Obj)
    })
    this.formConf.fields = fields
    console.log(fields)*/
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