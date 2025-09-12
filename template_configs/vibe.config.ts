import { type Config } from ".."

export default <Config> {
  compile: [
    { name: "Counter", src: "Counter" },
  ],
  deploy: {
    localhost: [
      { name: "Counter", src: "Counter", args: {} }
    ]
  },
  scripts: {
    Increment: { src: "Counter" },
    Decrement: { src: "Counter" }
  },
}