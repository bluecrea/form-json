export default {
  options(h, conf, key) {
    const list = []
    conf.slot.options.forEach(item => {
      if (conf.slot.optionType === 'button') {
        list.push(<el-checkbox-button label={item.value}>{item.label}</el-checkbox-button>)
      } else {
        list.push(<el-checkbox label={item.value} border={conf.border}>{item.label}</el-checkbox>)
      }
    })
    return list
  }
}