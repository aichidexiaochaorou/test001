'use strict'

//常量一旦定义下来之后是不能改变指向的
//const定义的常量,不能改变它的指向,但是可以改变,它所指向的空间里面的内容
/*const name = 'zhangsan';
console.log(name);

name = 'lisi';
console.log(name);*/

const person = {name:'张三',age:18}

console.log(person);

//person = {name:"李四",age:19};
person.name="张三丰";
person.age = 666;

console.log(person);
