import { connectDatabase, insertDocument } from '../../helpers/db-util'

async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' })
            return;
        }

        let client;

        try {
            client = await connectDatabase();
        } catch (error) {
          res.status(500).json({message: 'Connecting to the database failed!'});
          return;
         }

        try {
            await insertDocument(client, 'newsletter',{ email: userEmail })
            client.close();
        } catch (error) { 
            res.status(500).json({message: 'Inserting data failed!'});
            return;
        }

        res.status(201).json({ message: 'Signed Up!' });
    }

}

// mongodb+srv://otengmilleny29:<SN2wxLX511Onuux8>@cluster0.qkojddi.mongodb.net/?retryWrites=true&w=majority

export default handler;