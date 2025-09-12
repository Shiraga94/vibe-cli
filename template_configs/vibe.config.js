export default {
  compile: [
    { fileName: "Counter", contracts: ["Counter"] },
  ],
  deploy: {
    localhost: [
      { 
        fileName: "Counter", contracts: [{ name: "Counter", args: {} }] 
      },
    ]
  },
  scripts: {
    localhost: {
      increment: { fileName: "Counter", script: "Increment"  },
      decrement: { fileName: "Counter", script: "Decrement"  }
    }
  }
}