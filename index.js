// run `node index.js` in the terminal
const { createTestMachine, createTestModel } = require('@xstate/test');
const { assign } = require('xstate');
const testerMachine = createTestMachine({
  // id: 'tester',
  initial: 'ready',
  context: {
    count: 0,
  },
  states: {
    ready: {
      on: {
        INCREMENT: {
          actions: ['increment'],
          target: 'incremented',
        },
      },
    },
  },
  actions: {
    increment: assign((context) => ({
      count: context.count + 1,
    })),
    decrement: assign((context) => ({
      count: context.count - 1,
    })),
  },
});

const testModel = createTestModel(testerMachine);

console.log(`Hello Node.js v${process.versions.node}!`);
