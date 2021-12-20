function init () {
  function typeLoop() {
    textUtils.typeText('In 2019')
      .then(() => utils.wait(2000))
      .then(() => textUtils.removeText(28))
      .then(() => textUtils.typeText('53.6 million tons of e-waste was generated globally'))
      .then(() => utils.wait(2000))
      .then(() => textUtils.removeText(52))
      .then(() => textUtils.typeText('and the reuse rate was only 17.4%'))
      .then(() => utils.wait(2000))
      .then(() => textUtils.removeText(33))
      .then(() => textUtils.typeText('However, most environmental education in Taiwan does not mention electronic products.'))
      .then(() => utils.wait(2000))
      .then(() => textUtils.removeText(85))
      .then(() => textUtils.typeText('Many people do not know the whereabouts and correct recycling channels of electronic products that are recycled and discarded.'))
      .then(() => utils.wait(2000))
      .then(() => textUtils.removeText(126))
      .then(() => textUtils.typeText('Therefore, I designed an e-waste lesson plan to let students understand the impact of e-waste on the environment and society and the correct recycling channels,'))
      .then(() => utils.wait(2000))
      .then(() => textUtils.removeText(160))
      .then(() => textUtils.typeText('And then deeply rooted in the importance of the concept of environmental protection.'))
      .then(() => utils.wait(2000))
      .then(() => textUtils.removeText(84))
      .then(typeLoop)
  }
  utils.wait(1000).then(() => {
    textUtils.clearText()
    textUtils.typeText('Hi! Do you know that ').then(typeLoop)
  })
}

const textNode = document.getElementById('type-text')
let text = ''

const utils = {
  genRandomInterval: () => {
    const randomMsInterval = 100 * Math.random()
    const msInterval = randomMsInterval < 50 ? 10 : randomMsInterval
    return msInterval
  },
  wait: (time) => {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }
}

const characterUtils = {
  pushCharacter: (character) => {
    text += character
    textUtils.updateText()
  },
  popCharacter: () => {
    text = text.slice(0, text.length -1)
    textUtils.updateText()
  },
  typeCharacter: (character) => {
    return new Promise(resolve => {
      const msInterval = utils.genRandomInterval()
      characterUtils.pushCharacter(character)
      utils.wait(msInterval).then(resolve)
    })
  },
  removeCharacter: () => {
    return new Promise(resolve => {
      const msInterval = utils.genRandomInterval()
      characterUtils.popCharacter()
      utils.wait(msInterval).then(resolve)
    })
  }
}

const textUtils = {
  updateText: () => {
    textNode.innerText = text
  },
  clearText: () => {
    text = ''
    textUtils.updateText()
  },
  typeText: (text) => {
    return new Promise(resolve => {
      (function _type (index) {
        characterUtils.typeCharacter(text[index]).then(() => {
          if (index + 1 < text.length) {
            _type(index + 1)
          } else {
            resolve()
          }
        })
      })(0)
    })
  },
  removeText: (amount) => {
    return new Promise(resolve => {
      (function _remove (index) {
        characterUtils.removeCharacter().then(() => {
          if (index + 1 < amount) {
            _remove(index + 1)
          } else {
            resolve()
          }
        })
      })(0)
    })
  }
}

init()
