function doSomething() {
  return new Promise((res, rej) => {
    try {
      res({ "message": "i did a thing!" })
    } catch(err) {
      console.error(err)
      rej({
        "error": err
      })
    }
  })
}

module.exports.doSomething = doSomething
