import View from './View.js'

class ImgListView extends View {
  constructor (el) {
    super()

    this.init(el)

    this.rollingWrapEl = el.querySelector('#rolling')
    this.rollingEl = el.querySelector('#list')
    this.prevBtnEl = el.querySelector('#prevBtn_list')
    this.nextBtnEl = el.querySelector('#nextBtn_list')

    this.renderView()

    return this
  }

  renderView() {
    this.rollingElWrapWidth = this.rollingWrapEl.offsetWidth;
    this.leftPosition = 0
  }

  render(data = []) {
    if(data.length) {
      this.rollingEl.innerHTML = this.getImgListHtml(data)

      this.setActiveList(0)
      this.bindEvents()
    }

    return this
  }

  getImgListHtml(data) {
    return data.reduce((html, item) => {
      html += `<li class="_idx${item.index}"><a href="#"><span class="select" style=""></span><img width="92" height="60" alt="${item.imgDesc}" src="${item.viewURL}" style=""></a></li>`
      return html
    }, '')
  }

  setImgData(dataLength) {
    // todo : imgCount 데이터 어떻게 선언하는 게 좋을 까..?
    this.imgCount = 10
    this.dataLength = dataLength
    this.totalPage = Math.floor(this.dataLength / this.imgCount)
    this.currentPage = 0

    if (this.dataLength > this.imgCount) {
      this.addOnTag(this.nextBtnEl)
    }
  }

  bindEvents() {
    Array.from(this.rollingEl.querySelectorAll('li')).forEach((li, tagIndex) => {
      li.addEventListener('click', e => this.setActiveList(tagIndex))
    })
    this.prevBtnEl.addEventListener('click', e => this.clickPrevButton(e))
    this.nextBtnEl.addEventListener('click', e => this.clickNextButton(e))
  }

  setActiveList(tagIndex) {
    Array.from(this.rollingEl.querySelectorAll('li')).forEach((li, index) => {
      li.querySelector('.select').style.display = tagIndex === index ? 'block' : ''
    })

    this.emit('@click', { tagIndex })
  }

  clickPrevButton() {
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

  clickNextButton() {
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

  addOnTag(el) {
    el.classList.add('on')
  }

  deleteOnTag(el) {
    el.classList.remove('on')
  }
}

export default ImgListView
