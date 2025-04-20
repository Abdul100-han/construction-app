import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    switch (method) {
      case 'POST':
        if (req.query.nextauth?.includes('login')) {
          const { data } = await axios.post(`${baseURL}/auth/login`, req.body);
          return res.status(200).json(data);
        }
        
        if (req.query.nextauth?.includes('register')) {
          const { data } = await axios.post(`${baseURL}/auth/register`, req.body);
          return res.status(200).json(data);
        }
        
        if (req.query.nextauth?.includes('logout')) {
          const { data } = await axios.post(`${baseURL}/auth/logout`, {}, {
            headers: {
              Authorization: `Bearer ${req.cookies.token}`
            }
          });
          return res.status(200).json(data);
        }
        break;

      case 'GET':
        if (req.query.nextauth?.includes('me')) {
          const { data } = await axios.get(`${baseURL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${req.cookies.token}`
            }
          });
          return res.status(200).json(data);
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error.response?.data || {});
  }
};

export default handler;