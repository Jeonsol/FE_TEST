import ImgListView from '../views/ImgListView.js'
import ImgView from '../views/ImgView.js'

import ImageModel from '../models/ImageModel.js'

export default {
  init() {
    ImgListView.setup(document.querySelector('.imgview_lst'))
      .on('@click', e => this.onClickImgList(e.detail.tagIndex))
      .on('@clickPrev', e => this.onClickPrevImgListBtn(e.detail.listIndex))
      .on('@clickNext', e => this.onClickNextImgListBtn(e.detail.listIndex))

    ImgView.setup(document.querySelector('.view_bigimg.v2'))
      .on('@clickPrev', e => this.onClickPrevImgBtn(e.detail.tagIndex))
      .on('@clickNext', e => this.onClickNextImgBtn(e.detail.tagIndex))

    this.renderView()
  },

  renderView() {
    const imageCount = ImageModel.data.imageCount

    ImgListView.setImgData(imageCount)
    ImgView.setImgData(imageCount)
    this.fetchImgList()
  },

  // 데이터 모델 가져오기
  fetchImgList() {
    ImageModel.getImgList().then(data => {
      ImgListView.render(data)
    })
    ImageModel.getImg().then(data => {
      ImgView.render(data)
    })
  },

  getImgList (listIndex) {
    // ImageModel.getImgList(listIndex).then(data => {
    //   ImgListView.getImgListHtml(data, listIndex)
    // })
    // ImgListView.setActiveList(listIndex)
    ImageModel.getImgList(listIndex).then(data => {
      ImgListView.wrapper(data, listIndex)
    })
    // ImgListView.setActiveList(listIndex)
  },

  // 이미지 3개 가져오기 (전, 후 이미지 포함)
  getImg (tagIndex) {
    ImageModel.getImg(tagIndex).then(data => {
      ImgView.getImgHtml(data)
    })
  },

  // 이미지 리스트 클릭했을 경우 호출되는 함수
  onClickImgList (tabIndex) {
    this.getImg(tabIndex)
    ImgView.index = tabIndex

    if(tabIndex > 0) {
      ImgView.show(ImgView.prevBtnEl)
    } else {
      ImgView.hide(ImgView.prevBtnEl)
    }

    if(tabIndex < this.dataLength - 1) {
      ImgView.show(ImgView.nextBtnEl)
    } else {
      ImgView.hide(ImgView.nextBtnEl)
    }
  },

  onClickPrevImgListBtn (listIndex) {
    this.getImgList(listIndex)
  },

  onClickNextImgListBtn (listIndex) {
    this.getImgList(listIndex)
  },

  // 이미지의 이전 버튼 클릭했을 경우 호출되는 함수
  onClickPrevImgBtn (tabIndex) {
    if (ImgView.index % (ImgListView.imgCount) === 9) {
      ImgListView.clickPrevButton()
    }

    this.getImg(tabIndex)
  },

  // 이미지의 이후 버튼 클릭했을 경우 호출되는 함수
  onClickNextImgBtn (tabIndex) {
    if (ImgView.index % (ImgListView.imgCount) === 0) {
      ImgListView.clickNextButton()
    }

    this.getImg(tabIndex)
    ImgListView.setActiveList(tabIndex)
  }
}
