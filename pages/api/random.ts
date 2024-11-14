import { prismadb } from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from '@/lib/serverAuth';


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method!= 'GET'){
        return res.status(405).end();
    }

    try {
        await serverAuth(req);

        const movieCount = await prismadb.movie.count();

        const randomIndex = Math.floor(Math.random()*movieCount);
        const randomMovie = await prismadb.movie.findMany({
            take: 1,
        skip: randomIndex,
        
        // orderBy: {
        //     createdAt: 'asc',
        // }
        })
        return res.status(200).json(randomMovie[0]);
    }catch(error) {
        console.log(error);
        return res.status(400).end();
        
    }
}