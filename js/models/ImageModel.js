import json from '../../json/sample.js'

class ImageModel {
  constructor() {
    this.dataLength = json.items.length
    this.imageListLength = 10
  }
  async fetchImages (firstIndex, length) {
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

  async getImgList(index = 0) {
    return await (this.fetchImages(index - this.imageListLength, index + this.imageListLength*2))
  }

  async getImg(index = 0) {
    return await (this.fetchImages(index-1, index+2))
  }
}

export default ImageModel
