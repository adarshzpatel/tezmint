export const SINGLE_NFT_STORAGE_INIT = () => {
  return {
    prim: "Pair",
    args: [
      {
        prim: "Pair",
        args: [
          { int: "1" },
          {
            prim: "Pair",
            args: [
              [],
              [
                {
                  prim: "Elt",
                  args: [
                    { string: "" },
                    { bytes: "68747470733a2f2f6578616d706c652e636f6d" },
                  ],
                },
              ],
            ],
          },
        ],
      },
      {
        prim: "Pair",
        args: [
          [],
          {
            prim: "Pair",
            args: [
              { int: "0" },
              [
                {
                  prim: "Elt",
                  args: [
                    { int: "0" },
                    {
                      prim: "Pair",
                      args: [
                        { int: "0" },
                        [
                          {
                            prim: "Elt",
                            args: [{ string: "decimals" }, { bytes: "30" }],
                          },
                          {
                            prim: "Elt",
                            args: [
                              { string: "name" },
                              {
                                bytes:
                                  "54657a4d696e74204578616d706c652053696e676c65204e4654",
                              },
                            ],
                          },
                          {
                            prim: "Elt",
                            args: [
                              { string: "symbol" },
                              { bytes: "48656c6c6f" },
                            ],
                          },
                        ],
                      ],
                    },
                  ],
                },
              ],
            ],
          },
        ],
      },
    ],
  };
};
