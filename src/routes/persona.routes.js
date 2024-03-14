import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/add', (req, res)=>{
    res.render('persona/add');
});

router.post('/add', async(req, res)=>{
    try{
        const {name, age, curp, rfc, address} = req.body;
        const newPersona = {
            name, age, curp, rfc, address
        }
        await pool.query('insert into personass set ?', [newPersona]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/list', async(req, res)=>{
    try{
        const [result] = await pool.query('select * from personass');
        res.render('persona/list',{persona: result} )

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/edit/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const [persona] = await pool.query('select * from personass where id = ?', [id]);
        const personaEdit = persona[0];
        res.render('persona/edit', {persona: personaEdit});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id', async(req, res)=>{
    try{
        const {name, age, curp, rfc, address} = req.body;
        const {id} = req.params;
        const editPersona = {name, age, curp, rfc, address};
        await pool.query('update personass set id  where id = ?', [editPersona, id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('delete from personass where id = ?', [id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})
export default router;