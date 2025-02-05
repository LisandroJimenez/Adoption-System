import { response } from "express";
import { hash } from "argon2";
import Usuario from './user.model.js'

export const getUsers = async (req = request, res = response) => {  
    try {
        const {limite = 10, desde = 0 } = req.query;
        const query = {estado: true}
        const [total, users] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            users
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener usuarios",
            error
        })
    }
}

export const getUserById = async (req , res ) => {
    try {
        const { id } = req.params;
        const user = await Usuario.findById(id);
        if(!user){
            res.status(404).json({
                success: false,
                msg: 'Usuario not found'
            })
        }
        res.status(200).json({
            success: true,
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener Usuario',
            error
        })        
    }
}

export const updateUser = async (req , res = response) => {
    try {
        const { id } = req.params;
        const { _id, password, email, ...data } = req.body;

        if(password ){
            data.password = await hash(password);
        }

        const user = await Usuario.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Errror al actualizar user',
            error
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Usuario.findByIdAndUpdate( id, {estado: false}, { new: true});
        const autheticatedUser = req.user;
        res.status(200).json({
            succes: true,
            msg: 'Usuario desactivado',
            user, 
            autheticatedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false, 
            msg: 'Error al desactivar usuario',
            error
        })
    }
}