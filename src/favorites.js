document.addEventListener("DOMContentLoaded", () => {
    const matchData = [
        // 19-й тур
        { date: "2025-03-08", time: "14:00", teams: "Зенит vs Динамо", stadium: "Газпром Арена", city: "Санкт-Петербург" },
        { date: "2025-03-08", time: "16:30", teams: "Спартак vs Локомотив", stadium: "Открытие Банк Арена", city: "Москва" },
        { date: "2025-03-08", time: "18:45", teams: "Ростов vs Урал", stadium: "Ростов Арена", city: "Ростов-на-Дону" },
        { date: "2025-03-08", time: "20:00", teams: "Сочи vs Факел", stadium: "Фишт", city: "Сочи" },
        { date: "2025-03-09", time: "14:00", teams: "Краснодар vs Ахмат", stadium: "Краснодар", city: "Краснодар" },
        { date: "2025-03-09", time: "16:30", teams: "ЦСКА vs Рубин", stadium: "ВЭБ Арена", city: "Москва" },
        { date: "2025-03-09", time: "18:45", teams: "Оренбург vs Торпедо", stadium: "Газовик", city: "Оренбург" },
        { date: "2025-03-09", time: "20:00", teams: "Химки vs Нижний Новгород", stadium: "Арена Химки", city: "Химки" },

        // 20-й тур
        { date: "2025-03-15", time: "14:00", teams: "Зенит vs Локомотив", stadium: "Газпром Арена", city: "Санкт-Петербург" },
        { date: "2025-03-15", time: "16:30", teams: "Спартак vs Рубин", stadium: "Открытие Банк Арена", city: "Москва" },
        { date: "2025-03-15", time: "18:45", teams: "Ростов vs Ахмат", stadium: "Ростов Арена", city: "Ростов-на-Дону" },
        { date: "2025-03-15", time: "20:00", teams: "Сочи vs Нижний Новгород", stadium: "Фишт", city: "Сочи" },
        { date: "2025-03-16", time: "14:00", teams: "Краснодар vs Динамо", stadium: "Краснодар", city: "Краснодар" },
        { date: "2025-03-16", time: "16:30", teams: "ЦСКА vs Ахмат", stadium: "ВЭБ Арена", city: "Москва" },
        { date: "2025-03-16", time: "18:45", teams: "Оренбург vs Торпедо", stadium: "Газовик", city: "Оренбург" },
        { date: "2025-03-16", time: "20:00", teams: "Химки vs Урал", stadium: "Арена Химки", city: "Химки" }
    ];


    const form = document.getElementById("match-filter-form");
    const resultsTableBody = document.querySelector("#results-table tbody");
    const favoritesTableBody = document.querySelector("#favorites-table tbody");
    const clearFavoritesBtn = document.getElementById("clear-favorites");
    const clearTeamsBtn = document.getElementById("clear-teams");

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const renderFavorites = () => {
        favoritesTableBody.innerHTML = "";
        favorites.forEach(match => {
            const row = document.createElement("tr");
            Object.values(match).forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });
            favoritesTableBody.appendChild(row);
        });
    };

    const saveFavorites = () => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    const renderTable = (data) => {
        resultsTableBody.innerHTML = "";

        data.forEach(match => {
            const row = document.createElement("tr");

            Object.values(match).forEach((value, index) => {
                const cell = document.createElement("td");
                cell.textContent = index === 0 ? formatDate(value) : value; // Форматируем дату
                if (index === 2 || index === 3) {
                    cell.setAttribute("title", `Информация: ${value}`);
                }
                row.appendChild(cell);
            });

            const favoriteBtn = document.createElement("button");
            favoriteBtn.textContent = "Добавить";
            favoriteBtn.addEventListener("click", () => {
                if (!favorites.some(fav => JSON.stringify(fav) === JSON.stringify(match))) {
                    favorites.push(match);
                    saveFavorites();
                    renderFavorites();
                }
            });

            const actionCell = document.createElement("td");
            actionCell.appendChild(favoriteBtn);
            row.appendChild(actionCell);

            resultsTableBody.appendChild(row);
        });
    };

    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${day}.${month}.${year}`;
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const filterDate = document.getElementById("filter-date").value;
        const filterTeams = $("#filter-teams").val(); // Используем Select2 для получения значений
        const filterCity = document.getElementById("filter-city").value.toLowerCase();

        const filteredMatches = matchData.filter(match => {
            const matchDate = !filterDate || match.date === filterDate;
            const matchTeams = !filterTeams || filterTeams.some(team => match.teams.includes(team));
            const matchCity = !filterCity || match.city.toLowerCase().includes(filterCity);

            return matchDate && matchTeams && matchCity;
        });

        renderTable(filteredMatches);
    });

    clearFavoritesBtn.addEventListener("click", () => {
        favorites.length = 0;
        saveFavorites();
        renderFavorites();
    });

    clearTeamsBtn.addEventListener("click", () => {
        $("#filter-teams").val(null).trigger("change"); // Сбрасываем выбор через Select2 метод
    });

    // Инициализация Select2
    $("#filter-teams").select2({
        placeholder: "Выберите команды",
        allowClear: true,
        closeOnSelect: false,
        width: "100%",
    });

    renderFavorites(); // Первоначальный рендер избранного
});
