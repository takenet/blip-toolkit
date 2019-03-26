export const BlipTabs = (elementId) => {
  let tabsContainer = document.getElementById(elementId)
  tabsContainer.classList.add('tabs-container')
  let tabLinks = tabsContainer.querySelectorAll('.tab-nav a')
  let tabContentDivs = tabsContainer.querySelectorAll('.tab-content')
  tabLinks[0].parentElement.classList.add('active')
  tabContentDivs[0].classList.add('visible')
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener('click', event => showTab(event, tabLinks, tabContentDivs))
  }
}

const showTab = (event, tabLinks, tabContentDivs) => {
  event.preventDefault()
  let link = event.target
  let reference = link.dataset.ref
  for (let i = 0; i < tabLinks.length; i++) {
    if (tabLinks[i].dataset.ref === reference) {
      tabLinks[i].parentElement.classList.add('active')
    } else {
      tabLinks[i].parentElement.classList.remove('active')
    }
  }
  for (let i = 0; i < tabContentDivs.length; i++) {
    if (tabContentDivs[i].dataset.ref === reference) {
      tabContentDivs[i].classList.add('visible')
    } else {
      tabContentDivs[i].classList.remove('visible')
    }
  }
}
