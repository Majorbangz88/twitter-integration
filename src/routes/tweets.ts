import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized');
    }

    const { token, tokenSecret } = req.user as any;
    const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${req.user.profile.username}&count=10`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
