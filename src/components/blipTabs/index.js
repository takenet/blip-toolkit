export class BlipTabs {
  constructor(elementId) {
    this.elementId = elementId
    this.init()
  }
  init() {
    const tabsContainer = document.getElementById(this.elementId)
    tabsContainer.classList.add('bp-tabs-container')
    const tabLinks = tabsContainer.querySelectorAll('.bp-tab-nav a')
    const tabContentDivs = tabsContainer.querySelectorAll('.bp-tab-content')
    tabLinks[0].parentElement.classList.add('bp-tab-active')
    tabContentDivs[0].classList.add('bp-tab-content-visible')
    for (let i = 0; i < tabLinks.length; i++) {
      tabLinks[i].addEventListener('click', event => this.showTab(event, tabLinks, tabContentDivs))
    }
  }

  showTab = (event, tabLinks, tabContentDivs) => {
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
