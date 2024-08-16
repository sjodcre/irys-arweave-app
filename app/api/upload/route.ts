import Bundlr from "@bundlr-network/client";
import { read } from "fs";
import { NextRequest, NextResponse } from "next/server";

const MIN_FUNDS = 0;
const amountInAR = 0.02;
const amountInWinston = amountInAR * 1000000000000;


export async function POST (req: NextRequest) {
    const data = await req.json()
    // console.log('key value', process.env.BNDLR_KEY)
    const bundlr = new Bundlr("https://node1.irys.xyz", "arweave", process.env.BNDLR_KEY);
    await bundlr.ready()

    let balance = await bundlr.getLoadedBalance()
    console.log(`Your balance is: ${balance.toString()} winston`);
    let readableBalance = bundlr.utils.fromAtomic(balance).toNumber()

    if (readableBalance < MIN_FUNDS) {
        await bundlr.fund(amountInWinston)
    }

    const tx = await bundlr.upload(data, {
        tags: [{ name: 'Content-Type', value: 'application/json'}],
    })

    return NextResponse.json({ txId: `https:arweave.net/${tx.id}`})
}