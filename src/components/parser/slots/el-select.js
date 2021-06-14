export default {
  options(h, conf, key) {
    const list = []
    conf.slot.options.forEach(item => {
      list.push(<el-option label={item} value={item} disabled={item.disabled}></el-option>)
    })
    return list
  }
}