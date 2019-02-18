import View from './View.js'

class ImgView extends View {
  constructor (el) {
    super()
    this.init(el)

    this.rollingEl = el.querySelector('#img_rolling')
    this.prevBtnEl = el.querySelector('#prevBtn_big')
    this.nextBtnEl = el.querySelector('#nextBtn_big')
    this.index = 0


    return this
  }

  setUp(data = []) {
    if(data.length) {
      this.render(data)
      this.bindEvents()
    }

    return this
  }

  setImgData (dataLength) {
    this.dataLength = dataLength

    if(this.dataLength < 1) {
      this.hide(this.nextBtnEl)
    }

    this.hide(this.prevBtnEl)
  }

  render(data) {
    this.rollingEl.innerHTML = data.reduce((html, item) => {
      if(item !==0) {
        html += `<li class="_idx${item.index}"><a href="#"><img id="bigImg" src="${item.viewURL}" alt="${item.imgDesc}" width="980" height="654"></a></li>`
      } else {
        html += `<li></li>`
      }

      return html
    }, '')
  }

  bindEvents() {
    this.prevBtnEl.addEventListener('click', e => this.clickPrevButton(e))
    this.nextBtnEl.addEventListener('click', e => this.clickNextButton(e))
  }

  clickPrevButton() {
    if(this.index > 0) {
      const tagIndex = this.index -= 1

      this.show(this.nextBtnEl)
      this.emit('@clickPrev', { tagIndex })
    }

    if(this.index ===  0) {
      this.hide(this.prevBtnEl)
    }
  }

  clickNextButton() {
    if(this.index < this.dataLength - 1 ) {
      const tagIndex = this.index += 1

      this.show(this.prevBtnEl)
      this.emit('@clickNext', { tagIndex })
    }

    if(this.index === this.dataLength -1) {
      this.hide(this.nextBtnEl)
    }
  }

  show(el) {
    el.style.display = 'block'
  }

  hide(el) {
    el.style.display = 'none'
  }
}

export default ImgView
