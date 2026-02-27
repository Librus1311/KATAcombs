function getDifficultyFromKyu(kyu) {
    const kyuNumber = parseInt(kyu);
    if (kyuNumber === 8) return 'easy';
    if (kyuNumber === 7) return 'medium';
    if (kyuNumber === 6) return 'hard';
    return 'unknown';
}


function createArenaCard(kata) {
    const card = document.createElement('div');
    
    const difficulty = getDifficultyFromKyu(kata.kyu);
    card.className = `arena-card ${difficulty}`;

    card.innerHTML = `
        <div class="arena-card-header ${difficulty}" >
            <h2 class="${difficulty}">${kata.name}</h2>
            <div class="arena-card-header-rank">
                <span class="arena-rank">${kata.kyu}</span>
            </div>
        </div>

        <div class="arena-card-description ${difficulty}">
            <h3>Описание</h3>
            <p>${kata.description}</p>
            ${kata.examples ? `<pre class="arena-examples">${kata.examples}</pre>` : ''}
        </div>

        <div class="arena-card-solution">
            <h3>Моё решение</h3>
            <pre><code>${kata.myAnswer}</code></pre>
        </div>

        ${kata.codewarsAnswer ? `
            <div class="arena-card-solution-cw">
                <h3>Решение с CodeWars</h3>
                <pre><code>${kata.codewarsAnswer}</code></pre>
            </div>
        ` : ''}

        <div class="arena-card-footer">
            <a href="${kata.link}" target="_blank" class="arena-link">
                🔗 Открыть на CodeWars
            </a>
        </div>
    `;

    return card;
}

function renderArena(container, kata) {
    if (!container) return

    container.innerHTML = ''
    container.appendChild(createArenaCard(kata))
}