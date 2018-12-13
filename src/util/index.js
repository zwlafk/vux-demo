/**
 *
 * @param {Array[]} dataSource
 * @param {Array[]} dataMapper
 * @return {Object}
 */

export function dataListGenerator(dataSource, dataMapper) {
  let dataKeys = Object.keys(dataMapper);
  return dataKeys
    .filter(key => dataSource[key])
    .map(key => ({
      // key: dataMapper[key],

      /**
       * todo ,大概率会包含一些需要翻译的字段，暂时保留key到组件内做翻译工作
       */

      key: key,
      value: dataSource[key]
    }));
}


/**
 * deepFlattenTree
 * 展开树节点（树形结构要一次性全部展示）
 * @param {Array[]} tree
 * @param {String} childName
 * @return {Array[]}
 */
export const deepFlattenTree = (tree, childName = "childList", childrenOnly = false) => {
  // concat feature : [].concat(1,2,3,[4,5])=>[1,2,3,4,5]
  if (childrenOnly) {
    return [].concat(
      ...tree.map(node => node[childName] ? deepFlattenTree(node[childName], childName, childrenOnly) : node)
    );
  }
  return [].concat(
    ...tree.map(node => node[childName] ? [node].concat(deepFlattenTree(node[childName], childName, childrenOnly)) : node)
  );
}

/**
 * getDefaultOption
 * 获取选项列表中isDefault=1的值
 * @param {Array[]}
 * @return {}
 */
export function getDefaultOption(list, keyName = "optionlistId") {
  let target = list.find(e => e.isDefault) || {}
  return target[keyName] || ''
}

export function formatSeconds(times) {
  var result = '00:00:00';
  var hour, minute, second
  if (times > 0) {
    hour = Math.floor(times / 3600);
    if (hour < 10) {
      hour = "0" + hour;
    }
    minute = Math.floor((times - 3600 * hour) / 60);
    if (minute < 10) {
      minute = "0" + minute;
    }

    second = Math.floor((times - 3600 * hour - 60 * minute) % 60);
    if (second < 10) {
      second = "0" + second;
    }
    result = hour + ':' + minute + ':' + second;
  }
  return result;
}
