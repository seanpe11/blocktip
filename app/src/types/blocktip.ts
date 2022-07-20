export type Blocktip = {
  "version": "0.1.0",
  "name": "blocktip",
  "instructions": [
    {
      "name": "initProfile",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "royalty",
          "type": "bool"
        }
      ]
    },
    {
      "name": "updateRoyalty",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "donationAddress",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "royalty",
          "type": "bool"
        }
      ]
    },
    {
      "name": "sendBlockTip",
      "accounts": [
        {
          "name": "blockTip",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "message",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "blockTip",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "publicKey"
          },
          {
            "name": "to",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "message",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "donationAddress",
            "type": "publicKey"
          },
          {
            "name": "royalty",
            "type": "bool"
          },
          {
            "name": "totalDonations",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

export const IDL: Blocktip = {
  "version": "0.1.0",
  "name": "blocktip",
  "instructions": [
    {
      "name": "initProfile",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "royalty",
          "type": "bool"
        }
      ]
    },
    {
      "name": "updateRoyalty",
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "donationAddress",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "royalty",
          "type": "bool"
        }
      ]
    },
    {
      "name": "sendBlockTip",
      "accounts": [
        {
          "name": "blockTip",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "message",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "blockTip",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "publicKey"
          },
          {
            "name": "to",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "message",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "donationAddress",
            "type": "publicKey"
          },
          {
            "name": "royalty",
            "type": "bool"
          },
          {
            "name": "totalDonations",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
