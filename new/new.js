function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

function objectFactory() {
    var obj = new Object()
    Constructor = [].shift.call(arguments)
    obj.__proto__ = Constructor.prototype
    
    // 如果构造函数返回了一个对象，在实例 person 中只能访问返回的对象中的属性。
    // 如果构造函数返回基本类型的值，则按没有返回值处理

    var ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj
}

