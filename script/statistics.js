const app = Vue.createApp({
    data() {
        init = {
            headers: new Headers({
                "X-API-key": "7eptW5xxMNZFApxd9mPPBYnStZvfWrjKaQYvmu3G"
            })
        },

            data = [],
            statesChecked = "all"
    },
    created() {
        let url = ''
        if (document.getElementById("house")) {
            url = "https://api.propublica.org/congress/v1/113/house/members.json"
        }
        if ((document.getElementById("senate")) {
            url = "https://api.propublica.org/congress/v1/113/senate/members.json"
        }
        fetch(url, this.init)
            .then(res => res.json())
            .then(json => {
                this.dataHouse = json.results[0].members
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
        }
    },
    computed: {

    },
})

