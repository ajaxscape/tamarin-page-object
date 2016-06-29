'use strict'

module.exports = (World) => (() => {
  let _pages = new WeakMap()
  let _pageSplitter = new WeakMap()

  class PagedWorld extends World {
    constructor (driver, until) {
      super(driver, until)
      _pages.set(this, {})
      _pageSplitter.set(this, '>>')
    }

    setPage (page, pageObject) {
      let pages = _pages.get(this)
      return Promise.resolve(pages[page] = pageObject)
    }

    getPage (page) {
      let pages = _pages.get(this)
      return Promise.resolve(pages[page])
    }

    whenReady (selector, retries, timeout) {
      const pageSplitter = _pageSplitter.get(this)
      if (typeof selector === 'string' && selector.includes(pageSplitter)) {
        const [pageId, selector] = selector.split(pageSplitter)
        const page = this.getPage(pageId)
        console.log(`Page: ${page}`)
      }
      return super.whenReady(selector, retries, timeout)
    }
  }

  return PagedWorld
})()
