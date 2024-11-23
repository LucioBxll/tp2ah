import Joi from "joi";

export const validateChamp = (data) => {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        imagen: Joi.string().required(),
        origen: Joi.string().required(),
        recurso: Joi.string().required(),
        lineas: Joi.array().required(),
        roles: Joi.array().required(),
        dificultad_uso: Joi.string().required()
    });
    return schema.validate(data);
};

export const validateUpdateChamp = (champ) => {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        imagen: Joi.string().required(),
        origen: Joi.string().required(),
        recurso: Joi.string().required(),
        lineas: Joi.array().items(Joi.string()).required(),
        roles: Joi.array().items(Joi.string()).required(),
        dificultad_uso: Joi.string().required(),
    });
    return schema.validate(champ);
};

export const validateUser = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
};

export const validateUpdateUser = (data) => {
    const schema = Joi.object({
        username: Joi.string(),
        password: Joi.string()
    });
    return schema.validate(data);
};

export const validateMap = (data) => {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        linea: Joi.number().integer().required(),
        jungla: Joi.boolean().required()
    });
    return schema.validate(data);
};

export const validateUpdateMap = (data) => {
    const schema = Joi.object({
        nombre: Joi.string(),
        linea: Joi.number().integer(),
        jungla: Joi.boolean()
    });
    return schema.validate(data);
};