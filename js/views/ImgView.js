import View from './View.js'

const ImgView = Object.create(View)

ImgView.setup = function (el) {
  this.init(el)

  this.index = 0
  this.imgWrap = el.querySelector('#img_wrap')
  this.prevBtnEl = el.querySelector('#prevBtn_big')
  this.nextBtnEl = el.querySelector('#nextBtn_big')

  return this
}

// 이미지 그리기
ImgView.render = function (data = []) {
  if(data.length) {
    this.getImgHtml(data)
    this.bindEvents()
  } else if (data.length < 1) {
    this.hide(this.nextBtnEl)
  }

  this.hide(this.prevBtnEl)

  return this
}

// 이미지 데이터 셋팅

ImgView.setImgData = function (dataLength) {
  this.dataLength = dataLength
}

// // 이미지 그리기 (3개만 가져오기)
ImgView.getImgHtml = function (data) {
  this.imgWrap.innerHTML = data.reduce((html, item) => {
    if(item !==0) {
      html += `<li class="_idx${item.index}"><a href="#"><img id="bigImg" src="${item.viewURL}" alt="${item.imgDesc}" width="980" height="654"></a></li>`
    } else {
      html += `<li></li>`
    }

    return html
  }, '<ul style="left: -980px">')
}

// 이벤트 바인드
ImgView.bindEvents = function () {
  this.prevBtnEl.addEventListener('click', e => this.clickPrevButton(e))
  this.nextBtnEl.addEventListener('click', e => this.clickNextButton(e))
}

// 이전 버튼 클릭시, 호출되는 함수
ImgView.clickPrevButton = function (e) {
  if(this.index > 0) {
    const tagIndex = this.index -= 1

    this.show(this.nextBtnEl)
    this.emit('@clickPrev', { tagIndex })
  }

  if(this.index ===  0) {
    this.hide(this.prevBtnEl)
  }
}

// 다음 버튼 클릭시, 호출되는 함수
ImgView.clickNextButton = function (e) {
  if(this.index < this.dataLength - 1 ) {
    const tagIndex = this.index += 1

    this.show(this.prevBtnEl)
    this.emit('@clickNext', { tagIndex })
  }

  if(this.index === this.dataLength -1) {
    this.hide(this.nextBtnEl)
  }
}

// element show 함수
ImgView.show = function (el) {
  el.style.display = 'block'
}

// element hide 함수
ImgView.hide = function (el) {
  el.style.display = 'none'
}

export default ImgView
