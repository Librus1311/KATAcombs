function getDifficultyFromKyu(kyu){
        const kyuNumber = parseInt(kyu)

        if (kyuNumber === 8) return 'easy'
        if (kyuNumber === 7) return 'medium'
        if (kyuNumber === 6) return 'hard'

        return "unknwon"
    }

function createGrimoireItem(kata) {
    const item = document.createElement('div')
    const difficulty = getDifficultyFromKyu(kata.kyu)

    item.className = `grimoire-item ${kata.difficulty}`
    item.dataset.id = kata.id

    const difficultyColor = {
        'easy': '#00cc88',
        'medium': '#ffcc00',
        'hard': '#ff3366'
    }

    const rankColor = difficultyColor[kata.difficulty] || '#00cc88'

    item.innerHTML = `
        <div class = "grimore-item-header">
            <h3 class = "grimoire-item-title">${kata.name}</h3>
            <span class = "grimoire-item-rank" style = "color: ${rankColor}"> ${kata.rank}</span>
        </div>
        <p class = "grimore-item-description"> ${kata.description.substring(0, 60)} ${kata.description.length > 60 ? '...' : ''}</p>
        <div class = grimoire-item-footer">
            <span class = "grimoire-item-difficulty ${kata.difficulty}"> ${kata.kyu} </span>
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

function renderGrimoire(container, katas) {
    if (!container) return
    container.innerHTML = ''
    katas.forEach(kata => {
        container.appendChild(createGrimoireItem(kata))
    })
}