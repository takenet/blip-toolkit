export const BlipTabs = (elementId) => {
  let tabsContainer = document.getElementById(elementId)
  tabsContainer.classList.add('tabs-container')
  let tabLinks = tabsContainer.querySelectorAll('.tab-nav a')
  let tabContentDivs = tabsContainer.querySelectorAll('.tab-content')
  tabLinks[0].parentElement.classList.add('active')
  tabContentDivs[0].classList.add('visible')
  tabLinks.forEach(tablink => tablink.addEventListener('click', event => showTab(event, tabLinks, tabContentDivs)))
}

const showTab = (event, tabLinks, tabContentDivs) => {
  event.preventDefault()
  let link = event.target
  let reference = link.dataset.ref
  tabLinks.forEach(link => {
    if (link.dataset.ref === reference) {
      link.parentElement.classList.add('active')
    } else {
      link.parentElement.classList.remove('active')
    }
  })
  tabContentDivs.forEach(content => {
    if (content.dataset.ref === reference) {
      content.classList.add('visible')
    } else {
      content.classList.remove('visible')
    }
  })
}
