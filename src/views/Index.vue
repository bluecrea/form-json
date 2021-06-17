<template>
  <form-process :form-conf="formConf" @submit="submitForm"/>
</template>
<script>
import formProcess from '@/components/process-form/index'

export default {
  components: {
    formProcess
  },
  data() {
    return {
      formConf: {
        fields: [{
          "type": "text",
          "formKey": "text_1",
          "label": "单行输入框",
          "placeholder": "请输入",
          layout: 'inputFormItem',
          "maxlength": 1000,
          "required": false,
          "print": true,
          regList: []
        },{
          "type": "number",
          "formKey": "number_5",
          "label": "数字输入框",
          "placeholder": "请输入数字",
          layout: 'inputFormItem',
          "unit": "",
          "isCondition": true,
          "required": false,
          "print": true,
          regList: []
        },{
          "type": "phone",
          "formKey": "phone_14",
          "label": "电话",
          layout: 'inputFormItem',
          "placeholder": "请输入",
          "required": false,
          "print": true,
          regList: []
        },],
        "formRef": "elForm",
        "formModel": "formData",
        "size": "medium",
        "labelPosition": "top",
        "formRules": "rules",
        disabled: false,
        formBtns: true,
        unFocusedComponentBorder: false
      }
    }
  },
  methods: {
    submitForm(data) {
      console.log('submitForm提交数据：', data)
    },
  }
}
</script>