<script>
import processInput from './process-input'
import { deepClone } from './deepClone'

const ruleTrigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change'
}

const layouts = {
  inputFormItem(h, scheme) {
    const isCondition = scheme.isCondition
    const isPrep = scheme.type === 'phone'
    return (
        <process-input
            prop={scheme.formKey}
            labelName={scheme.label}
            v-model={this[this.formConf.formModel][scheme.formKey]}
            type={scheme.type}
            isCondition={isCondition}>
          {isPrep ? <template slot="prepend">+86</template> : ''}
        </process-input>
    )
  }
}

function renderFrom(h) {
  const { formConfCopy } = this

  return (
      <el-form
          size={formConfCopy.size}
          label-position={formConfCopy.labelPosition}
          disabled={formConfCopy.disabled}
          ref={formConfCopy.formRef}
          props={{ model: this[formConfCopy.formModel] }}
          rules={this[formConfCopy.formRules]}
      >
        {renderFormItem.call(this, h, formConfCopy.fields)}
        {formConfCopy.formBtns && formButtons.call(this, h)}
      </el-form>
  )
}

function formButtons(h) {
  return <el-form-item size="large">
    <el-button type="primary" onClick={this.submitForm}>提交</el-button>
    <el-button onClick={this.resetForm}>重置</el-button>
  </el-form-item>
}

function renderFormItem(h, elementList) {
  return elementList.map(scheme => {
    const config = scheme
    const layout = layouts[config.layout]

    if (layout) {
      return layout.call(this, h, scheme)
    }
    throw new Error(`没有与${config.layout}匹配的layout`)
  })
}

export default {
  name: "formProcess",
  components: {
    processInput
  },
  props: {
    formConf: {
      type: Object,
      required: true
    }
  },
  data() {
    const data = {
      formConfCopy: deepClone(this.formConf),
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {}
    }
    this.initFormData(data.formConfCopy.fields, data[this.formConf.formModel])
    this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules])
    return data
  },
  methods: {
    initFormData(componentList, formData) {
      componentList.forEach(cur => {
        const config = cur
        if (cur.formKey) formData[cur.formKey] = config.defaultValue
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    buildRules(componentList, rules) {
      componentList.forEach(cur => {
        const config = cur
        const obj = {
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入内容'));
            } else {
              callback();
            }
          },
          required: config.required,
          message: cur.placeholder
        }
        if (Array.isArray(config.defaultValue)) {
          required.type = 'array'
          required.message = `请至少选择一个${config.label}`
        }
        config.regList.push(obj)
        rules[cur.formKey] = config.regList.map(item => {
          item.pattern && (item.pattern = eval(item.pattern))
          item.trigger = ruleTrigger && ruleTrigger[config.tag]
          return item
        })
        if (config.children) this.buildRules(config.children, rules)
      })
    },
    resetForm() {
      this.formConfCopy = deepClone(this.formConf)
      this.$refs[this.formConf.formRef].resetFields()
    },
    submitForm() {
      this.$refs[this.formConf.formRef].validate(valid => {
        if (!valid) return false
        this.$emit('submit', this[this.formConf.formModel])
        return true
      })
    }
  },
  render(h) {
    return renderFrom.call(this, h)
  }
}
</script>