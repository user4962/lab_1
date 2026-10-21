// Дані зберігаються в JavaScript, а не в HTML.
const teachers = [
    { id: 1, name: "Ковальчук Майя Олегівна", position: "Доцент", department: "Комп'ютерних технологій", degree: "Кандидат педагогічних наук", subjects: "Web-програмування", experience: 15, email: "kovalchuk@example.com" },
    { id: 2, name: "Петренко Олександр Іванович", position: "Професор", department: "Інформаційних систем", degree: "Доктор технічних наук", subjects: "Бази даних", experience: 22, email: "petrenko@example.com" },
    { id: 3, name: "Шевченко Анна Василівна", position: "Старший викладач", department: "Комп'ютерних технологій", degree: "Кандидат технічних наук", subjects: "JavaScript", experience: 8, email: "shevchenko@example.com" }
];

const students = [
    { id: 1, name: "Іваненко Андрій Петрович", group: "КН-21", course: 4, specialty: "Комп'ютерні науки", studyForm: "Денна", averageGrade: 91.5, email: "ivanenko@example.com" },
    { id: 2, name: "Бондаренко Марія Олександрівна", group: "КН-22", course: 3, specialty: "Комп'ютерні науки", studyForm: "Денна", averageGrade: 94.2, email: "bondarenko@example.com" },
    { id: 3, name: "Мельник Дмитро Сергійович", group: "КН-20", course: 4, specialty: "Комп'ютерні науки", studyForm: "Заочна", averageGrade: 87.8, email: "melnyk@example.com" }
];

const subjects = [
    { id: 1, title: "Web-програмування", credits: 4, hours: 120, semester: 4, control: "Екзамен", department: "Комп'ютерних технологій", teacher: "Ковальчук М. О." },
    { id: 2, title: "Бази даних", credits: 5, hours: 150, semester: 5, control: "Екзамен", department: "Інформаційних систем", teacher: "Петренко О. І." },
    { id: 3, title: "JavaScript", credits: 3, hours: 90, semester: 4, control: "Залік", department: "Комп'ютерних технологій", teacher: "Шевченко А. В." }
];

// Опис колонок визначає, які властивості об'єктів відображати.
const sections = [
    { id: "teachers", title: "Викладачі", data: teachers, columns: [
        { key: "id", label: "ID" }, { key: "name", label: "ПІБ" },
        { key: "position", label: "Посада" }, { key: "department", label: "Кафедра" },
        { key: "degree", label: "Науковий ступінь" }, { key: "subjects", label: "Дисципліни" },
        { key: "experience", label: "Стаж, років" }, { key: "email", label: "E-mail" }
    ] },
    { id: "students", title: "Студенти", data: students, columns: [
        { key: "id", label: "ID" }, { key: "name", label: "ПІБ" },
        { key: "group", label: "Група" }, { key: "course", label: "Курс" },
        { key: "specialty", label: "Спеціальність" }, { key: "studyForm", label: "Форма навчання" },
        { key: "averageGrade", label: "Середній бал" }, { key: "email", label: "E-mail" }
    ] },
    { id: "subjects", title: "Дисципліни", data: subjects, columns: [
        { key: "id", label: "ID" }, { key: "title", label: "Назва дисципліни" },
        { key: "credits", label: "Кредити" }, { key: "hours", label: "Години" },
        { key: "semester", label: "Семестр" }, { key: "control", label: "Форма контролю" },
        { key: "department", label: "Кафедра" }, { key: "teacher", label: "Викладач" }
    ] }
];

// Універсальна функція: будує таблицю з масиву об'єктів.
function createTable(data, columns) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    columns.forEach(column => {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = column.label;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.forEach(item => {
        const row = document.createElement("tr");
        columns.forEach(column => {
            const cell = document.createElement("td");
            cell.textContent = item[column.key] ?? "";
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    return table;
}

function showTab(tabId) {
    document.querySelectorAll(".tab-button").forEach(button => {
        const active = button.dataset.tab === tabId;
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", String(active));
        button.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll(".table-container").forEach(panel => {
        const active = panel.id === `${tabId}-content`;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
    });
}

function renderApp() {
    const tabs = document.getElementById("tabs");
    const content = document.getElementById("content");

    sections.forEach((section, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tab-button";
        button.textContent = section.title;
        button.dataset.tab = section.id;
        button.id = `${section.id}-tab`;
        button.setAttribute("role", "tab");
        button.setAttribute("aria-controls", `${section.id}-content`);
        button.addEventListener("click", () => showTab(section.id));
        tabs.appendChild(button);

        const panel = document.createElement("section");
        panel.id = `${section.id}-content`;
        panel.className = "table-container";
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", button.id);
        const heading = document.createElement("h2");
        heading.textContent = section.title;
        panel.appendChild(heading);
        panel.appendChild(createTable(section.data, section.columns));
        content.appendChild(panel);
    });
    showTab(sections[0].id);
}

renderApp();
