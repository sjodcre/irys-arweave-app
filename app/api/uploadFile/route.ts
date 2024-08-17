import { NextResponse, NextRequest } from 'next/server'
import Irys from "@irys/sdk";

const TOP_UP = '200000000000000000'; // 0.2 MATIC
const MIN_FUNDS = 0.05

export async function POST(req: NextRequest) {
  const body = await req.arrayBuffer()
  const buffer = Buffer.from(body)

  const network = "mainnet"
  const token = "matic"
  const key = process.env.BNDLR_KEY
  const irys = new Irys({ network, token, key });

  let balance = await irys.getLoadedBalance()
    let readableBalance = irys.utils.fromAtomic(balance).toNumber()
    console.log(`Your balance is: ${readableBalance.toString()} MATIC`);

    if (readableBalance < MIN_FUNDS) {
        console.log("not enough need to fund")
        const res = await irys.fund(TOP_UP);
        console.log("Fund status", res)
    }
    console.log("finished funding")


  const tx = await irys.upload(buffer, {
    tags: [{ name: "Content-Type", value: 'image/png' }]
  })
  
  return NextResponse.json({ txId: `https://arweave.net/${tx.id}` })
}