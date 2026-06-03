const service = require('../services/tipoMaquinaria.service');

const listar = async (req, res) => {
    const data = await service.listar();

    res.json({
        status: 'SUCCESS',
        data
    });
};

const obtenerPorId = async (req, res) => {
    const data = await service.obtenerPorId(req.params.id);

    res.json({
        status: 'SUCCESS',
        data
    });
};

const crear = async (req, res) => {
    const { detalle } = req.body;

    await service.crear(detalle);

    res.status(201).json({
        status: 'SUCCESS',
        message: 'Tipo de maquinaria creado'
    });
};

const actualizar = async (req, res) => {
    const { detalle } = req.body;

    await service.actualizar(
        req.params.id,
        detalle
    );

    res.json({
        status: 'SUCCESS',
        message: 'Tipo de maquinaria actualizado'
    });
};

const eliminar = async (req, res) => {
    await service.eliminar(req.params.id);

    res.json({
        status: 'SUCCESS',
        message: 'Tipo de maquinaria eliminado'
    });
};

module.exports = {
    listar,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};