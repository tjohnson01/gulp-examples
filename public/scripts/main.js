// Test babel 
class Person{
  constructor(name){
    this.name = name;
  }
  
  hello(){
    return 'Hello ' + this.name;
  }
};

let name = 'Travis',
    t = new Person('Chawawis');

document.write('Hello ' + name + '!' + '<br/>');
document.write(t.hello());
