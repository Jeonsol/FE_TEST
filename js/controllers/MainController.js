import ImgListView from '../views/ImgListView.js'
import ImgView from '../views/ImgView.js'

import ImageModel from '../models/ImageModel.js'

class MainController {
  constructor () {
    this.imgModel = null
    this.imgListView = null
    this.imgView = null
    this.dataLength = ''
    this.imageLength = ''
  }

  init() {
    this.imgModel = new ImageModel()
    this.imgListView = new ImgListView(document.querySelector('.imgview_lst'))
      .on('@click', e => this.onClickImgList(e.detail.tagIndex))
    this.imgView = new ImgView(document.querySelector('.view_bigimg.v2'))
      .on('@clickPrev', e => this.onClickPrevImgBtn(e.detail.tagIndex))
      .on('@clickNext', e => this.onClickNextImgBtn(e.detail.tagIndex))

    this.dataLength = this.imgModel.dataLength
    this.imageLength = this.imgModel.imageLength
    this.fetchImgList()
  }

  // 데이터 모델 가져오기
  fetchImgList() {
    this.imgModel.list().then(data => {
      this.imgListView.render(data)
      this.imgListView.setImgData(this.dataLength)
      this.imgView.setImgData(this.dataLength)
    })

    this.imgModel.getImg().then(data => {
      this.imgView.render(data)
    })
  }

  // 이미지 3개 가져오기 (전, 후 이미지 포함)
  getImgList (tagIndex) {
    this.imgModel.getImg(tagIndex).then(data => {
      this.imgView.getImgHtml(data)
    })
  }

  // 이미지 리스트 클릭했을 경우 호출되는 함수
  onClickImgList (tabIndex) {
    this.getImgList(tabIndex)
    this.imgView.index = tabIndex

    if(tabIndex > 0) {
      this.imgView.show(this.imgView.prevBtnEl)
    } else {
      this.imgView.hide(this.imgView.prevBtnEl)
    }

    if(tabIndex < this.dataLength - 1) {
      this.imgView.show(this.imgView.nextBtnEl)
    } else {
      this.imgView.hide(this.imgView.nextBtnEl)
    }
  }

  // 이미지의 이전 버튼 클릭했을 경우 호출되는 함수
  onClickPrevImgBtn (tabIndex) {
    if (this.imgView.index % (this.imageLength) === 9) {
      this.imgListView.clickPrevButton()
    }

    this.getImgList(tabIndex)
    this.imgListView.setActiveList(tabIndex)
  }

  // 이미지의 이후 버튼 클릭했을 경우 호출되는 함수
  onClickNextImgBtn (tabIndex) {
    if (this.imgView.index % (this.imageLength) === 0) {
      this.imgListView.clickNextButton()
    }

    this.getImgList(tabIndex)
    this.imgListView.setActiveList(tabIndex)
  }
}

export default MainController
