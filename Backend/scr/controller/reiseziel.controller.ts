import { Router } from "express";
import { DI } from '../';
import { reisezielSchema, CreateReisezielDTO, Reiseziel, reiseSchema } from '../entities';

import axios from "axios";


const router = Router({ mergeParams: true });

router.get('/', async (req, res) => {
    try {
        const reiseziel = await DI.reisezielRepository.find(
            {},
            { populate: ['reisen.id'] }
        );
        res.status(200).send(reiseziel);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

router.post('/', async (req, res) => {
    try {
        const validatedData = await reisezielSchema.validate(req.body).catch((err) => 
            { res.status(400).send({ errors: err.errors }); });
        if(!validatedData) 
            {return;}

        const createReisezielDTO: CreateReisezielDTO = {
            ...validatedData,
        }

        const newReiseziel = new Reiseziel(createReisezielDTO);
        await DI.em.persistAndFlush(newReiseziel);
        
        res.status(201).send(newReiseziel);
    } catch (err) {
        {
            res.status(500).json({ message: (err as Error).message });
        }
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await reisezielSchema.validate(req.body);
        
        const reiseziel = await DI.reisezielRepository.findOne({ id });
        if (!reiseziel) {
            return res.status(404).json({ message: 'Reise not found' });
        }

        reiseziel.name = req.body.name;
        reiseziel.beschreibung = req.body.beschreibung;
        reiseziel.datumvon = req.body.datumvon;
        reiseziel.datumbis = req.body.datumbis;
        reiseziel.activities = req.body.activities;
        reiseziel.reisen = req.body.reisen;
        

        await DI.reisezielRepository.persistAndFlush(reiseziel);
        res.status(200).send(reiseziel);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
}); 

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const reiseziel = await DI.reisezielRepository.findOne({ id });
        if (!reiseziel) {
            return res.status(404).json({ message: 'Reise not found' });
        }

        await DI.reisezielRepository.removeAndFlush(reiseziel);
        res.status(200).json({ message: 'Reise deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

router.get('/:reisezielId', async (req, res) => {
    const { reisezielId } = req.params;

    try {
        const reiseziel = await DI.reisezielRepository.findOne({ id: reisezielId});
        if (!reiseziel) {
            return res.status(404).json({ message: 'Reise not found' });
        }

        const reise = await DI.reiseRepository.find({ reiseziel: reiseziel.id });
        if (!reise) {
            return res.status(404).json({ message: 'Reise not found' });
        }

        res.status(200).send(reise);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

router.get('/des/:name', async (req, res)=> {
    try {
        const { name } = req.params;
    
        const externApiUrl = `https://api.api-ninjas.com/v1/country/?name=${name}`;
        const apiResponse = await axios.get(externApiUrl, {
            headers: {
                'X-Api-Key': 'vsoVf+MJDsmk3yuDxnMGsg==kP8W019mB7i7mfpl'
            }
        });
    
        if (apiResponse.status !== 200) {
            throw new Error(`API request failed with status code ${apiResponse.status}`);
        }
    
        const externalData = apiResponse.data;
    
        if (!externalData || externalData.length === 0) {
            throw new Error(`No data found for country name: ${name}`);
        }
    
        const params = {
            name: externalData[0].name,
            capital: externalData[0].capital,
            population: externalData[0].population,
            currencyname: externalData[0].currency ? externalData[0].currency.name : 'Unknown',
            currencycode: externalData[0].currency ? externalData[0].currency.code : 'Unknown',
        };
    
        res.status(200).send(params);
    } catch (error: unknown) {
        console.error('Error:', (error as Error).message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
    
}
);



export const ReisezielController = router;