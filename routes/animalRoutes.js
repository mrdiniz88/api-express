const router = require('express').Router()
const Animal = require('../models/Animal')

// Create - criação de dados
router.post('/', async (req, res) => {
    // req.body

    // {name: "Morena", race: "Vira-lata", agr: 4, brave: false}
    const {name, race, age, brave} = req.body

    if(!name) {
        res.status(422).json({error: 'O nome é obrigatorio'})
        return
    }
    if(!race) {
        res.status(422).json({error: 'A raça é obrigatorio'})
        return
    }
    if(!age) {
        res.status(422).json({error: 'A idade é obrigatorio'})
        return
    }
    
    const animal = {
        name,
        race,
        age,
        brave
    }

    try {
        
        // Criando dados
        await Animal.create(animal)

        res.status(201).json({message: 'Animal cadastrado com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }

});

// Read - leitura de dados
router.get('/', async (req, res) => {

    try {
        
        const animals = await Animal.find()

        res.status(200).json(animals)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.get('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {

        const animal = await Animal.findOne({_id:id})
        
        if (!animal) {
            res.status(422).json({ message: "O animal não foi encontrado!" })
            return
        }

        res.status(200).json(animal)
    } catch {
        res.status(500).json({ error: error })
    }

})

// Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { name, race, age, brave } = req.body

    const animal = {
        name,
        race,
        age,
        brave
    }

    try {
        
        const updateAnimal = await Animal.updateOne({_id:id}, animal)

        if (updateAnimal.matchedCount === 0) {
            res.status(200).json({ message: "O animal não foi encontrado!" })
        }
        res.status(200).json(animal)

    } catch (error) {
        res.status(500).json({error:error})
    }

})

// Delete - deletar dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id
    
    const animal = await Animal.findOne({_id:id})
        
    if (!animal) {
        res.status(422).json({ message: "O animal não foi encontrado!" })
        return
    }

    try {
        
        await Animal.deleteOne({_id:id})

        res.status(200).json({ message: `Animal de nome ${animal.name} foi removido com sucesso` })

    } catch (error) {
        res.status(500).json({error: error})
    }

})


module.exports = router
