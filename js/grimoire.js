function getDifficultyFromKyu(kyu){
        const kyuNumber = parseInt(kyu)

        if (kyuNumber === 8) return 'easy'
        if (kyuNumber === 7) return 'medium'
        if (kyuNumber === 6) return 'hard'

        return "unknown"
    }

function createGrimoireItem(kata) {
    const item = document.createElement('div')
    const difficulty = getDifficultyFromKyu(kata.kyu);

    item.className = `grimoire-item ${difficulty}`
    item.dataset.id = kata.id

    item.innerHTML = `
        <div class = "grimoire-item-header">
            <h3 class = "grimoire-item-title">${kata.name}</h3>
        </div>
        <p class = "grimoire-item-description"> ${kata.description.substring(0, 60)} ${kata.description.length > 60 ? '...' : ''}</p>
        <div class = "grimoire-item-footer">
            <span class = "grimoire-item-difficulty ${difficulty}"> ${kata.kyu} </span>
            <span class = "grimoire-item-id"> ${kata.id} </span>
        </div>
    `

    item.addEventListener('click', () => {
        document.querySelectorAll('.grimoire-item').forEach(el => {
            el.classList.remove('active')
        })
        item.classList.add('active')

        const event = new CustomEvent('kataSelected', {detail: kata})
        document.dispatchEvent(event)
    })

    return item
}

// LVL FILTER

function initFilter() {
    const filterSelect = document.getElementById('difficulty-filter')
    if (!filterSelect) return

    filterSelect.addEventListener('change', (e) => {
        const selectedDifficulty = e.target.value
        filterKatas(selectedDifficulty)
    })
}

function filterKatas(difficulty) {
    const container = document.getElementById('grimoire-list')
    if (!container) return

    const allCards = container.querySelectorAll('.grimoire-item')

    allCards.forEach(card => {
        if (difficulty === 'all') {
            card.classList.remove('inactive')
            card.style.display = 'block'
        } else {
            if (card.classList.contains(difficulty)) {
                card.classList.remove('inactive')
                card.style.display = 'block'
            } else {
                card.classList.add('inactive')
                card.style.display = 'none'
            }
        }
    })

    const visibleContent = container.querySelectorAll('.grimoire-item:not([style*="display: none"])').length
    const countSpan = document.getElementById('task-count')
    if (countSpan) {
        countSpan.textContent = `${visibleContent} tasks`
    }
}

function renderGrimoire(container, katasArray) {
    if (!container) return
    container.innerHTML = ''
    katasArray.forEach(kata => {
        container.appendChild(createGrimoireItem(kata))
    })

    const countElement = document.getElementById('task-count')
    if (countElement) {
        countElement.textContent = `${katasArray.length} tasks`
    }

    initFilter()

    const filterSelect = document.getElementById('difficulty-filter')
    if (filterSelect && filterSelect.value !== 'all') {
        filterKatas(filterSelect.value)
    }
}
