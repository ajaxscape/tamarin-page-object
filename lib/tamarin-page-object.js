'use strict'

module.exports = (World) => (() => {
  let _pages = new WeakMap()
  let _pageSplitter = new WeakMap()

  class PagedWorld extends World {
    constructor () {
      super(arguments)
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

    whenReady (world, selector, ...params) {
      const pageSplitter = _pageSplitter.get(this)
      if (typeof selector === 'string' && selector.includes(pageSplitter)) {
        const [pageId, selector] = selector.split(pageSplitter)
        const page = this.getPage(pageId)
        console.log(`Page: ${page}`)
      }
      return super.whenReady(world, selector, ...params)
    }
  }

  return PagedWorld
})()
