const app = Vue.createApp({
    data() {
        return {
            init: {
                headers: new Headers({
                    "X-API-key": "7eptW5xxMNZFApxd9mPPBYnStZvfWrjKaQYvmu3G"
                })
            },
            data: [],
            stateSelected: "all",
            partyChecked: ["R", "D", "I"],
            moreInfo: 'Show More'
        };
    },
    created() {
        let url = ''
        if (document.getElementById("house")) {
            url = "https://api.propublica.org/congress/v1/113/house/members.json"
        }
        if ((document.getElementById("senate"))) {
            url = "https://api.propublica.org/congress/v1/113/senate/members.json"
        }
        fetch(url, this.init)
            .then(res => res.json())
            .then(json => {
                this.data = json.results[0].members
            })
    },
    methods: {
        statesFilter() {
            let statesArray = []
            this.data.map((e) => {
                if (statesArray.indexOf(e.state) == -1) {
                    statesArray.push(e.state)
                }
            })
            statesArray.sort()
            return statesArray
        },
        dataFiltered() {
            let filters = []
            filters = this.data.filter(e => {
                return (this.stateSelected == e.state || this.stateSelected == "all") && this.partyChecked.indexOf(e.party) !== -1
            })
            return filters
        },
        glanceParty() {
            let dCount = 0
            let rCount = 0
            let iCount = 0
            let dVotes = 0
            let rVotes = 0
            let iVotes = 0

            this.data.forEach(e => {
                if (e.party == "D") {
                    dCount += 1
                    dVotes += e.votes_with_party_pct
                } else if (e.party == "R") {
                    rCount += 1
                    rVotes += e.votes_with_party_pct
                } else if (e.party == "I" || e.party == "ID") {
                    iCount += 1
                    iVotes += e.votes_with_party_pct
                } else {
                    console.log(e.party)
                }
            });

            let partysGlance = [
                {
                    'party': 'Democrats',
                    'count': dCount,
                    'votes': ((dVotes / dCount)
                        ? (dVotes / dCount)
                        : 0).toFixed(2)
                },
                {
                    'party': 'Republicans',
                    'count': rCount,
                    'votes': ((rVotes / rCount)
                        ? (rVotes / rCount)
                        : 0).toFixed(2)
                },
                {
                    'party': 'Independents',
                    'count': iCount,
                    'votes': ((iVotes / iCount)
                        ? (iVotes / iCount)
                        : 0).toFixed(2)
                },
                {
                    'party': 'Total',
                    'count': (dCount + rCount + iCount),
                    'votes': (iVotes / iCount)
                        ? ((dVotes + rVotes + iVotes) / (dCount + rCount + iCount)).toFixed(2)
                        : ((dVotes + rVotes) / (rCount + dCount)).toFixed(2)
                }
            ]
            return partysGlance
        },
        engagedData(param) {
            let mostEngaged = []
            let leastEngaged = []

            this.data.sort((a, b) => {
                if (a[param] < b[param]) {
                    return -1
                }
                if (a[param]) {
                    return 1
                }
                return 0
            })
            for (let i = 1; i < 11; i++) {
                mostEngaged.push(this.data[i])
            }
            for (let i = this.data.length - 1; i > this.data.length - 11; i--) {
                leastEngaged.push(this.data[i])
            }
            return {
                "mostEngaged": mostEngaged,
                "leastEngaged": leastEngaged
            }
        },
        toggleInfo() {
            if (this.moreInfo == 'Show More') {
                this.moreInfo = 'Show Less'
            } else {
                this.moreInfo = 'Show More'
            }
        }
    }
})
