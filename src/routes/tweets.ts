import express, {Request} from 'express';
import axios from 'axios';


const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized');
    }

    const { token, tokenSecret, profile } = req.body

    const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${profile.username}&count=10`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.json(response.data);
    } catch (error) {
        const typedError = error as any;
        res.status(500).json({ error: typedError.message });
    }
});

export default router;
