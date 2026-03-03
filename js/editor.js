let codeEditor;
let consoleOutput = [];

function initEditor(initialCode) {
    // Инициализация CodeMirror
    codeEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 2,
        tabSize: 2,
        autofocus: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        extraKeys: {
            'Ctrl-Enter': runCode,
            'Cmd-Enter': runCode
        }
    });
    
    // Устанавливаем начальный код
    if (initialCode) {
        codeEditor.setValue(initialCode);
    }
    
    // Назначаем обработчики
    document.getElementById('run-code').addEventListener('click', runCode);
    document.getElementById('reset-code').addEventListener('click', resetCode);
    
    // Переключение вкладок
    document.querySelectorAll('.editor-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.querySelectorAll('.editor-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

function runCode() {
    const code = codeEditor.getValue();
    const consoleOutput = document.getElementById('console-output');
    
    // Очищаем вывод
    consoleOutput.innerHTML = '';
    
    // Перехватываем console.log
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.log = (...args) => {
        const output = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        consoleOutput.innerHTML += `<span class="log">> ${output}</span>\n`;
    };
    
    console.error = (...args) => {
        consoleOutput.innerHTML += `<span class="error">⛔ ${args.join(' ')}</span>\n`;
    };
    
    console.warn = (...args) => {
        consoleOutput.innerHTML += `<span class="warn">⚠️ ${args.join(' ')}</span>\n`;
    };
    
    try {
        // Выполняем код
        eval(code);
        consoleOutput.innerHTML += `\n<span class="success">✓ Код выполнен успешно</span>`;
    } catch (error) {
        consoleOutput.innerHTML += `\n<span class="error">❌ Ошибка: ${error.message}</span>`;
    }
    
    // Восстанавливаем оригинальные функции
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
    
    // Переключаемся на вкладку консоли
    document.querySelector('.editor-tab[data-tab="console"]').click();
}

function resetCode() {
    // Возвращаем исходный код задачи
    const currentKata = getCurrentKata(); // эту функцию нужно добавить
    if (currentKata) {
        codeEditor.setValue(currentKata.myAnswer);
    }
}