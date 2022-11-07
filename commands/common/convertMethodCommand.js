const {convertHexStringToDecString, convertHexEndianess, convertStringToHexString} = require("@signumjs/util");

function convertMethodCommand(text) {
  if (text.length > 8) {
    throw new Error('Text Argument cannot be larger than 8 bytes')
  }

  return convertHexStringToDecString(
    convertHexEndianess(
      convertStringToHexString(text)
    )
  );
}

module.exports = {
  convertMethodCommand
}
