<script>
import { smallToBig } from "@/components/SmallToBig";

const selectInputType = [
  'input',
  'text',
  'number',
  'password',
  'email',
  'textarea'
]

const slotContent = {
  name: 'slotContent',
  functional: true,
  props: {
    render: {
      type: Function,
      require: true
    },
    data: Object
  },
  render: (h, ctx) => {
    return ctx.props.render(h, ctx.props.data)
  }
}

function inputSlot(h, $scopedSlots) {
  return Object.keys($scopedSlots).map(slotName => {
    return h(slotContent, {
      props: {
        render: $scopedSlots[slotName]
      },
      slot: slotName,
      key: slotName
    })
  })
}

export default {
  name: 'processInput',
  inheritAttrs: false,
  props: {
    type: {
      default: 'text',
      validator: typeVal => {
        switch (typeVal) {
          case 'amount':
            typeVal = 'number'
            break
        }
        return selectInputType.includes(typeVal)
      }
    },
    value: {
      type: [String, Number],
      default: ''
    },
    isCondition: {
      type: Boolean,
      default: false
    },
    labelName: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  computed: {
    newValue: {
      get({ value }) {
        return value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onInputHandle(val) {
      this.newValue = val
    }
  },
  render(h) {
    const {onInputHandle, $scopedSlots, $attrs} = this
    let inputSlotSlotsVNode = []
    if (Object.keys($scopedSlots).length) {
      inputSlotSlotsVNode = inputSlot(h,$scopedSlots)
    }
    return (
        <div>
          <el-form-item label={this.labelName} prop={this.prop}>
            <el-input type={this.type} value={this.newValue} on-input={onInputHandle} ref={$attrs['ref-name']}>
              {inputSlotSlotsVNode}
            </el-input>
          </el-form-item>
          { this.isCondition ? <p>大写：{smallToBig(this.newValue)}</p> : '' }
        </div>
    )
  }
}
</script>