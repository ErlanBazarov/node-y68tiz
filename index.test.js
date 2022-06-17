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
    incremented: {},
  },
  actions: {
    increment: assign((context) => ({
      count: context.count + 1,
    })),
  },
});

const testModel = createTestModel(testerMachine);

describe('Test Model', () => {
  testModel.getSimplePaths().forEach((path) => {
    it(path.description, async () => {
      await path.test({
        states: {
          ready: async () => {
            expect(true).toEqual(true);
          },
          incremented: async ({ context }) => {
            console.log('context', context);
            expect(true).toEqual(true);
          },
        },
        events: {
          INCREMENT: async () => {},
        },
      });
    });
  });
});
