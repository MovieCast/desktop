import babel from "rollup-plugin-babel";

export default [
  { // electron | main
    external: [
      "electron",
    ],
    input: "src/main/index.js",
    output: [{
      file: "dist/main/index.js",
      format: "cjs"
    }],
    plugins: [
      babel({
        exclude: "node_modules/**",
      })
    ]
  }
];