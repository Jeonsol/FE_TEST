import fetchImages from '../api/fetchImages.js'

class ImageModel {
  async list() {
    return await fetchImages(0)
  }

  async getImg(index = 0) {
    return await (fetchImages(index-1, index+2))
  }
}

export default ImageModel
