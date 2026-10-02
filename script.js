const buttons = document.querySelectorAll(".tab-button");
const containers = document.querySelectorAll(".table-container");

buttons.forEach(button => {
    button.addEventListener("click", function () {
        // Видаляємо клас active у всіх кнопок
        buttons.forEach(btn => btn.classList.remove("active"));
        
        // Додаємо клас active натиснутій кнопці
        this.classList.add("active");

        // Приховуємо всі контейнери
        containers.forEach(container => container.classList.remove("active"));

        // Показуємо відповідний контейнер
        const tabName = this.dataset.tab;
        const selectedContainer = document.getElementById(tabName + "-content");
        selectedContainer.classList.add("active");
    });
});