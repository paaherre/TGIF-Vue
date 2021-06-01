//// INDEX
let readMore = document.querySelector("#readMore")
let showMore = document.querySelector("#showMore")

if (readMore) {
    readMore.addEventListener('click', () => toggleReadMore())
    function toggleReadMore() {
        if (showMore.style.display == "block") {
            showMore.style.display = "none";
            readMore.textContent = "Read More"
        } else {
            showMore.style.display = "block";
            readMore.textContent = "Read Less"
        }
    }
}

///// CONGRESS
let tableHouseData = document.getElementById("table-houseData");
let checkboxes = document.querySelectorAll("input[type='checkbox']")
let stateSelect = document.querySelector("#stateSelect")

if (tableHouseData) {
    // Renderizo tabla principal completa
    renderTable(data.results[0].members)
    // Selecciona los estados del la base y saca los repetidos
    let estadosTodos = [];
    data.results[0].members.map(e => estadosTodos.push(e.state))
    let estadosFiltro = []
    estadosTodos.sort()
    for (let i = 0; i < estadosTodos.length; i++) {
        if (estadosTodos[i] != estadosTodos[i + 1]) {
            estadosFiltro.push(estadosTodos[i])
        }
    }
    // renderizo los estados asignando el value en cada option del select
    estadosFiltro.forEach(state => {
        let option = document.createElement("option")
        option.value = state
        option.innerText = state
        stateSelect.appendChild(option)
    })
    // evento para elegir el filtro por estado
    stateSelect.addEventListener("change", () => handleSelected())
    function handleSelected() {
        let stateSelected = stateSelect.value
        handleCheck(stateSelected)
    }
    // evento para filtrar por checkbox
    checkboxes.forEach(checkbox => checkbox.addEventListener("change", handleCheck))
    // función para filtrar la base
    function handleCheck() {
        let option = stateSelect.value
        let checked = Array.from(checkboxes).filter(checkbox => checkbox.checked)
        let valueChecked = checked.map(check => check.value)
        let arrayFiltrado = []
        if (valueChecked == "" && option == "all") {
            arrayFiltrado = data.results[0].members
        } else if (valueChecked == "" && option != "all") {
            arrayFiltrado = data.results[0].members.filter(e => e.state == option)
        } else if (valueChecked != "" && option == "all") {
            arrayFiltrado = data.results[0].members.filter(e => e.party == valueChecked[0] || e.party == valueChecked[1] || e.party == valueChecked[2]); //|| e.state == selectedOption
        } else {
            arrayFiltrado = data.results[0].members.filter(e => e.party == valueChecked[0] || e.party == valueChecked[1] || e.party == valueChecked[2])
            arrayFiltrado = arrayFiltrado.filter(e => e.state == option)
        }
        renderTable(arrayFiltrado)
    }
    //Renderizador de tabla
    function renderTable(tableData) {
        tableHouseData.innerHTML = "";
        tableData.forEach(house => {
            let row = document.createElement("tr")
            row.innerHTML =
                `<td><a href="${house.url}" target="_blank">${house.last_name} ${house.middle_name || " "} ${house.first_name}</a></td>
            <td>${house.party}</td>
            <td>${house.state}</td>
            <td>${house.seniority}</td>
            <td>${house.votes_with_party_pct} %</td>`
            tableHouseData.appendChild(row)
        })
    }
}

//// ATTENDANCE
let attendanceSenateTable = document.querySelector("#senateGlance")
let attendanceLastEngaged = document.querySelector("#senateLastEngaged")
let attendanceMostEngaged = document.querySelector("#senateMostEngaged")

///// LOYALTY
let glanceTable = document.querySelector("#glanceTable")
let mostEngaged = document.querySelector("#mostEngaged")
let leastEngaged = document.querySelector("#lastEngaged")

function renderGlanceTable(glanceData, paramChild) {
    glanceData.forEach(e => {
        let row = document.createElement("tr")
        row.innerHTML =
            `<th>${e.party}</th>
        <td>${e.repCount}</td>
        <td>${e.votes} %</td>`
        paramChild.appendChild(row)
    })
}
if (attendanceSenateTable) {
    renderGlanceTable(glancePartys, attendanceSenateTable)
    renderEngagedTable("missed_votes_pct", "missed_votes", attendanceMostEngaged, attendanceLastEngaged)
}
if (glanceTable) {
    renderGlanceTable(glancePartys, glanceTable)
    renderEngagedTable("votes_with_party_pct", "total_votes", mostEngaged, leastEngaged)
}

function renderEngagedTable(paramFilter, paramCount, paramChildMost, paramChildLeast) {
    let engagedData = engagedTableData([...data.results[0].members], paramFilter)
    engagedData.mostEngaged.map(e => {
        let votes = Math.round((e[paramCount] * e[paramFilter]) / 100)
        let row = document.createElement("tr")
        row.innerHTML =
            `<th><a href="${e.url}">${e.last_name} ${e.middle_name || ""} ${e.first_name}</a></th>
            <td>${votes}</td>
            <td>${e[paramFilter]} %</td>`
        paramChildMost.appendChild(row)
    })
    engagedData.leastEngaged.map(e => {
        let votes = Math.round((e[paramCount] * e[paramFilter]) / 100)
        let row = document.createElement("tr")
        row.innerHTML =
            `<th><a href="${e.url}">${e.last_name} ${e.middle_name || ""} ${e.first_name}</a></th>
            <td>${votes}</td>
            <td>${e[paramFilter]} %</td>`
        paramChildLeast.appendChild(row)
    })
}