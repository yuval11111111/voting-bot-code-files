//timer refresh 
const f = `./files/time.json`
fs.readFile(f, "utf8", (err, time2) => {
    for (let i = 0; i < Number(time2); i++) {
        let D = new Date().getTime();
        setTimeout(() => {
            setTimeout(() => {
                var timer = Number(time2)
                timer = timer - (i + 1)
                setTimeout(() => {
                    console.log(timer, D)
                    var fd = new Date().getTime()
                    fs.writeFileSync(f, `${timer}`)
                    if (timer == 0) return console.log(fd)
                }, 1000)
            }, 1000)
        }, 10)
    }
})