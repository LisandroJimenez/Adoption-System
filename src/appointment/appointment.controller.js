import Appointment from "./appointment.model.js";
import User from "../users/user.model.js";
import Pet from "../pet/pet.model.js";

export const getAppointment = async (req, res) => {
    try {
        const {limite = 10, desde = 0} = req.body;
        const query = {state: true};
        const [total, appointments] = await Promise.all([
            Appointment.countDocuments(query),
            Appointment.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])
        res.status(200).json({
            success: true,
            total,
            appointments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener usuarios",
            error
        })
    }
}

export const createAppointment = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({email: data.email});
        const pet = await Pet.findOne({name: data.name})
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'Propietario no encontrado'
            })
        }
        if (!pet) {
            return res.status(404).json({
                success: false,
                msg: 'Mascota no encontrada'
            })
        }
        const appointment = new Appointment({
            ...data,
            keeper: user._id,
            pet: pet._id,
        });
        await appointment.save();
        res.status(200).json({
            success: true,
            appointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al crear cita"
        })
    }
}