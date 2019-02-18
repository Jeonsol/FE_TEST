import json from '../../json/sample.js'

async function fetchImages (firstIndex, length = json.imageCount) {
  let dataSet = []

  if (json.imageCount > 0) {
    for(let i = firstIndex; i < length; i ++) {
      if (json.items[i]) {
        dataSet.push(json.items[i])
      } else {
        dataSet.push(0)
      }
    }
  }
  return dataSet
}

export default fetchImages
