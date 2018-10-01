"use strict";

import { app } from 'electron';

const init = async () => {
  console.log("Hi in async method");
}

init().then(() => {
  console.log("Hi after async method");
});

function testSpread(...test) {
  console.log(test.join(','));
}

testSpread(1, 2, 3, 4, 5, 6);

class TestClass {
  static someMethod() {
    console.log("Some static method");
  }
}

TestClass.someMethod();

app.on("ready", () => {
  console.log("Electron is ready!!");
});