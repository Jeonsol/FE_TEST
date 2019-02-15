import View from './View.js'

const ImgListView = Object.create(View)

ImgListView.setup = function (el) {
  this.init(el)

  this.listIndex = 0
  this.rollingWrapEl = el.querySelector('#rolling')
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
    this.getImgListHtml(data)
    ImgListView.setActiveList()
    this.bindEvents()
  }

  return this
}

ImgListView.getImgListHtml = function (data) {
  this.rollingWrapEl.innerHTML = data.reduce((html, item) => {
    if(item !==0) {
      html += `<li class="_idx${item.index} list"><a href="#"><span class="select" style=""></span><img width="92" height="60" alt="${item.imgDesc}" src="${item.viewURL}" style=""></a></li>`
    } else {
      html += `<li></li>`
    }

    return html
  }, '<ul id="list" style="left:-920px">')

  this.rollingEl = this.el.querySelector('#list')
  this.bindImgListEvents()
}

ImgListView.bindImgListEvents = function () {
  Array.from(this.rollingEl.querySelectorAll('li.list')).forEach(li => {
    const tagIndex = li.classList[0].split("x")[1]
    li.addEventListener('click', e => this.setActiveList(tagIndex))
  })
}

// 이미지 데이터 셋팅
ImgListView.setImgData = function (dataLength) {
  // todo : imgCount 데이터 어떻게 선언하는 게 좋을 까..?
  this.imgCount = 10
  this.dataLength = dataLength
  this.totalPage = Math.floor(this.dataLength / this.imgCount)
  this.currentPage = 0

  if (this.dataLength > this.imgCount) {
    this.addOnTag(this.nextBtnEl)
  }
}

// 이벤트 바인드
ImgListView.bindEvents = function () {
  this.prevBtnEl.addEventListener('click', e => this.clickPrevButton(e))
  this.nextBtnEl.addEventListener('click', e => this.clickNextButton(e))
}

// 이미지 리스트 선택 시 강조
ImgListView.setActiveList = function (tagIndex = 1) {
  Array.from(this.rollingEl.querySelectorAll('li.list')).forEach((li) => {
    li.querySelector('.select').style.display = ''
  })

  let selectedLi = this.rollingEl.querySelector(`._idx${tagIndex}`)
  console.log(selectedLi.querySelector('.select'))
  selectedLi.classList.add('tlqkf')
  selectedLi.querySelector('.select').style.display = 'block'
  // console.log(selectedLi)
  this.emit('@click', { tagIndex })
  console.log(this.rollingEl)
}

// 이전 버튼 클릭시, 호출되는 함수
ImgListView.clickPrevButton = function () {
  if(this.listIndex > 0) {
    const listIndex = ( this.listIndex -= 1 ) * this.imgCount

    this.addOnTag(this.nextBtnEl)
    this.emit('@clickPrev', { listIndex })
  }

  if(this.listIndex ===  0) {
    this.deleteOnTag(this.prevBtnEl)
  }
}

// 다음 버튼 클릭시, 호출되는 함수
ImgListView.clickNextButton = function () {
  const maxListIndex = Math.floor((this.dataLength) / this.imgCount)

  if(this.listIndex < maxListIndex) {
    const listIndex = ( this.listIndex += 1 ) * this.imgCount

    this.addOnTag(this.prevBtnEl)
    this.emit('@clickNext', { listIndex })
  }

  if(this.listIndex === maxListIndex) {
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
