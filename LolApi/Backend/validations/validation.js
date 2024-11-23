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

export const validateUpdateChamp = (data) => {
    const schema = Joi.object({
        nombre: Joi.string(),
        imagen: Joi.string(),
        origen: Joi.string(),
        recurso: Joi.string(),
        lineas: Joi.array(),
        roles: Joi.array(),
        dificultad_uso: Joi.string()
    });
    return schema.validate(data);
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

