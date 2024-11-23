import usersModel from "../models/usersModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const usuarios = await usersModel.find();
        res.json(usuarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usersModel.findById(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Verificar si el usuario ya existe
        const usuarioExistente = await usersModel.findOne({ username });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: "El nombre de usuario ya está en uso" });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptado = await bcrypt.hash(password, salt);

        // Crear nuevo usuario con la contraseña encriptada
        const nuevoUsuario = new usersModel({ 
            username, 
            password: passwordEncriptado 
        });
        await nuevoUsuario.save();

        // Generar token
        const token = jwt.sign(
            { id: nuevoUsuario._id, username: nuevoUsuario.username },
            process.env.SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            mensaje: "Usuario creado exitosamente",
            token,
            usuario: {
                id: nuevoUsuario._id,
                username: nuevoUsuario.username
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const iniciarSesion = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Buscar usuario
        const usuario = await usersModel.findOne({ username });
        if (!usuario) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }

        // Verificar contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }

        // Generar token
        const token = jwt.sign(
            { id: usuario._id, username: usuario.username },
            process.env.SECRET,
            { expiresIn: '1h' }
        );

        res.json({ 
            mensaje: "Inicio de sesión exitoso",
            token,
            usuario: {
                id: usuario._id,
                username: usuario.username
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { username, password } = req.body;
        const usuarioActualizado = await usersModel.findByIdAndUpdate(
            req.params.id,
            { username, password },
            { new: true }
        );
        if (usuarioActualizado) {
            res.json(usuarioActualizado);
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await usersModel.findByIdAndDelete(req.params.id);
        if (usuarioEliminado) {
            res.json({ mensaje: "Usuario eliminado correctamente" });
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export {
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    iniciarSesion,
    actualizarUsuario,
    eliminarUsuario
};
