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
 * 展开树节点（资源分组要一次性全部展示）
 * @param {Array[]} tree
 * @param {String} childName
 * @return {Array[]}
 */
export function deepFlattenTree(tree, childName = "childList") {
  // concat feature : [].concat(1,2,3,[4,5])=>[1,2,3,4,5]
  return [].concat(
    ...tree.map(node => node[childName] ? [node].concat(deepFlattenTree(node[childName])) : node)
  );
}
