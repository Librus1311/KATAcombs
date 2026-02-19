function createArenaCard(kata) {
    const card = document.createElement('div')
    card.className = `arena-card ${kata.difficulty}`

    const difficultyColor = {
        'easy': '#00cc88',
        'medium': '#ffcc00',
        'hard': '#ff3366'
    }

    const accentColor = difficultyColor[kata.difficulty] || '#00cc88'

    card.innerHTML = `
        <div class = "arena-card-header" style = "border-colors: ${accentColor}">
            <h2>${kata.name}</h2>
            <div class = "arena-card-meta">
                <span class = "arena-rank" style = "background-colors: ${accentColor}20; color; ${accentColor}"> ${kata.name}</span>
                <span class = "arena-difficulty" style = "color: ${accentColor}"> ${kata.difficulty}</span>
            </div>
        </div>

        <div class = "arena-card-description">
            <h3>Описание</h3>
            <p>${kata.description}</p>
            ${kata.examples ? `<pre class = "arena-examples"> ${kata.examples} </pre>` : ''}
        </div>

        <div class = "arena-card-solution">
            <h3>Мое решение</h3>
            <pre><code>${kata.myAnswer}</code></pre>
        </div>

        ${kata.codeWarsAnswer ? `
            <div class = "arena-card-solution-CW">
                <h3> Решение с CodeWars</h3>
                <pre><code>${kata.codeWarsAnswer}</code></pre>
            </div>
        ` : ''}

        <div class = "arena-card-footer">
            <a href = "${kata.link} "target = "_blank" class = "arena-link" style = "color:${accentColor}> Открыть на CodeWars
            </a>
        </div>
    `
    return card
}

function renderArena(container, kata) {
    if (!container) return

    container.innerHTML = ''
    container.appendChild(createArenaCard(kata))
}