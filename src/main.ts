import './style.css'

const controls = document.querySelector<HTMLDivElement>('.index-controls')!
const buttons = document.querySelectorAll<HTMLButtonElement>('[data-filter]')
const search = document.querySelector<HTMLInputElement>('#project-search')!
const rows = [...document.querySelectorAll<HTMLLIElement>('.project-row')]
const emptyState = document.querySelector<HTMLDivElement>('.empty-state')!
const count = document.querySelector<HTMLParagraphElement>('#result-count')!
let category = 'all'

function filterProjects() {
  const query = search.value.trim().toLowerCase()
  let visible = 0

  for (const row of rows) {
    const matchesCategory = category === 'all' || row.dataset.category === category
    const matchesSearch = row.textContent?.toLowerCase().includes(query) ?? false
    row.hidden = !(matchesCategory && matchesSearch)
    if (!row.hidden) visible++
  }

  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button.dataset.filter === category))
  }
  emptyState.hidden = visible > 0
  count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} shown`
}

for (const button of buttons) {
  button.addEventListener('click', () => {
    category = button.dataset.filter ?? 'all'
    filterProjects()
  })
}

search.addEventListener('input', filterProjects)
document.querySelector<HTMLButtonElement>('#reset-filters')!.addEventListener('click', () => {
  category = 'all'
  search.value = ''
  filterProjects()
  search.focus()
})

controls.hidden = false
document.querySelector<HTMLElement>('#year')!.textContent = String(new Date().getFullYear())
