
document.addEventListener('DOMContentLoaded', () => {
    createAnimatedBackground();
    setupGlitchButton();
    setupEntrance();
});

function createAnimatedBackground() {
    // Получаем или создаём контейнер для фона
    let bg = document.getElementById('code-background');
    
    if (!bg) {
        bg = document.createElement('div');
        bg.id = 'code-background';
        bg.className = 'code-background';
        document.body.prepend(bg);
    }
    
    // Очищаем старые линии
    bg.innerHTML = '';
    
    // Стили для контейнера (на всякий случай)
    bg.style.position = 'fixed';
    bg.style.top = '0';
    bg.style.left = '0';
    bg.style.width = '100%';
    bg.style.height = '100%';
    bg.style.zIndex = '-1';
    bg.style.pointerEvents = 'none';
    bg.style.overflow = 'hidden';
    
    // Массив строк кода
    const codeLines = [
        'function solveKata() {',
        '  return challenge * skill;',
        '}',
        'const katas = [];',
        'for (let i = 0; i < 30; i++) {',
        '  katas.push(conquer(i));',
        '}',
        'class CodeWarrior {',
        '  constructor() {',
        '    this.skill = Infinity;',
        '  }',
        '}',
        'export default katacombs;',
        'import { wisdom } from "codewars";',
        'while (unsolved) {',
        '  keepCoding();',
        '}',
        'async function enter() {',
        '  await loadChallenges();',
        '  return victory;',
        '}',
        'console.log("KATACOMBS");',
        'const secret = "code";',
        'let level = 8;',
        'if (user) { enter(); }',
        'function multiply(a, b) {',
        '  return a * b;',
        '}',
        'const arrow = (x) => x * 2;',
        'array.map(n => n * n);',
        'new Promise((resolve) => {',
        '  setTimeout(resolve, 1000);',
        '});'
    ];

    // Цвета для линий
    const colors = ['#2d7dff', '#00cc88', '#9d4edd', '#ff3366', '#ffcc00'];

    // Создаём 50 линий для хорошей плотности
    for (let i = 0; i < 50; i++) {
        const line = document.createElement('div');
        line.className = 'code-line';
        
        // Выбираем случайную строку
        const randomIndex = Math.floor(Math.random() * codeLines.length);
        line.textContent = codeLines[randomIndex];
        
        // Случайная позиция (от 0 до 100%)
        line.style.left = Math.random() * 100 + '%';
        line.style.top = Math.random() * 100 + '%';
        
        // Случайный цвет
        const colorIndex = Math.floor(Math.random() * colors.length);
        line.style.color = colors[colorIndex];
        
        // Случайный размер шрифта (от 10 до 30px)
        line.style.fontSize = (10 + Math.random() * 20) + 'px';
        
        // Случайная прозрачность (от 0.3 до 0.8)
        line.style.opacity = 0.3 + Math.random() * 0.5;
        
        // Добавляем тень для читаемости
        line.style.textShadow = '0 0 5px currentColor';
        
        // Анимация
        const duration = 15 + Math.random() * 20; // 15-35 секунд
        const delay = Math.random() * 5; // 0-5 секунд задержки
        
        line.style.animation = `float-code ${duration}s linear ${delay}s infinite`;
        
        // Добавляем линию в контейнер
        bg.appendChild(line);
    }
    
    // Добавляем стили для анимации, если их нет
    if (!document.querySelector('#gate-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'gate-animation-styles';
        style.textContent = `
            @keyframes float-code {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.7;
                }
                90% {
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes glitch-text {
                0% { transform: translate(0); opacity: 1; }
                20% { transform: translate(-2px, 1px); opacity: 0.8; }
                40% { transform: translate(2px, -1px); opacity: 0.9; }
                60% { transform: translate(-1px, 2px); opacity: 0.8; }
                80% { transform: translate(1px, -2px); opacity: 0.9; }
                100% { transform: translate(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

function setupGlitchButton() {
    const enterButton = document.getElementById('enter-button');
    const glitchingCode = document.getElementById('glitching-code');
    
    if (!enterButton || !glitchingCode) return;
    
    const codeSnippets = [
        'if (user.ready) { katacombs.unlock(); }',
        'const access = await authenticate(user);',
        'return portal.open("katacombs");',
        'dispatchEvent(new KatacombsEvent());',
        'system.checkPermissions(user);',
        'encryption.key = user.fingerprint;',
        'gateway.initialize({ mode: "katacombs" });',
        'security.override("firewall");',
        'database.connect("katas_db");',
        'api.call("enter_katacombs", user);',
        'while(rating < 2000) { solveKatas(); }',
        'import { wisdom } from "codewars";',
        'const victory = await fight();',
        'export const level = 8;',
        'function hackTheGibson() {',
        '  return "access granted";',
        '}'
    ];

    const colors = ['#00cc88', '#2d7dff', '#ff3366', '#9d4edd', '#ffcc00'];
    let glitchInterval;

    enterButton.addEventListener('mouseenter', () => {
        glitchInterval = setInterval(() => {
            // Меняем текст
            const randomIndex = Math.floor(Math.random() * codeSnippets.length);
            glitchingCode.textContent = codeSnippets[randomIndex];
            
            // Меняем цвет
            const colorIndex = Math.floor(Math.random() * colors.length);
            glitchingCode.style.color = colors[colorIndex];
            
            // Небольшая деформация
            glitchingCode.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        }, 80);
    });

    enterButton.addEventListener('mouseleave', () => {
        clearInterval(glitchInterval);
        
        // Возвращаем всё как было
        glitchingCode.textContent = 'if (user.ready) { katacombs.unlock(); }';
        glitchingCode.style.color = '#00cc88';
        glitchingCode.style.transform = 'none';
    });
}

function setupEntrance() {
    const enterButton = document.getElementById('enter-button');
    if (!enterButton) return;
    
    enterButton.addEventListener('click', () => {
        // Эффект нажатия
        enterButton.style.transform = 'scale(0.95)';
        enterButton.style.transition = 'all 0.2s';
        
        // Эффект "взлома" - быстрая смена цветов
        const originalColor = enterButton.style.color;
        const originalBorder = enterButton.style.borderColor;
        
        let flashCount = 0;
        const flashInterval = setInterval(() => {
            const colors = ['#00cc88', '#2d7dff', '#ff3366', '#9d4edd', '#ffcc00'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            enterButton.style.color = randomColor;
            enterButton.style.borderColor = randomColor;
            enterButton.style.boxShadow = `0 0 30px ${randomColor}`;
            
            flashCount++;
            if (flashCount > 10) {
                clearInterval(flashInterval);
                
                // Возвращаем к норме и переходим
                setTimeout(() => {
                    enterButton.style.transform = 'scale(1)';
                    enterButton.style.color = '';
                    enterButton.style.borderColor = '';
                    enterButton.style.boxShadow = '';
                    
                    // Переход на основную страницу
                    window.location.href = 'katacombs.html';
                }, 200);
            }
        }, 50);
    });
}