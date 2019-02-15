import ImgListView from '../views/ImgListView.js'
import ImgView from '../views/ImgView.js'

import ImageModel from '../models/ImageModel.js'

export default {
  init() {
    ImgListView.setup(document.querySelector('.imgview_lst'))
      .on('@click', e => this.onClickImgList(e.detail.tagIndex))

    ImgView.setup(document.querySelector('.view_bigimg.v2'))
      .on('@clickPrev', e => this.onClickPrevImgBtn(e.detail.tagIndex))
      .on('@clickNext', e => this.onClickNextImgBtn(e.detail.tagIndex))

    this.fetchImgList()
  },

  // 데이터 모델 가져오기
  fetchImgList() {
    ImageModel.list().then(data => {
      this.dataLength = data.items.length

      ImgListView.render(data.items)
      ImgListView.setImgData(this.dataLength)
      ImgView.setImgData(this.dataLength)
    })

    ImageModel.getImg().then(data => {
      ImgView.render(data)
    })
  },

  // 이미지 3개 가져오기 (전, 후 이미지 포함)
  getImgList (tagIndex) {
    ImageModel.getImg(tagIndex).then(data => {
      ImgView.getImgHtml(data)
    })
  },

  // 이미지 리스트 클릭했을 경우 호출되는 함수
  onClickImgList (tabIndex) {
    this.getImgList(tabIndex)
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

  // 이미지의 이전 버튼 클릭했을 경우 호출되는 함수
  onClickPrevImgBtn (tabIndex) {
    if (ImgView.index % (ImgListView.imgCount) === 9) {
      ImgListView.clickPrevButton()
    }

    this.getImgList(tabIndex)
    ImgListView.setActiveList(tabIndex)
  },

  // 이미지의 이후 버튼 클릭했을 경우 호출되는 함수
  onClickNextImgBtn (tabIndex) {
    if (ImgView.index % (ImgListView.imgCount) === 0) {
      ImgListView.clickNextButton()
    }

    this.getImgList(tabIndex)
    ImgListView.setActiveList(tabIndex)
  }
}
