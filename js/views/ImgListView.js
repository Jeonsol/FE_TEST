import View from './View.js'

const ImgListView = Object.create(View)

ImgListView.setup = function (el) {
  this.init(el)

  this.rollingWrapEl = el.querySelector('#rolling')
  this.rollingEl = el.querySelector('#list')
  this.prevBtnEl = el.querySelector('#prevBtn_list')
  this.nextBtnEl = el.querySelector('#nextBtn_list')

  ImgListView.renderView()

  return this
}

// 940 대응 - 다시 그려져야 할 것들
ImgListView.renderView = function () {
  this.rollingElWrapWidth = this.rollingWrapEl.offsetWidth;
  this.leftPosition = 0
}

// 이미지 리스트 그리기
ImgListView.render = function (data = []) {
  if(data.length) {
    this.rollingEl.innerHTML = this.getImgListHtml(data)

    ImgListView.setActiveList(0)
    this.bindEvents()
  }
  return this
}

ImgListView.getImgListHtml = function (data) {
  return data.reduce((html, item) => {
    html += `<li class="_idx${item.index}"><a href="#"><span class="select" style=""></span><img width="92" height="60" alt="${item.imgDesc}" src="${item.viewURL}" style=""></a></li>`
    return html
  }, '')
}

// 이미지 데이터 셋팅
ImgListView.setImgData = function (dataLength) {
  // todo : 이런 데이터 어떻게 선언하는 게 좋을 까..? ㅠㅠ
  this.imgCount = 10
  this.dataLength = dataLength
  this.totalPage = Math.floor(dataLength / this.imgCount)
  this.currentPage = 0

  if (this.dataLength > this.imgCount) {
    this.addOnTag(this.nextBtnEl)
  }
}

// 이벤트 바인드
ImgListView.bindEvents = function () {
  Array.from(this.rollingEl.querySelectorAll('li')).forEach((li, tagIndex) => {
    li.addEventListener('click', e => this.setActiveList(tagIndex))
  })
  this.prevBtnEl.addEventListener('click', e => this.clickPrevButton(e))
  this.nextBtnEl.addEventListener('click', e => this.clickNextButton(e))
}

ImgListView.setActiveList = function (tagIndex) {
  Array.from(this.rollingEl.querySelectorAll('li')).forEach((li, index) => {
    li.querySelector('.select').style.display = tagIndex === index ? 'block' : ''
  })

  this.emit('@click', { tagIndex })
}

// 이전 버튼 클릭시, 호출되는 함수
ImgListView.clickPrevButton = function () {
  if(this.currentPage >= 1) {
    this.leftPosition += this.rollingElWrapWidth
    this.rollingEl.style.left = `${this.leftPosition.toString()}px`
    this.currentPage --

    this.setActiveList(this.currentPage*this.imgCount)
    this.addOnTag(this.nextBtnEl)
  }
  if(this.currentPage === 0) {
    this.deleteOnTag(this.prevBtnEl)
  }
}

// 다음 버튼 클릭시, 호출되는 함수
ImgListView.clickNextButton = function () {
  if(this.totalPage > this.currentPage) {
    this.leftPosition -= this.rollingElWrapWidth
    this.rollingEl.style.left = `${this.leftPosition.toString()}px`
    this.currentPage ++

    this.setActiveList(this.currentPage*this.imgCount)
    this.addOnTag(this.prevBtnEl)
  }
  if(this.currentPage === this.totalPage) {
    this.deleteOnTag(this.nextBtnEl)
  }
}

// 클래스 추가 함수
ImgListView.addOnTag = function (el) {
  el.classList.add('on')
}

// 클래스 제거 함수
ImgListView.deleteOnTag = function (el) {
  el.classList.remove('on')
}

export default ImgListView
