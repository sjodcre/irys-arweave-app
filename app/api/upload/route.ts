import Bundlr from "@bundlr-network/client";
import { read } from "fs";
import { NextRequest, NextResponse } from "next/server";

// const MIN_FUNDS = 0;
// const amountInAR = 0.02;
// const amountInWinston = amountInAR * 1000000000000;


// export async function POST (req: NextRequest) {
//     const data = await req.json()
//     // console.log('key value', process.env.BNDLR_KEY)
//     // const bundlr = new Bundlr("http://node1.bundlr.network", "arweave", process.env.BNDLR_KEY);
//     const bundlr = new Bundlr("http://node1.bundlr.network", "matic", process.env.BNDLR_KEY)
//     await bundlr.ready()

//     let balance = await bundlr.getLoadedBalance()
//     console.log(`Your balance is: ${balance.toString()} winston`);
//     let readableBalance = bundlr.utils.fromAtomic(balance).toNumber()

//     if (readableBalance < MIN_FUNDS) {
//         await bundlr.fund(amountInWinston)
//     }

//     const tx = await bundlr.upload(data, {
//         tags: [{ name: 'Content-Type', value: 'application/json'}],
//     })

//     return NextResponse.json({ txId: `https:arweave.net/${tx.id}`})
// }

const TOP_UP = '200000000000000000'; // 0.2 MATIC
const MIN_FUNDS = 0.05;

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const bundlr = new Bundlr("https://node2.bundlr.network", "matic", process.env.BNDLR_KEY)
        await bundlr.ready()
        let balance = await bundlr.getLoadedBalance()
        let readableBalance = bundlr.utils.fromAtomic(balance).toNumber()
        console.log(`Your balance is: ${readableBalance.toString()} MATIC`);

        // if (readableBalance < MIN_FUNDS) {
        //     console.log("not enough need to fund")
        //     const res = await bundlr.fund(TOP_UP);
        //     console.log("Fund statu", res)
        // }
        //funding not working for now, use https://demo.bundlr.network/for bundlr fund
        // console.log("finished funding")
      
        const tx = await bundlr.upload(data, {
          tags: [{ name: 'Content-Type', value: 'application/json' }],
        })
      
        return NextResponse.json({ txId: `https://arweave.net/${tx.id}` })
    } catch (err) {
        console.log("error trying to upload", err)
    }

  }