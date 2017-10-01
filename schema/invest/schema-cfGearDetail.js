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
    "test": {
      "type": "string",
      "pattern": notEmptyStr
    }
  },
  "required": ["projectId", "test"]
};

let resSchema = {
  "type": "object",
  "properties": {
    lockTime: {
      "type": "string",
      "pattern": onlyContainNum
    },
    profitExplain: {
      "type": "string",
      "pattern": notEmptyStr
    },
    projectName: {
      "type": "string",
      "pattern": notEmptyStr
    },
    rate: {
      "type": "string"
    },
    repayType: {
      "type": "string",
      "pattern": notEmptyStr
    },
    returnSetList: {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          gearAmt: {
            "type": "integer"
          },
          gearLimit: {
            "type": "string",
            "pattern": onlyContainNum
          },
          returnDesc: {
            "type": "string",
            "pattern": notEmptyStr
          },
          setId: {
            "type": "string",
            "pattern": notEmptyStr
          },
          setName: {
            "type": "string",
            "pattern": notEmptyStr
          },
          stock: {
            "type": "string",
            "pattern": onlyContainNum
          },
          remainStock: {
            "type": "string",
            "pattern": onlyContainNum
          }
        },
        required: ["gearAmt", "gearLimit", "returnDesc", "setId", "setName", "stock", "remainStock"]
      }
    }
  }
};

module.exports = {
  req: ajv.compile(reqSchema),
  res: ajv.compile(resSchema)
}