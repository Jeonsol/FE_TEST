import ImgListView from '../views/ImgListView.js'
import ImgView from '../views/ImgView.js'

import ImageModel from '../models/ImageModel.js'

class MainController {
  constructor () {
    this.imgModel = null
    this.imgListView = null
    this.imgView = null

    this.dataLength = 0
    this.imageListLength = 0
  }

  init() {
    this.imgModel = new ImageModel()
    this.imgListView = new ImgListView(document.querySelector('.imgview_lst'))
      .on('@click', e => this.onClickImgList(e.detail.tagIndex))
      .on('@clickListBtn', e => this.onClickListBtn(e.detail.listIndex))
    this.imgView = new ImgView(document.querySelector('.view_bigimg.v2'))
      .on('@clickPrev', e => this.onClickPrevImgBtn(e.detail.tagIndex))
      .on('@clickNext', e => this.onClickNextImgBtn(e.detail.tagIndex))

    this.imageListLength = this.imgModel.imageListLength
    this.dataLength = this.imgModel.dataLength

    this.setUp()
  }

  // 처음 화면 render & data Setting
  setUp() {
    this.imgListView.setImgData(this.dataLength, this.imageListLength)
    this.imgView.setImgData(this.dataLength)

    this.imgModel.getImgList().then(data => {
      this.imgListView.setUp(data)
    })

    this.imgModel.getImg().then(data => {
      this.imgView.setUp(data)
    })
  }

  // 이미지리스트 30개 가져오기 (전, 후 이미지 포함)
  getImgList (listIndex, tagIndex) {
    this.imgModel.getImgList(listIndex).then(data => {
      this.imgListView.render(data, tagIndex)
    })
  }

  // 이미지 3개 가져오기 (전, 후 이미지 포함)
  getImg (tagIndex) {
    this.imgModel.getImg(tagIndex).then(data => {
      this.imgView.render(data)
    })
  }

  // 이미지 리스트 클릭했을 경우 호출되는 함수
  onClickImgList (tabIndex) {
    this.getImg(tabIndex)
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

  onClickListBtn (listIndex) {
    this.getImgList (listIndex)
  }

  // 이미지의 이전 버튼 클릭했을 경우 호출되는 함수
  onClickPrevImgBtn (tabIndex) {
    if (this.imgView.index % (this.imageListLength) === this.imageListLength) {
      this.imgListView.listIndex -= this.imageListLength
      this.getImgList(this.imgListView.listIndex, tabIndex % this.imageListLength)
    }

    this.getImg(tabIndex)
    this.imgListView.setActiveList(tabIndex % this.imageListLength)
  }

  // 이미지의 이후 버튼 클릭했을 경우 호출되는 함수
  onClickNextImgBtn (tabIndex) {
    if (this.imgView.index % (this.imageListLength) === 0) {
      this.imgListView.listIndex += this.imageListLength
      this.getImgList(this.imgListView.listIndex, tabIndex % this.imageListLength)
    }
    this.getImg(tabIndex)
    this.imgListView.setActiveList(tabIndex % this.imageListLength)
  }
}

export default MainController
