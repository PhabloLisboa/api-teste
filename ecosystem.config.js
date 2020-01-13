module.exports = {
  apps : [{
    name   : "Teste API",
    script : "./dist/main.js",
    instances: 0,
    exec_mode: "cluster"
  }]
}
