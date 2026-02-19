let katasData = []

async function loadKatas() {
    const grimoireContainer = document.getElementById('grimoire-list')
    const arenaContainer = document.getElementById('arena-content')

    if (!grimoireContainer || !arenaContainer) {
        console.error('Не найдено')
        return
    }

    grimoireContainer.innerHTML = '<p class = "loading"> Загрузка задач...</p>'
    arenaContainer.innerHTML = '<p class = "loading"> Выберите задачу из списка</p>'

    try {
        const response = await fetch('katacombs.json')

        if (!response.ok){
            throw new Error(`Ошибка HTTP: ${response.status}`)
        }

        const data = await response.json()
        katasData = data.katas

        if (!katasData || katasData.length === 0) {
            grimoireContainer.innerHTML = '<p>Нет данных</p>'
            return
        }

        renderGrimoire(grimoireContainer, katasData)

        if (katasData.length > 0) {
            const firstItem = document.querySelector('.grimoire-item')
            if (firstItem) {
                firstItem.classList.add('active')
            }
            
            renderArena(arenaContainer, katasData[0])
        }

    } catch (error) {
        console.error('ошибка загрузки:', error)
        grimoireContainer.innerHTML = `<p class = "error"> Ошибка загрузки: ${error.message}</p>`
    }
}

document.addEventListener('kataSelected', (event) => {
    const arenaContainer = document.getElementById('arena-content')
    if (arenaContainer) {
        renderArena(arenaContainer, event.detail)
    }
})

document.addEventListener('DOMContentLoaded', loadKatas)