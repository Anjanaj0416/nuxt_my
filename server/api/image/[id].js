// server/api/image/[id].js
import https from 'https';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  return new Promise((resolve, reject) => {
    const url = `https://drive.google.com/thumbnail?&id=${id}&sz=w1000`;

    https.get(url, (res) => {
      let data = [];

      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        event.res.setHeader('Content-Type', res.headers['content-type'] || 'image/jpeg');
        resolve(buffer);
      });

    }).on('error', (err) => reject(err));
  });
});
