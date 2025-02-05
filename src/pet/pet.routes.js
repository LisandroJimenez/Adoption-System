import { Router } from "express";
import { check } from "express-validator";
import { savePet, getPets, searchPet, deletePet } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Este no es correo valido').not().isEmpty(),
        validarCampos
    ],
    savePet
)

router.get(
    "/",
    getPets
)

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "no es un ID valido").isMongoId(),
        validarCampos
    ],
    searchPet
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID valido").isMongoId(),
        validarCampos
    ],
    deletePet
)

export default router;

