const express = require('express');
const router = express.Router();
const {validarJWT, isAdmin, isActive}= require('../middlewares/auth.middleware');

const activoController=require('../controllers/activo.controller');
//ready
/**
 * @swagger
 * /api/activo/ready:
 *   get:
 *     summary: Obtiene la lista de todos los activos patrimoniales
 *     description: Retorna la lista completa de activos registrados en el sistema. Requiere token JWT válido.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de activos recuperada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Lista de activos recuperada con éxito
 *                 totalActivos:
 *                   type: integer
 *                   example: 145
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idActivo:
 *                         type: integer
 *                         example: 501
 *                       nombreActivo:
 *                         type: string
 *                         example: Laptop Lenovo ThinkPad T14
 *                       codigoPatrimonial:
 *                         type: string
 *                         example: INF-2023-045
 *                       codigoProveedor:
 *                         type: string
 *                         example: PROV-001
 *                       codigoProyecto:
 *                         type: string
 *                         example: PROY-001
 *                       idFactura:
 *                         type: integer
 *                         example: 120
 *                       idTipoActivo:
 *                         type: integer
 *                         example: 2
 *                       tipoActivo:
 *                         type: string
 *                         example: Informático
 *                       estadoActivo:
 *                         type: string
 *                         example: Operativo
 *                       costo:
 *                         type: number
 *                         format: float
 *                         example: 3500.50
 *                       fechaAdquisicion:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-15"
 *                       ambiente:
 *                         type: string
 *                         example: Oficina Principal
 *                       unidadOperativa:
 *                         type: string
 *                         example: Administración
 *                       sede:
 *                         type: string
 *                         example: Sede Huachipa
 *                       zona:
 *                         type: string
 *                         example: Costa
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       f_creacion:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-15T08:30:00Z"
 *                       f_ultimaActualizacion:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-20T14:15:00Z"
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       404:
 *         description: Ruta no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/ready',activoController.listarActivos);
/**
 * @swagger
 * /api/activo/ready-Specification/{id}:
 *   get:
 *     summary: Obtiene el detalle específico de un activo
 *     description: Retorna toda la información del activo y de su tabla hija específica (vehicular, informático, mobiliario, etc.) según la categoría. Requiere token JWT.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del activo.
 *       - in: query
 *         name: categoria
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría del activo para determinar qué tabla hija consultar.
 *     responses:
 *       200:
 *         description: Activo específico recuperado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Activo específico mostrado exitosamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 101
 *                     nombre:
 *                       type: string
 *                       example: Laptop Lenovo ThinkPad T14
 *                     codigoPatrimonial:
 *                       type: string
 *                       example: INF-2023-045
 *                     tipoActivo:
 *                       type: string
 *                       example: Informático
 *                     estadoActivo:
 *                       type: string
 *                       example: Operativo
 *                     procesador:
 *                       type: string
 *                       example: Intel Core i7
 *                     memoriaRAM:
 *                       type: string
 *                       example: 16 GB
 *                     almacenamiento:
 *                       type: string
 *                       example: SSD 512 GB
 *                     sistemaOperativo:
 *                       type: string
 *                       example: Windows 11 Pro
 *       400:
 *         description: Parámetros inválidos (id o categoria no son números).
 *       401:
 *         description: No autorizado. Token faltante o inválido.
 *       404:
 *         description: No se encontró el activo solicitado.
 *       500:
 *         description: Error interno en el servidor.
 */
