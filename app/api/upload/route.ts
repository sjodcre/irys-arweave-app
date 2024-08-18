import Irys from "@irys/sdk";
import { NextRequest, NextResponse } from "next/server";

const TOP_UP = '200000000000000000'; // 0.2 MATIC
const MIN_FUNDS = 0.01;

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const network = "mainnet"
        const token = "arweave"
        const key = JSON.parse((process.env.BNDLR_KEY_AR|| '').toString());
        const irys = new Irys({ network, token, key});

        let balance = await irys.getLoadedBalance()
        let readableBalance = irys.utils.fromAtomic(balance).toNumber()
        console.log(`Your balance is: ${readableBalance.toString()} AR`);

        if (readableBalance < MIN_FUNDS) {
            console.log("not enough need to fund")
            const res = await irys.fund(irys.utils.toAtomic(0.02));
            console.log("Fund status", res)
        }
        console.log("finished funding")

        const tx = await irys.upload(data, {
            tags: [{ name: 'Content-Type', value: 'application/json' }],
        })

        return NextResponse.json({ txId: `https://arweave.net/${tx.id}` })

    } catch (err) {
        console.log("error trying to upload", err)
    }

  }