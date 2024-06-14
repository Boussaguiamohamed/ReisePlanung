import { Router } from "express";
import { DI } from '../';
import { CreateReiseDTO, reiseSchema, Reise,Reiseziel } from '../entities';

const router = Router({ mergeParams: true });

router.get('/', async (req, res) => {
    try {
        const reise = await DI.reiseRepository.find(
            {},
            {  populate: ['reiseziel']}
        );
        res.status(200).send(reise);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

router.post('/', async (req, res) => {
    try {
        const validatedData = await reiseSchema.validate(req.body).catch((err) => 
            { res.status(400).send({ errors: err.errors }); });
        if(!validatedData) 
            {return;}

        const createReiseDTO: CreateReiseDTO = {
           ...validatedData,
        };

        const newReise = new Reise(createReiseDTO);

        await DI.em.persistAndFlush(newReise);
        res.status(201).send(newReise);
    } catch (err) {
        {
            res.status(500).json({ message: (err as Error).message });
        }
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await reiseSchema.validate(req.body);
        
        const reise = await DI.reiseRepository.findOne({ id });
        if (!reise) {
            return res.status(404).json({ message: 'Reise not found' });
        }

        reise.name = req.body.name;
        reise.beschreibung = req.body.beschreibung;
        reise.teilnehmer = req.body.teilnehmer;
        

        await DI.reiseRepository.persistAndFlush(reise);
        res.status(200).send(reise);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const reise = await DI.reiseRepository.findOne({ id });
        if (!reise) {
            return res.status(404).json({ message: 'Reise not found' });
        }

        await DI.reiseRepository.removeAndFlush(reise);
        res.status(200).json({ message: 'Reise deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    } 
});

router.get('/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const reise = await DI.reiseRepository.find({ name }, { populate: ['reiseziel'] });
        if (!reise) {
            return res.status(404).json({ message: 'Reise not found' });
        }
        res.status(200).send(reise);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});



router.post('/:id', async (req, res)=> {
    const { id } = req.params;

    try {
        const reise = await DI.reiseRepository.findOne({ id });
        if (!reise) {
            return res.status(404).json({ message: 'Reise not found' });
        }

        const reiseziel = await DI.reisezielRepository.findOne({ id: req.body.id });
        if (!reiseziel) {
            return res.status(404).json({ message: 'Reiseziel not found' });
        }

        reise.reiseziel.add(reiseziel);
        reiseziel.reisen.add(reise);

        await DI.reiseRepository.persistAndFlush(reise);
        await DI.reisezielRepository.persistAndFlush(reiseziel);

        res.status(200).send(reise);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});


router.delete('/:id/reiseziel/:reisezielId', async (req, res) => {
    const { id, reisezielId } = req.params;

    try {
        // Find the Reise entity by id
        const reise = await DI.reiseRepository.findOne({ id }, { populate: ['reiseziel'] });
        if (!reise) {
            return res.status(404).json({ message: 'Reise not found' });
        }

        // Find the Reiseziel entity by id
        const foundreiseziel = await DI.reisezielRepository.findOne({ id: reisezielId },{populate:['reisen']});
        if (!foundreiseziel) {
            return res.status(404).json({ message: 'Reiseziel not found' });
        }

        // Remove the Reiseziel from the Reise's reiseziel collection
        reise.reiseziel.remove(foundreiseziel);
        foundreiseziel.reisen.remove(reise);

        await DI.reiseRepository.persistAndFlush(reise);
        await DI.reisezielRepository.persistAndFlush(foundreiseziel);

        res.status(200).send(reise);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});




export const ReiseController = router;