router.get('/ready-Specification/:id', activoController.listarActivosSpe)
//create
/**
 * @swagger
 * /api/activo/create-vehiculos:
 *   post:
 *     summary: Registra un nuevo activo vehicular
 *     description: Crea el activo padre y el detalle vehicular, generando automáticamente el bloque génesis en el Audit Trail.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Camioneta Toyota Hilux
 *               codigoPatrimonial:
 *                 type: string
 *                 example: VEH-2024-001
 *               codigoProveedor:
 *                 type: string
 *                 example: PROV-88
 *               codigoProyecto:
 *                 type: string
 *                 example: PRY-AMAZONIA
 *               idEstado:
 *                 type: integer
 *                 example: 1
 *               fechaAdquisicion:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-15
 *               idFactura:
 *                 type: integer
 *                 example: 1050
 *               costo:
 *                 type: number
 *                 example: 25500.50
 *               idAmbiente:
 *                 type: integer
 *                 example: 5
 *               idUsuario:
 *                 type: integer
 *                 example: 12
 *               idMarca:
 *                 type: integer
 *                 example: 4
 *               idModelo:
 *                 type: integer
 *                 example: 8
 *               anio:
 *                 type: integer
 *                 example: 2023
 *               chasis:
 *                 type: string
 *                 example: 8AJ1234567890ABCD
 *               idTipoVehiculo:
 *                 type: integer
 *                 example: 2
 *               kilometraje:
 *                 type: number
 *                 example: 150.0
 *     responses:
 *       201:
 *         description: Activo vehicular registrado exitosamente.
 *       400:
 *         description: Faltan campos obligatorios o datos inválidos.
 *       409:
 *         description: Conflicto (código patrimonial o chasis ya existe).
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/create-vehiculos',validarJWT,isActive,isAdmin, activoController.registrarActivoVehicular);
/**
 * @swagger
 * /api/activo/create-informaticos:
 *   post:
 *     summary: Registra un nuevo activo Informatico
 *     description: Crea el activo padre y el detalle informatico, generando automáticamente el bloque génesis en el Audit Trail.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Celular Sansung
 *               codigoPatrimonial:
 *                 type: string
 *                 example: INF-2024-001
 *               codigoProveedor:
 *                 type: string
 *                 example: PROV-88
 *               codigoProyecto:
 *                 type: string
 *                 example: PRY-AMAZONIA
 *               idEstado:
 *                 type: integer
 *                 example: 1
 *               fechaAdquisicion:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-15
 *               idFactura:
 *                 type: integer
 *                 example: 1050
 *               costo:
 *                 type: number
 *                 example: 25500.50
 *               idAmbiente:
 *                 type: integer
 *                 example: 5
 *               idUsuario:
 *                 type: integer
 *                 example: 12
 *               idMarca:
 *                 type: integer
 *                 example: 4
 *               idModelo:
 *                 type: integer
 *                 example: 8
 *               idTipoEquipo:
 *                 type: integer
 *                 example: 1
 *               numeroSerie:
 *                 type: string
 *                 example: 8AJ1234567890ABCD
 *               procesador:
 *                 type: string
 *                 example: Qualcomm Snapdragon 8 Elite
 *               memoriaRAM:
 *                 type: number
 *                 example: 2
 *               AlmacenamientoGB:
 *                 type: number
 *                 example: 200
 *               discoDuro:
 *                 type: numbre
 *                 example: 2542
 *               idSistemaOperativo:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Activo informático registrado exitosamente.
 *       400:
 *         description: Faltan campos obligatorios o datos inválidos.
 *       409:
 *         description: Conflicto (código patrimonial o numero de serie ya existe).
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/create-informaticos',validarJWT,isActive,isAdmin, activoController.registrarActivoInformatico);
/**
 * @swagger
 * /api/activo/create-muebles:
 *   post:
 *     summary: Registra un nuevo activo mobiliario
 *     description: Crea el activo padre y el detalle mobiliario, generando automáticamente el bloque génesis en el Audit Trail.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Silla
 *               codigoPatrimonial:
 *                 type: string
 *                 example: MUE-2024-001
 *               codigoProveedor:
 *                 type: string
 *                 example: PROV-88
 *               codigoProyecto:
 *                 type: string
 *                 example: PRY-AMAZONIA
 *               idEstado:
 *                 type: integer
 *                 example: 1
 *               fechaAdquisicion:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-15
 *               idFactura:
 *                 type: integer
 *                 example: 1050
 *               costo:
 *                 type: number
 *                 example: 25500.50
 *               idAmbiente:
 *                 type: integer
 *                 example: 5
 *               idUsuario:
 *                 type: integer
 *                 example: 12
 *               idTipoMueble:
 *                 type: integer
 *                 example: 1
 *               material:
 *                 type: string
 *                 example: caoba
 *               color:
 *                 type: string
 *                 example: marron
 *               dimensiones:
 *                 type: string
 *                 example: 12*15*20
 *     responses:
 *       201:
 *         description: Activo mobiliario registrado exitosamente.
 *       400:
 *         description: Faltan campos obligatorios o datos inválidos.
 *       409:
 *         description: Conflicto (código patrimonial ya existe).
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/create-muebles', validarJWT,isActive,isAdmin, activoController.registrarActivoMobiliario);
/**
 * @swagger
 * /api/activo/create-inmuebles:
 *   post:
 *     summary: Registra un nuevo activo inmueble
 *     description: Crea el activo padre y el detalle inmueble, generando automáticamente el bloque génesis en el Audit Trail.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: vivienda
 *               codigoPatrimonial:
 *                 type: string
 *                 example: INM-2024-001
 *               codigoProveedor:
 *                 type: string
 *                 example: PROV-88
 *               codigoProyecto:
 *                 type: string
 *                 example: PRY-AMAZONIA
 *               idEstado:
 *                 type: integer
 *                 example: 1
 *               fechaAdquisicion:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-15
 *               idFactura:
 *                 type: integer
 *                 example: 1050
 *               costo:
 *                 type: number
 *                 example: 25500.50
 *               idAmbiente:
 *                 type: integer
 *                 example: 5
 *               idUsuario:
 *                 type: integer
 *                 example: 12
 *               idTipoInmueble:
 *                 type: integer
 *                 example: 1
 *               direccion:
 *                 type: string
 *                 example: av. la Fragata
 *               areaTotalM2:
 *                 type: string
 *                 example: 120
 *     responses:
 *       201:
 *         description: Activo inmueble registrado exitosamente.
 *       400:
 *         description: Faltan campos obligatorios o datos inválidos.
 *       409:
 *         description: Conflicto (código patrimonial  ya existe).
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/create-inmuebles',validarJWT,isActive,isAdmin, activoController.registrarActivoInmobiliario);
/**
 * @swagger
 * /api/activo/create-maquinaria:
 *   post:
 *     summary: Registra un nuevo activo maquinaria
 *     description: Crea el activo padre y el detalle maquinaria, generando automáticamente el bloque génesis en el Audit Trail.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Maquina de coser
 *               codigoPatrimonial:
 *                 type: string
 *                 example: MAQ-2024-001
 *               codigoProveedor:
 *                 type: string
 *                 example: PROV-88
 *               codigoProyecto:
 *                 type: string
 *                 example: PRY-AMAZONIA
 *               idEstado:
 *                 type: integer
 *                 example: 1
 *               fechaAdquisicion:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-15
 *               idFactura:
 *                 type: integer
 *                 example: 1050
 *               costo:
 *                 type: number
 *                 example: 25500.50
 *               idAmbiente:
 *                 type: integer
 *                 example: 5
 *               idUsuario:
 *                 type: integer
 *                 example: 12
 *               idMarca:
 *                 type: integer
 *                 example: 1
 *               idModelo:
 *                 type: integer
 *                 example: 2
 *               numeroSerie:
 *                 type: string
 *                 example: 120AGB264
 *               idTipoMaquinaria:
 *                 type: string
 *                 example: 2
 *     responses:
 *       201:
 *         description: Activo vehicular registrado exitosamente.
 *       400:
 *         description: Faltan campos obligatorios o datos inválidos.
 *       409:
 *         description: Conflicto (código patrimonial o chasis ya existe).
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/create-maquinaria',validarJWT,isActive,isAdmin, activoController.registrarActivoMaquinaria);
/**
 * @swagger
 * /api/activo/create-oficina:
 *   post:
 *     summary: Registra un nuevo activo oficina
 *     description: Crea el activo padre y el detalle oficina, generando automáticamente el bloque génesis en el Audit Trail.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Maquina de coser
 *               codigoPatrimonial:
 *                 type: string
 *                 example: OFI-2024-001
 *               codigoProveedor:
 *                 type: string
 *                 example: PROV-88
 *               codigoProyecto:
 *                 type: string
 *                 example: PRY-AMAZONIA
 *               idEstado:
 *                 type: integer
 *                 example: 1
 *               fechaAdquisicion:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-15
 *               idFactura:
 *                 type: integer
 *                 example: 1050
 *               costo:
 *                 type: number
 *                 example: 25500.50
 *               idAmbiente:
 *                 type: integer
 *                 example: 5
 *               idUsuario:
 *                 type: integer
 *                 example: 12
 *               idMarca:
 *                 type: integer
 *                 example: 1
 *               idModelo:
 *                 type: integer
 *                 example: 2
 *               idTipoEquipo:
 *                 type: integer
 *                 example: 5
 *               capacidadPotencia:
 *                 type: integer
 *                 example: 200
 *               dimensiones:
 *                 type: integer
 *                 example: 10*20*30
 *     responses:
 *       201:
 *         description: Activo oficina registrado exitosamente.
 *       400:
 *         description: Faltan campos obligatorios o datos inválidos.
 *       409:
 *         description: Conflicto (código patrimonial ya existe).
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/create-oficina',validarJWT,isActive,isAdmin, activoController.registrarActivoOficina);
//put
/**
 * @swagger
 * /api/activo/update-vehiculos/{id}:
 *   put:
 *     summary: Actualiza los datos de un activo vehicular existente
 *     description: Actualiza la tabla padre e hija y genera automáticamente una nueva entrada en el Audit Trail con el nuevo hash, solo si se detectan cambios físicos o lógicos. Requiere token JWT.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del activo padre a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Camioneta Toyota Hilux
 *               codigoPatrimonial:
 *                 type: string
 *                 example: VEH-2024-001
 *               codigoProveedor:
 *                 type: string
 *                 example: PROV-88
 *               codigoProyecto:
 *                 type: string
 *                 example: PRY-AMAZONIA
 *               idEstado:
 *                 type: integer
 *                 example: 2
 *               idAmbiente:
 *                 type: integer
 *                 example: 8
 *               idUsuario:
 *                 type: integer
 *                 example: 12
 *               idMarca:
 *                 type: integer
 *                 example: 4
 *               idModelo:
 *                 type: integer
 *                 example: 8
 *               anio:
 *                 type: integer
 *                 example: 2023
 *               chasis:
 *                 type: string
 *                 example: 8AJ1234567890ABCD
 *               idTipoVehiculo:
 *                 type: integer
 *                 example: 2
 *               observacionManual:
 *                 type: string
 *                 example: Se cambió de ambiente por renovación de flota.
 *     responses:
 *       200:
 *         description: Activo actualizado exitosamente.
 *       400:
 *         description: Parámetros inválidos (ej. ID no es un número).
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       404:
 *         description: Activo no encontrado.
 *       409:
 *         description: Conflicto (el código patrimonial o chasis editado ya existe).
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/update-vehiculos/:id',validarJWT,isActive,isAdmin,activoController.actualizarActivoVehicular)
/**
 * @swagger
 * /api/activo/update-informaticos/{id}:
 *   put:
 *     summary: Actualiza los datos de un activo informatico existente
 *     description: Actualiza la tabla padre e hija y genera automáticamente una nueva entrada en el Audit Trail con el nuevo hash, solo si se detectan cambios físicos o lógicos. Requiere token JWT.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del activo padre a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Camioneta Toyota Hilux
 *               codigoPatrimonial:
 *                 type: string
 *                 example: VEH-2024-001
 *               codigoProveedor:
 *                 type: string
 *                 example: PROV-88
 *               codigoProyecto:
 *                 type: string
 *                 example: PRY-AMAZONIA
 *               idEstado:
 *                 type: integer
 *                 example: 2
 *               idAmbiente:
 *                 type: integer
 *                 example: 8
 *               idUsuario:
 *                 type: integer
 *                 example: 12
 *               idMarca:
 *                 type: integer
 *                 example: 4
 *               idModelo:
 *                 type: integer
 *                 example: 8
 *               idTipoEquipo:
 *                 type: integer
 *                 example: 1
 *               numeroSerie:
 *                 type: string
 *                 example: 8AJ1234567890ABCD
 *               procesador:
 *                 type: string
 *                 example: Qualcomm Snapdragon 8 Elite
 *               memoriaRAM:
 *                 type: number
 *                 example: 2
 *               AlmacenamientoGB:
 *                 type: number
 *                 example: 200
 *               discoDuro:
 *                 type: numbre
 *                 example: 2542
 *               idSistemaOperativo:
 *                 type: integer
 *                 example: 3
 *               observacionManual:
 *                 type: string
 *                 example: Se cambió de ambiente por renovación de flota.
 *     responses:
 *       200:
 *         description: Activo actualizado exitosamente.
 *       400:
 *         description: Parámetros inválidos (ej. ID no es un número).
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       404:
 *         description: Activo no encontrado.
 *       409:
 *         description: Conflicto (el código patrimonial o numero de serie editado ya existe).
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/update-informaticos/:id',validarJWT,isActive,isAdmin, activoController.actualizarActivoInformatico);
/**
 * @swagger
 * /api/activo/update-muebles/{id}:
 *   put:
 *     summary: Actualiza los datos de un activo mueble existente
 *     description: Actualiza la tabla padre e hija y genera automáticamente una nueva entrada en el Audit Trail con el nuevo hash, solo si se detectan cambios físicos o lógicos. Requiere token JWT.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del activo padre a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Camioneta Toyota Hilux
 *               codigoPatrimonial:
 *                 type: string
 *                 example: VEH-2024-001
 *               codigoProveedor:
 *                 type: string
 *                 example: PROV-88
 *               codigoProyecto:
 *                 type: string
 *                 example: PRY-AMAZONIA
 *               idEstado:
 *                 type: integer
 *                 example: 2
 *               idAmbiente:
 *                 type: integer
 *                 example: 8
 *               idUsuario:
 *                 type: integer
 *                 example: 12
 *               idTipoMueble:
 *                 type: integer
 *                 example: 1
 *               material:
 *                 type: string
 *                 example: caoba
 *               color:
 *                 type: string
 *                 example: marron
 *               dimensiones:
 *                 type: string
 *                 example: 12*15*20
 *               observacionManual:
 *                 type: string
 *                 example: Se cambió de ambiente por renovación de flota.
 *     responses:
 *       200:
 *         description: Activo actualizado exitosamente.
 *       400:
 *         description: Parámetros inválidos (ej. ID no es un número).
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       404:
 *         description: Activo no encontrado.
 *       409:
 *         description: Conflicto (el código patrimonial editado ya existe).
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/update-muebles/:id', validarJWT,isActive,isAdmin, activoController.actualizarActivoMobiliario);
/**
 * @swagger
 * /api/activo/update-inmuebles/{id}:
 *   put:
 *     summary: Actualiza los datos de un activo inmueble existente
 *     description: Actualiza la tabla padre e hija y genera automáticamente una nueva entrada en el Audit Trail con el nuevo hash, solo si se detectan cambios físicos o lógicos. Requiere token JWT.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del activo padre a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Camioneta Toyota Hilux
 *               codigoPatrimonial:
 *                 type: string
 *                 example: VEH-2024-001
 *               codigoProveedor:
 *                 type: string
 *                 example: PROV-88
 *               codigoProyecto:
 *                 type: string
 *                 example: PRY-AMAZONIA
 *               idEstado:
 *                 type: integer
 *                 example: 2
 *               idAmbiente:
 *                 type: integer
 *                 example: 8
 *               idUsuario:
 *                 type: integer
 *                 example: 12
 *               idTipoInmueble:
 *                 type: integer
 *                 example: 1
 *               direccion:
 *                 type: string
 *                 example: av. la Fragata
 *               areaTotalM2:
 *                 type: string
 *                 example: 120
 *               observacionManual:
 *                 type: string
 *                 example: Se cambió de ambiente por renovación de flota.
 *     responses:
 *       200:
 *         description: Activo actualizado exitosamente.
 *       400:
 *         description: Parámetros inválidos (ej. ID no es un número).
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       404:
 *         description: Activo no encontrado.
 *       409:
 *         description: Conflicto (el código patrimonial editado ya existe).
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/update-inmuebles/:id',validarJWT,isActive,isAdmin, activoController.actualizarActivoInmobiliario);
/**
 * @swagger
 * /api/activo/update-maquinaria/{id}:
 *   put:
 *     summary: Actualiza los datos de un activo maquinaria existente
 *     description: Actualiza la tabla padre e hija y genera automáticamente una nueva entrada en el Audit Trail con el nuevo hash, solo si se detectan cambios físicos o lógicos. Requiere token JWT.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del activo padre a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Camioneta Toyota Hilux
 *               codigoPatrimonial:
 *                 type: string
 *                 example: VEH-2024-001
 *               codigoProveedor:
 *                 type: string
 *                 example: PROV-88
 *               codigoProyecto:
 *                 type: string
 *                 example: PRY-AMAZONIA
 *               idEstado:
 *                 type: integer
 *                 example: 2
 *               idAmbiente:
 *                 type: integer
 *                 example: 8
 *               idUsuario:
 *                 type: integer
 *                 example: 12
 *               idMarca:
 *                 type: integer
 *                 example: 1
 *               idModelo:
 *                 type: integer
 *                 example: 2
 *               numeroSerie:
 *                 type: string
 *                 example: 120AGB264
 *               idTipoMaquinaria:
 *                 type: string
 *                 example: 2
 *               observacionManual:
 *                 type: string
 *                 example: Se cambió de ambiente por renovación de flota.
 *     responses:
 *       200:
 *         description: Activo actualizado exitosamente.
 *       400:
 *         description: Parámetros inválidos (ej. ID no es un número).
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       404:
 *         description: Activo no encontrado.
 *       409:
 *         description: Conflicto (el código patrimonial o número de serie editado ya existe).
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/update-maquinaria/:id',validarJWT,isActive,isAdmin, activoController.actualizarActivoMaquinaria);
/**
 * @swagger
 * /api/activo/update-oficina/{id}:
 *   put:
 *     summary: Actualiza los datos de un activo maquinaria existente
 *     description: Actualiza la tabla padre e hija y genera automáticamente una nueva entrada en el Audit Trail con el nuevo hash, solo si se detectan cambios físicos o lógicos. Requiere token JWT.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del activo padre a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Camioneta Toyota Hilux
 *               codigoPatrimonial:
 *                 type: string
 *                 example: VEH-2024-001
 *               codigoProveedor:
 *                 type: string
 *                 example: PROV-88
 *               codigoProyecto:
 *                 type: string
 *                 example: PRY-AMAZONIA
 *               idEstado:
 *                 type: integer
 *                 example: 2
 *               idAmbiente:
 *                 type: integer
 *                 example: 8
 *               idUsuario:
 *                 type: integer
 *                 example: 12
 *               idMarca:
 *                 type: integer
 *                 example: 1
 *               idModelo:
 *                 type: integer
 *                 example: 2
 *               idTipoEquipo:
 *                 type: integer
 *                 example: 5
 *               capacidadPotencia:
 *                 type: integer
 *                 example: 200
 *               dimensiones:
 *                 type: integer
 *                 example: 10*20*30
 *               observacionManual:
 *                 type: string
 *                 example: Se cambió de ambiente por renovación de flota.
 *     responses:
 *       200:
 *         description: Activo actualizado exitosamente.
 *       400:
 *         description: Parámetros inválidos (ej. ID no es un número).
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       404:
 *         description: Activo no encontrado.
 *       409:
 *         description: Conflicto (el código patrimonial o número de serie editado ya existe).
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/update-oficina/:id',validarJWT,isActive,isAdmin, activoController.actualizarActivoOficina);
/**
 * @swagger
 * /api/activo/ajuste-contable/{id}:
 *   put:
 *     summary: Realiza un ajuste contable sobre un activo
 *     description: Modifica campos financieros críticos (Costo, Fecha de Adquisición y Factura). Este endpoint está restringido a administradores y genera un registro de auditoría obligatorio en el historial. Requiere token JWT.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del activo al que se le aplicará el ajuste contable.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               costo:
 *                 type: number
 *                 format: float
 *                 example: 4500.00
 *                 description: Nuevo valor corregido del activo.
 *               idFactura:
 *                 type: integer
 *                 example: 1052
 *                 description: ID de la factura o documento sustentatorio corregido.
 *               fechaAdquisicion:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-01-20T00:00:00.000Z"
 *                 description: Fecha exacta de adquisición corregida.
 *               observacion:
 *                 type: string
 *                 example: Corrección de factura por error de tipeo en registro inicial.
 *                 description: Justificación obligatoria para la auditoría.
 *             required:
 *               - costo
 *               - idFactura
 *               - fechaAdquisicion
 *               - observacion
 *     responses:
 *       200:
 *         description: Ajuste contable realizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Ajuste contable aplicado correctamente.
 *       400:
 *         description: Datos inválidos en la petición.
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       403:
 *         description: Acceso denegado. El usuario no tiene permisos de administrador.
 *       404:
 *         description: Activo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/ajuste-contable/:id',validarJWT,isActive,isAdmin,activoController.ajusteContable);
//delete
/**
 * @swagger
 * /api/activo/delete/{id}:
 *   delete:
 *     summary: Realiza la baja  de un activo
 *     description: No elimina el activo físicamente. Cambia su estado a inactivo (isActive = 0) y su estado físico a "Dado de Baja", generando un último bloque en la cadena del Audit Trail con el motivo exacto de la baja. Requiere token JWT.
 *     tags:
 *       - Activos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del activo a dar de baja.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motivoBaja:
 *                 type: string
 *                 example: Obsolescencia
 *               observacionBaja:
 *                 type: string
 *                 example: El motor fundió y la reparación supera el valor del vehículo.
 *             required:
 *               - motivoBaja
 *               - observacionBaja
 *     responses:
 *       200:
 *         description: Baja lógica realizada exitosamente.
 *       400:
 *         description: Faltan datos obligatorios o el ID es inválido.
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       404:
 *         description: Activo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/delete/:id',validarJWT, isActive, isAdmin, activoController.EliminarActivo);
/**
 * @swagger
 * /api/activo/dashboard/kpis:
 *   get:
 *     summary: Obtiene los KPIs principales para las tarjetas del Dashboard
 *     description: Retorna los conteos globales de activos (Totales, Disponibles, Asignados, En Mantenimiento y Dados de Baja). Requiere token JWT válido.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contadores globales recuperados con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: KPIs del dashboard recuperados exitosamente.
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalActivos:
 *                       type: integer
 *                       example: 184
 *                     disponibles:
 *                       type: integer
 *                       example: 110
 *                     asignados:
 *                       type: integer
 *                       example: 50
 *                     mantenimientos:
 *                       type: integer
 *                       example: 15
 *                     bajas:
 *                       type: integer
 *                       example: 9
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       500:
 *         description: Error interno en el servidor.
 */
router.get('/dashboard/kpis', validarJWT,isActive, activoController.KPIs)
/**
 * @swagger
 * /api/activo/dashboard/sedes:
 *   get:
 *     summary: Obtiene los datos para el gráfico de Activos por Sede
 *     description: Retorna un arreglo con el conteo de activos operativos agrupados por su sede física. Ideal para gráficos de barras o pastel en el dashboard. Requiere token JWT válido.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del gráfico recuperados con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Datos del gráfico por sedes recuperados exitosamente.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       sede:
 *                         type: string
 *                         example: Sede Huachipa
 *                       totalActivos:
 *                         type: integer
 *                         example: 450
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       500:
 *         description: Error interno en el servidor.
 */
router.get('/dashboard/sedes',validarJWT,isActive,activoController.Dashboard)

//Importación


module.exports = router;