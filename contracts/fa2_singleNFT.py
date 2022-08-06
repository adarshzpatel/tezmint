import smartpy as sp
FA2 = sp.io.import_script_from_url("https://smartpy.io/templates/fa2_lib.py")

class SingleNFT(FA2.Fa2SingleAsset):
    pass

@sp.add_test(name="Hello World NFT")
def test():
    sc = sp.test_scenario()
    example_metadata = FA2.make_metadata(
        decimals=0,
        name="TezMint Example Single NFT",
        symbol="Hello"
    )
    contract_metadata = FA2.make_metadata(
        name: "TezMint Contract",
        description:"This is an example base nft"
        version:"1.00"
        interfaces: ["TZIP-012"],
        authors:"Adarsh",
        homepage:"adarshzpatel"
    )
    c1 = FA2.Fa2Nft(
        metadata = sp.utils.metadata_of_url("https://example.com"),
        token_metadata=example_metadata,
        ledger={},
        policy=None,
        metadata_base=
    )
    sc += c1
    