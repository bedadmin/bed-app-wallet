/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  LbtcPbMsg: {
    nested: {
      Msg: {
        fields: {
          opid: {
            rule: "required",
            type: "uint32",
            id: 1
          }
        }
      },
      CreateTokenMsg: {
        fields: {
          opid: {
            rule: "required",
            type: "uint32",
            id: 1
          },
          tokenaddress: {
            rule: "required",
            type: "string",
            id: 2
          },
          name: {
            rule: "required",
            type: "string",
            id: 3
          },
          symbol: {
            rule: "required",
            type: "string",
            id: 4
          },
          totalamount: {
            rule: "required",
            type: "uint64",
            id: 5
          },
          digits: {
            rule: "required",
            type: "uint32",
            id: 6
          }
        }
      },
      TransferTokenMsg: {
        fields: {
          opid: {
            rule: "required",
            type: "uint32",
            id: 1
          },
          dstAddress: {
            rule: "required",
            type: "string",
            id: 2
          },
          tokenid: {
            rule: "required",
            type: "uint32",
            id: 3
          },
          amount: {
            rule: "required",
            type: "uint64",
            id: 4
          },
          comment: {
            rule: "required",
            type: "string",
            id: 5
          }
        }
      },
      LockTokenMsg: {
        fields: {
          opid: {
            rule: "required",
            type: "uint32",
            id: 1
          },
          dstAddress: {
            rule: "required",
            type: "string",
            id: 2
          },
          tokenid: {
            rule: "required",
            type: "uint32",
            id: 3
          },
          amount: {
            rule: "required",
            type: "uint64",
            id: 4
          },
          comment: {
            rule: "required",
            type: "string",
            id: 5
          },
          expiryheight: {
            rule: "required",
            type: "uint64",
            id: 6
          }
        }
      },
      RegisteNameMsg: {
        fields: {
          opid: {
            rule: "required",
            type: "uint32",
            id: 1
          },
          name: {
            rule: "required",
            type: "string",
            id: 2
          }
        }
      }
    }
  },
  PbTokenMsg: {
    nested: {
      TokenMsg: {
        fields: {
          opid: {
            rule: "required",
            type: "uint32",
            id: 1
          }
        }
      },
      CreateTokenMsg: {
        fields: {
          opid: {
            rule: "required",
            type: "uint32",
            id: 1
          },
          tokenaddress: {
            rule: "required",
            type: "string",
            id: 2
          },
          name: {
            rule: "required",
            type: "string",
            id: 3
          },
          symbol: {
            rule: "required",
            type: "string",
            id: 4
          },
          totalamount: {
            rule: "required",
            type: "uint64",
            id: 5
          },
          digits: {
            rule: "required",
            type: "uint32",
            id: 6
          }
        }
      },
      TransferTokenMsg: {
        fields: {
          opid: {
            rule: "required",
            type: "uint32",
            id: 1
          },
          dstAddress: {
            rule: "required",
            type: "string",
            id: 2
          },
          tokenid: {
            rule: "required",
            type: "uint32",
            id: 3
          },
          amount: {
            rule: "required",
            type: "uint64",
            id: 4
          },
          comment: {
            rule: "required",
            type: "string",
            id: 5
          }
        }
      },
      LockTokenMsg: {
        fields: {
          opid: {
            rule: "required",
            type: "uint32",
            id: 1
          },
          dstAddress: {
            rule: "required",
            type: "string",
            id: 2
          },
          tokenid: {
            rule: "required",
            type: "uint32",
            id: 3
          },
          amount: {
            rule: "required",
            type: "uint64",
            id: 4
          },
          comment: {
            rule: "required",
            type: "string",
            id: 5
          },
          expiryheight: {
            rule: "required",
            type: "uint64",
            id: 6
          }
        }
      }
    }
  }
});

module.exports = $root;
