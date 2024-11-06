import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);  // Inform client of allowed methods
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { currentUser } = await serverAuth(req);


        return res.status(200).json(currentUser);
    } catch (error: any) {  // Use 'any' to avoid TypeScript error for unknown exceptions
        console.error("API Error:", error);  // Log full error for debugging
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
