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
                <div class="arena-card-header-title ${difficulty}" >
                    <h2 class="${difficulty}">${kata.name}</h2>
                    <div class="arena-card-header-rank">
                        <span class="arena-rank">${kata.kyu}</span>
                    </div>
                </div>
                <div class="arena-card-header-link">
                    <a href="${kata.link}" target="_blank" class="arena-link">
                        🔗 Open CodeWars
                    </a>
                </div>
            </div>


        <div class="arena-card-description ${difficulty}">
            <h3>Description</h3>
            <p>${kata.description}</p>
            ${kata.examples ? `
                <div class = "arena-card-description-examples">
                    <h4>Examples: </h4>
                    <p class = "arena-examples-content"> ${kata.examples}</p>
                </div>
            ` : ''}
        </div>

        <!-- ===== ИНТЕРАКТИВНЫЙ РЕДАКТОР (тупо ctrl c + ctrl v, тут уж мои полномочия - все) ===== -->

        <div class="code-editor-container">
            <div class="editor-tabs">
                <button class="editor-tab active" data-tab="code">Code</button>
                <button class="editor-tab" data-tab="console">Console</button>
            </div>
            <div class="editor-content active" id="code-tab-${kata.id}">
                <textarea class="code-editor" data-kata-id="${kata.id}">${kata.myAnswer}</textarea>
            </div>
            <div class="editor-content" id="console-tab-${kata.id}">
                <div class="console-output" data-kata-id="${kata.id}">
                    > Press "Run code"
                </div>
            </div>
            <div class="editor-controls">
                <button class="run-button" data-kata-id="${kata.id}">
                    <span>▶</span> Run code
                </button>

            </div>
        </div>
        <!-- ===== КОНЕЦ РЕДАКТОРА ===== -->

        
    `;

    return card;
}

function renderArena(container, kata) {
    if (!container) return

    container.innerHTML = ''
    const card = createArenaCard(kata)
    container.appendChild(card)
    
    // Инициализируем редактор для этой карточки
    initEditor(kata.id)
}

function initEditor(kataId) {
    const textarea = document.querySelector(`.code-editor[data-kata-id="${kataId}"]`)
    if (!textarea) return
    
    
    const editor = CodeMirror.fromTextArea(textarea, {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 2,
        tabSize: 2,
        matchBrackets: true,
        autoCloseBrackets: true,
        extraKeys: {
            'Ctrl-Enter': () => runCode(kataId)
        }
    })
    
    // Сохраняем редактор в глобальном объекте
    window.editors = window.editors || {}
    window.editors[kataId] = editor
    
    // Назначаем обработчики кнопок
    const runBtn = document.querySelector(`.run-button[data-kata-id="${kataId}"]`)

    
    runBtn.addEventListener('click', () => runCode(kataId))

    
    // Переключение вкладок
    document.querySelectorAll(`.editor-tab[data-tab]`).forEach(tab => {
        tab.addEventListener('click', (e) => {
            const parent = e.target.closest('.code-editor-container')
            parent.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'))
            parent.querySelectorAll('.editor-content').forEach(c => c.classList.remove('active'))
            
            tab.classList.add('active')
            const tabName = tab.dataset.tab
            parent.querySelector(`#${tabName}-tab-${kataId}`).classList.add('active')
        })
    })
}

function runCode(kataId) {
    const editor = window.editors?.[kataId]
    const consoleOutput = document.querySelector(`.console-output[data-kata-id="${kataId}"]`)
    if (!editor || !consoleOutput) return
    
    const code = editor.getValue()
    consoleOutput.innerHTML = ''
    
    // Перехватываем console.log
    const originalLog = console.log
    console.log = (...args) => {
        const output = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')
        consoleOutput.innerHTML += `<span class="log">> ${output}</span>\n`
        consoleOutput.scrollTop = consoleOutput.scrollHeight
    }
    
    try {
        eval(code)
        consoleOutput.innerHTML += `\n<span class="success">✓ Код выполнен успешно</span>`
    } catch (error) {
        consoleOutput.innerHTML += `\n<span class="error">❌ Ошибка: ${error.message}</span>`
    }
    
    console.log = originalLog
    
    // ✅ ПЕРЕКЛЮЧАЕМСЯ НА ВКЛАДКУ КОНСОЛИ
    const container = document.querySelector(`.code-editor-container`)
    if (container) {
        // Убираем active со всех вкладок и контента в этом контейнере
        container.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'))
        container.querySelectorAll('.editor-content').forEach(c => c.classList.remove('active'))
        
        // Активируем вкладку консоли
        const consoleTab = container.querySelector('.editor-tab[data-tab="console"]')
        const consoleContent = container.querySelector(`#console-tab-${kataId}`)
        
        if (consoleTab && consoleContent) {
            consoleTab.classList.add('active')
            consoleContent.classList.add('active')
        }
    }
}