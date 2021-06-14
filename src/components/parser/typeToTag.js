import ca from "element-ui/src/locale/lang/ca";

export const jsonToForm = (json) =>  {
  let fields = []
  json.forEach(item => {
    const obj = {
      formKey: item.formKey,
      placeholder: item.placeholder,
      maxlength: item.maxlength,
      isCondition: item.isCondition,
      ['show-word-limit']: true,
      config: {
        label: item.label,
        tag: 'el-input',
        layout: 'colFormItem',
        required: item.required,
        regList: []
      },
      slot: {},
    }
    switch (item.type) {
      case 'textarea':
        obj.config.type = item.type
        break
      case 'number':
        obj.config.type = 'number'
        break
      case 'radio':
      case 'checkbox':
        obj.config.tag = 'el-select'
        obj.multiple = item.type === 'checkbox'
        obj.slot = {
          options: item.options
        }
        break
      case 'score':
        obj.config.tag = 'el-rate'
        obj.maxlength = item.score
        break
    }
    if (item.capital) {
      obj.config.layout = 'colDivItem'
    }
    fields.push(obj)
  })
  console.log(fields)
  return fields
}