'use strict'

module.exports = (World) => (() => {
  let _pages = new WeakMap()

  class PagedWorld extends World {
    setPage (page, pageObject) {
      let pages = _pages.get(this)
      return Promise.resolve(pages[page] = pageObject)
    }

    getPage (page) {
      let pages = _pages.get(this)
      return Promise.resolve(pages[page])
    }
  }

  return PagedWorld
})()
