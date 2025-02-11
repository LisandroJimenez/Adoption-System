import { Router } from "express";
import { check } from "express-validator"
import { getAppointment } from "./appointment.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { createAppointment } from "./appointment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", getAppointment)


router.post(
    "/",
    [
        validarJWT,
        check('email', 'Este no es un correo valido').not().isEmpty(),
        validarCampos
    ],
    createAppointment
)
export default router;
