const Ajv = require('ajv');
const {
  onlyContainNum,
  notEmptyStr
} = require('../../shared/constant.js');

var ajv = new Ajv();

let reqSchema = {
  "type": "object",
  "properties": {
    "projectId": {
      "type": "string",
      "pattern": notEmptyStr
    },
    "setId": {
      "type": "string",
      "pattern": notEmptyStr
    }
  },
  "required": ["projectId", "setId"]
};

let resSchema = {
  "type": "object",
  "properties": {
    projectName: {
      "type": "string",
      "pattern": notEmptyStr
    },
    setName: {
      "type": "string",
      "pattern": notEmptyStr
    },
    gearAmt: {
      "type": "integer"
    },
    canInvestNum: {
      "type": "string",
      "pattern": onlyContainNum
    },
    remainStock: {
      "type": "string",
      "pattern": onlyContainNum
    }
  },
  required: ["projectName", "setName", "gearAmt", "canInvestNum", "remainStock"]
};

module.exports = {
  req: ajv.compile(reqSchema),
  res: ajv.compile(resSchema)
}