import View from './View.js'

class ImgListView extends View {
  constructor (el) {
    super()
    this.init(el)

    this.rollingEl = el.querySelector('#img_list_rolling')
    this.prevBtnEl = el.querySelector('#prevBtn_list')
    this.nextBtnEl = el.querySelector('#nextBtn_list')
    this.imagesLength = 0
    this.images = []
    this.listIndex = 0
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

  setImgData(dataLength, imagesLength) {
    this.imagesLength = imagesLength
    this.dataLength = dataLength

    if (this.dataLength > this.imagesLength) {
      this.addOnTag(this.nextBtnEl)
    }
  }

  render(data, tagIndex = 0) {
    this.rollingEl.innerHTML =  data.reduce((html, item) => {
      if(item !== 0) {
        html += `<li class="_idx${item.index} list"><a href="#"><span class="select" style=""></span><img width="92" height="60" alt="${item.imgDesc}" src="${item.viewURL}" style=""></a></li>`
      } else {
        html += `<li></li>`
      }
      return html
    }, '')

    this.images = this.getCurrentImagesList()
    this.bindListEvent()
    this.setActiveList(tagIndex)
  }

  bindEvents() {
    this.prevBtnEl.addEventListener('click', e => this.clickPrevButton(e))
    this.nextBtnEl.addEventListener('click', e => this.clickNextButton(e))
  }

  bindListEvent() {
    this.images.forEach((li, index) => {
      li.addEventListener('click', e => this.setActiveList(index))
    })
  }

  getCurrentImagesList() {
    const itemList = Array.from(this.rollingEl.querySelectorAll('li'))
    const ImageSet = []
    for(let i = this.imagesLength; i < this.imagesLength*2; i++) {
      if(itemList[i].className) {
        ImageSet.push(itemList[i])
      } else {
        itemList[i].style.background = 'none'
        ImageSet.push(itemList[i])
      }
    }
    return ImageSet
  }

  setActiveList(tagIndex) {
    this.images.forEach((li, index) => {
      if(li.className) {
        li.querySelector('.select').style.display = tagIndex === index ? 'block' : ''
      }
    })

    this.index = this.listIndex + tagIndex

    this.emit('@click', { tagIndex: this.index })
  }

  clickPrevButton() {
    if(this.listIndex > 0) {
      this.listIndex -= this.imagesLength
      const listIndex = this.listIndex

      this.addOnTag(this.nextBtnEl)
      this.emit('@clickListBtn', { listIndex })
    }

    if(this.listIndex === 0) {
      this.deleteOnTag(this.prevBtnEl)
    }
  }

  clickNextButton() {
    const maxListIndex = this.dataLength - (this.dataLength % this.imagesLength)

    if (this.listIndex < maxListIndex) {
      this.listIndex += this.imagesLength
      const listIndex = this.listIndex

      this.addOnTag(this.prevBtnEl)
      this.emit('@clickListBtn', { listIndex })
    }

    if(this.listIndex === maxListIndex) {
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
