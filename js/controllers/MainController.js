import ImgListView from '../views/ImgListView.js'

import ImageModel from '../models/ImageModel.js'

export default {
  init() {
    ImgListView.setup(document.querySelector('.imgview_lst'))
      .on('@click', e => this.onClickImgList(e.detail.tagIndex))

    this.renderView()
  },
  renderView() {
    this.fetchImgList()
  },
  fetchImgList() {
    ImageModel.list().then(data => {
      ImgListView.render(data.items)
      ImgListView.setImgData(data.items.length)
    })
  },
  onClickImgList (tagIndex) {
    console.log(tagIndex)
  }
}
