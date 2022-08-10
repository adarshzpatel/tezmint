import smartpy as sp
FA2 = sp.io.import_script_from_url("https://smartpy.io/templates/fa2_lib.py")

class TezMintSFTCollection(FA2.Admin, FA2.Fa2Fungible):
    def __init__(self, **kwargs):    
        FA2.Fa2Fungible.__init__(self, metadata = sp.utils.metadata_of_url("ipfs://bafkreicdcvcxqrxqwjcrdxurhuvvfc2ekofdx4h52swlmbq7tjmnyv4b4q"),token_metadata={},ledger={})
        FA2.Admin.__init__(self, sp.address("tz1bKyWHn17KyS1HApH1c8rrKaoorKkCWqQV"))

    @sp.entry_point
    def mint(self, batch):
        """Admin can mint tokens."""
        sp.set_type(
            batch,
            sp.TList(
                sp.TRecord(
                    to_=sp.TAddress,
                    token=sp.TVariant(
                        new=sp.TMap(sp.TString, sp.TBytes), existing=sp.TNat
                    ),
                    amount=sp.TNat,
                ).layout(("to_", ("token", "amount")))
            ),
        )
        sp.verify(self.is_administrator(sp.sender), "FA2_NOT_ADMIN")
        with sp.for_("action", batch) as action:
            with action.token.match_cases() as arg:
                with arg.match("new") as metadata:
                    token_id = sp.compute(self.data.last_token_id)
                    self.data.token_metadata[token_id] = sp.record(
                        token_id=token_id, token_info=metadata
                    )
                    self.data.supply[token_id] = action.amount
                    self.data.ledger[(action.to_, token_id)] = action.amount
                    self.data.last_token_id += 1
                with arg.match("existing") as token_id:
                    sp.verify(self.is_defined(token_id), "FA2_TOKEN_UNDEFINED")
                    self.data.supply[token_id] += action.amount
                    from_ = (action.to_, token_id)
                    self.data.ledger[from_] = (
                        self.data.ledger.get(from_, 0) + action.amount
                    )

sp.add_compilation_target("Tez Mint SFT Collection",TezMintSFTCollection())