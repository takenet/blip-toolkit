export class BlipTabs {
  constructor(elementId, options = {}) {
    this.elementId = elementId
    this.options = options

    this.init()
  }

  init() {
    const activeTab = this.options.activeTab
    const tabsContainer = document.getElementById(this.elementId)
    const tabLinks = tabsContainer.querySelectorAll('.bp-tab-nav a')
    const tabContentDivs = tabsContainer.querySelectorAll('.bp-tab-content')
    tabsContainer.classList.add('bp-tabs-container')

    let activeTabLink
    let activeTabContainer

    if (!activeTab) {
      activeTabLink = tabLinks[0].parentElement
      activeTabContainer = tabContentDivs[0]
    } else {
      const tabLinkSelector = `.bp-tab-nav a[data-ref="${activeTab}"]`
      activeTabLink = (tabsContainer.querySelector(tabLinkSelector) &&
        tabsContainer.querySelector(tabLinkSelector).parentElement) || tabLinks[0].parentElement

      activeTabContainer = tabsContainer.querySelector(`.bp-tab-content[data-ref="${activeTab}"]`) || tabContentDivs[0]
    }

    activeTabLink && activeTabLink.classList.add('bp-tab-active')
    activeTabContainer && activeTabContainer.classList.add('bp-tab-content-visible')

    for (let i = 0; i < tabLinks.length; i++) {
      tabLinks[i].addEventListener('click', event => this.showTab(event, tabLinks, tabContentDivs))
    }
  }

  showTab(event, tabLinks, tabContentDivs) {
    event.preventDefault()
    const link = event.target
    const reference = link.dataset.ref

    for (let i = 0; i < tabLinks.length; i++) {
      if (tabLinks[i].dataset.ref === reference) {
        tabLinks[i].parentElement.classList.add('bp-tab-active')
      } else {
        tabLinks[i].parentElement.classList.remove('bp-tab-active')
      }
    }

    for (let i = 0; i < tabContentDivs.length; i++) {
      if (tabContentDivs[i].dataset.ref === reference) {
        tabContentDivs[i].classList.add('bp-tab-content-visible')
      } else {
        tabContentDivs[i].classList.remove('bp-tab-content-visible')
      }
    }
  }
}
