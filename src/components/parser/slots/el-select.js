export default {
  options(h, conf, key) {
    const list = []
    conf.__slot__.options.forEach(item => {
      list.push(<el-option label={item} value={item} disabled={item.disabled}></el-option>)
    })
    return list
  }
}