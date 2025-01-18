document.addEventListener("DOMContentLoaded", () => {
    const teamsData = [
        { team: "Зенит", goals_scored: 37, goals_conceded: 12, points: 39, wins: 12, draws: 3, defeats: 3, form: "3-0-2" },
        { team: "Спартак", goals_scored: 36, goals_conceded: 14, points: 37, wins: 11, draws: 4, defeats: 3, form: "5-0-0" },
        { team: "ЦСКА", goals_scored: 28, goals_conceded: 14, points: 31, wins: 9, draws: 4, defeats: 5, form: "2-1-2" },
        { team: "Локомотив", goals_scored: 33, goals_conceded: 26, points: 35, wins: 11, draws: 2, defeats: 5, form: "2-1-2" },
        { team: "Краснодар", goals_scored: 34, goals_conceded: 12, points: 39, wins: 11, draws: 6, defeats: 1, form: "1-3-1" },
        { team: "Динамо", goals_scored: 37, goals_conceded: 20, points: 35, wins: 10, draws: 5, defeats: 3, form: "2-3-0" },
        { team: "Ростов", goals_scored: 29, goals_conceded: 28, points: 26, wins: 7, draws: 5, defeats: 6, form: "4-1-0" },
        { team: "Рубин", goals_scored: 25, goals_conceded: 26, points: 26, wins: 7, draws: 5, defeats: 6, form: "2-2-1" },
        { team: "Акрон", goals_scored: 22, goals_conceded: 34, points: 22, wins: 6, draws: 4, defeats: 8, form: "3-0-2" },
        { team: "Крылья Советов", goals_scored: 19, goals_conceded: 29, points: 18, wins: 5, draws: 3, defeats: 10, form: "2-0-3" },
        { team: "Динамо Махачкала", goals_scored: 11, goals_conceded: 17, points: 17, wins: 3, draws: 8, defeats: 7, form: "1-2-2" },
        { team: "Пари НН", goals_scored: 15, goals_conceded: 34, points: 16, wins: 4, draws: 4, defeats: 10, form: "1-1-3" },
        { team: "Химки", goals_scored: 22, goals_conceded: 35, points: 16, wins: 3, draws: 7, defeats: 8, form: "1-2-2" },
        { team: "Факел", goals_scored: 11, goals_conceded: 25, points: 14, wins: 2, draws: 8, defeats: 8, form: "0-3-2" },
        { team: "Ахмат", goals_scored: 16, goals_conceded: 32, points: 13, wins: 2, draws: 7, defeats: 9, form: "1-1-3" },
        { team: "Оренбург", goals_scored: 16, goals_conceded: 33, points: 8, wins: 1, draws: 5, defeats: 12, form: "0-0-5" }
    ];

    const columnsForm = document.getElementById("comparison-columns-form");
    const sortBySelect = document.getElementById("comparison-sort-by");
    const sortOrderSelect = document.getElementById("comparison-sort-order");
    const tableHead = document.querySelector("#comparison-dynamic-table thead tr");
    const tableBody = document.querySelector("#comparison-dynamic-table tbody");

    const renderTable = () => {
        const selectedColumns = Array.from(columnsForm.elements)
            .filter(input => input.checked)
            .map(input => input.value);

        const sortBy = sortBySelect.value;
        const sortOrder = sortOrderSelect.value;

        const sortedData = [...teamsData].sort((a, b) => {
            if (sortOrder === "asc") {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });

        tableHead.innerHTML = "";
        selectedColumns.forEach(column => {
            const th = document.createElement("th");
            th.textContent = {
                team: "Команда",
                goals_scored: "Забитые голы",
                goals_conceded: "Пропущенные голы",
                points: "Очки",
                wins: "Победы",
                draws: "Ничьи",
                defeats: "Поражения",
                form: "Форма"
            }[column] || column;
            tableHead.appendChild(th);
        });

        tableBody.innerHTML = "";
        sortedData.forEach(row => {
            const tr = document.createElement("tr");
            selectedColumns.forEach(column => {
                const td = document.createElement("td");
                td.textContent = row[column];
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    };

    columnsForm.addEventListener("change", renderTable);
    sortBySelect.addEventListener("change", renderTable);
    sortOrderSelect.addEventListener("change", renderTable);

    renderTable();
});
