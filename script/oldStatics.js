////////////// GLANCE TABLE DATA ///////////////////

let glanceDemocratCount = 0
let glanceDemocratVotes = 0
let glanceRepublicanCount = 0
let glanceRepublicanVotes = 0
let glanceIndependentCount = 0
let glanceIndependentVotes = 0

data.results[0].members.forEach((e) => {
    if (e.party == "D" && e.votes_with_party_pct) {
        glanceDemocratCount += 1
        glanceDemocratVotes += e.votes_with_party_pct

    } else if (e.party == "R" && e.votes_with_party_pct) {
        glanceRepublicanCount += 1
        glanceRepublicanVotes += e.votes_with_party_pct

    } else if (e.party == "ID" || e.party == "I" && e.votes_with_party_pct) {
        glanceIndependentCount += 1
        glanceIndependentVotes += e.votes_with_party_pct
    }
})

let glancePartys = [
    {
        "party": "Democrats",
        "repCount": glanceDemocratCount,
        "votes": (glanceDemocratVotes / glanceDemocratCount).toFixed(2)
    },
    {
        "party": "Republicans",
        "repCount": glanceRepublicanCount,
        "votes": (glanceRepublicanVotes / glanceRepublicanCount).toFixed(2)
    },
    {
        "party": "Independents",
        "repCount": glanceIndependentCount,
        "votes": ((glanceIndependentVotes / glanceIndependentCount)
            ? (glanceIndependentVotes / glanceIndependentCount)
            : 0).toFixed(2)
    },
    {
        "party": "Total",
        "repCount": (glanceIndependentCount + glanceRepublicanCount + glanceDemocratCount),
        "votes": (((glanceIndependentVotes / glanceIndependentCount)
            ? ((glanceIndependentVotes / glanceIndependentCount) + (glanceRepublicanVotes / glanceRepublicanCount) + (glanceDemocratVotes / glanceDemocratCount) / 3).toFixed(2)
            : 0 + (glanceRepublicanVotes / glanceRepublicanCount) + (glanceDemocratVotes / glanceDemocratCount)) / 2).toFixed(2)
    },
]

///////////////// ENGAGED TABLE DATA ///////////////////
function engagedTableData(tableData, param) {
    let mostEngaged = []
    let leastEngaged = []


    tableData.sort((a, b) => {
        if (a[param] < b[param]) {
            return -1
        }
        if (a[param]) {
            return 1
        }
        return 0
    })

    for (let i = 1; i < 11; i++) {
        mostEngaged.push(tableData[i])
    }
    for (let i = tableData.length - 1; i > tableData.length - 11; i--) {
        leastEngaged.push(tableData[i])
    }

    return {
        "mostEngaged": mostEngaged,
        "leastEngaged": leastEngaged
    }
}