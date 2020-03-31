class LazyManClass {
    constructor(name) {
        this.name = name
        this.queue = []
        console.log(`hi i am ${name}`)
        setTimeout(() => {
            this.next()
        }, 0)
    }

    sleepFirst(time) {
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${time}秒`)
                this.next()
            })
        }
        this.queue.unshift(fn)
        return this
    }

    sleep(time) {
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${time}秒`)
                this.next()
            })
        }
        this.queue.push(fn)
        return this
    }

    eat(food) {
        const fn = () => {
            setTimeout(() => {
                console.log(`I am eating ${food}`)
                this.next()
            })
        }
        this.queue.push(fn)
        return this
    }


    next() {
        const fn = this.queue.shift()
        fn && fn()
    }
}

function LazyMan(name) {
    return new LazyManClass(name)
}

LazyMan('tony').eat('shit').sleepFirst(4000).sleep(1000)