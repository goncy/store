import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret === process.env.REVALIDATE_SECRET) {
    await res.revalidate("/");

    return res.json({revalidate: true});
  }

  return res.status(401).end();
}
