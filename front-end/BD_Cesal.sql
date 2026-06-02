-- =========================================================================
-- NIVEL 1: LOS CIMIENTOS (Tablas Catálogo sin Llaves Foráneas)
-- =========================================================================
create table marca(
    id int auto_increment primary key,
    nombre varchar(100) unique not null
);

create table tipoVehiculo(
    id int auto_increment primary key,
    detalle varchar(100) unique not null
);

create table tipoEquipo(
    id int auto_increment primary key,
    nombre varchar(100) unique not null
);

create table tipoMueble(
    id int auto_increment primary key,
    detalle varchar(100) unique not null
);

create table tipoInmueble(
    id int auto_increment primary key,
    detalle varchar(100) unique not null
);

create table tipoMaquinaria(
    id int auto_increment primary key,
    detalle varchar(100) unique not null
);

create table sistemaOperativo(
    id int auto_increment primary key,
    nombre varchar(100) unique not null
);

create table zonaOperativa(
    id int auto_increment primary key,
    nombre varchar(100) unique not null
);

create table rol(
    id int auto_increment primary key,
    nombre varchar(100) unique not null
);

create table tipoActivo(
    id int auto_increment primary key,
    nombre varchar(100) not null
);

create table estadoActivo(
    id int auto_increment primary key,
    nombre varchar(100) unique not null
);

create table tipoMovimiento(
    id int auto_increment primary key,
    nombre varchar(100) not null
);

create table factura(
    id int auto_increment primary key,
    numeroFactura varchar(50) not null
);

-- =========================================================================
-- NIVEL 2: CATÁLOGOS DEPENDIENTES (Necesitan a los de Nivel 1)
-- =========================================================================
create table sede(
    id int auto_increment primary key,
    idZonaOperativa int,
    nombre varchar(50) not null,

    constraint fk_sede_zonaOperativa foreign key (idZonaOperativa) references zonaOperativa(id) on delete restrict
);

create table unidadOperativa(
    id int auto_increment primary key,
    idSede int,
    nombre varchar(50) not null,

    constraint fk_uOperativa_sede foreign key (idSede) references sede(id) on delete restrict
);

create table ambiente(
    id int auto_increment primary key,
    idUnidadOperativa int,
    nombre varchar(50) not null,

    constraint fk_ambiente_uOperativa foreign key (idUnidadOperativa) references unidadOperativa(id) on delete restrict
);

create table modelo(
    id int auto_increment primary key,
    idMarca int,
    nombre varchar(50) not null,

    constraint uq_marcaModelo unique (idMarca, nombre),
    constraint fk_modelo_marca foreign key (idMarca) references marca(id) on delete restrict
);

-- =========================================================================
-- NIVEL 3: ENTIDADES PRINCIPALES (Usuarios)
-- =========================================================================
create table usuario(
    id int auto_increment primary key,
    correo varchar(100) unique not null,
    password varchar(255) not null,
    idRol int not null,
    isActive boolean default true,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,

    constraint fk_usuario_rol foreign key (idRol) references rol(id) on delete restrict
);

create table detalleUsuario(
    idUsuario int primary key,
    nombre varchar(100) not null,
    apellido varchar(100) not null,
    telefono varchar(50) not null,
    direccion varchar(150) not null,

    constraint fk_detUsuario_usuario foreign key (idUsuario) references usuario(id) on delete restrict
);

-- =========================================================================
-- NIVEL 4: EL PADRE (Activos y Documentos)
-- =========================================================================
create table activo(
    id int auto_increment primary key,
    nombre varchar(100) not null,
    codigoPatrimonial varchar(100) unique not null,
    codigoProveedor varchar(100) unique not null,
    codigoProyecto varchar(100) unique not null,
    idEstado int not null,
    fechaAdquision datetime not null,
    idFactura int not null,
    costo decimal(10,2) not null check (costo > 0),
    idUnidadOperativa int not null,
    idUsuario int not null,
    idTipoActivo int not null,
    isActive boolean default true,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,

    constraint fk_activo_estado foreign key (idEstado) references estadoActivo(id),
    constraint fk_activo_factura foreign key (idFactura) references factura(id),
    constraint fk_activo_uOperativa foreign key (idUnidadOperativa) references unidadOperativa(id),
    constraint fk_activo_usuario foreign key (idUsuario) references usuario(id),
    constraint fk_activo_tipoActivo foreign key (idTipoActivo) references tipoActivo(id)
);

create table documentoCargo(
    id int auto_increment primary key,
    codigoActa varchar(50) unique not null,
    rutaPdfGnerada varchar(255),
    rutaPdfScaneada varchar(255),
    estado varchar(100) default 'inicio',
    fechaGneracion timestamp default current_timestamp,
    fechaFirmada timestamp null,
    fechaValidada timestamp null,
    idAdminValidador int,

    constraint fk_docCargo_adminValidador foreign key (idAdminValidador) references usuario(id) on delete restrict
);

-- =========================================================================
-- NIVEL 5: LAS HIJAS Y EL HISTORIAL (Dependen de todo lo anterior)
-- =========================================================================
create table detalleVehicular(
    idActivo int primary key,
    idMarca int not null,
    idModelo int not null,
    anio date not null,
    chasis varchar(50) unique not null,
    idTipoVehiculo int not null,
    kilometraje decimal(10,2) not null check(kilometraje >= 0),

    constraint fk_detVehicular_activo foreign key (idActivo) references activo(id) on delete cascade,
    constraint fk_detVehicular_marca foreign key (idMarca) references marca(id) on delete restrict,
    constraint fk_detVehicular_modelo foreign key (idModelo) references modelo(id) on delete restrict,
    constraint fk_detVehicular_tipoVehiculo foreign key (idTipoVehiculo) references tipoVehiculo(id) on delete restrict
);

create table detalleInformatico(
    idActivo int primary key,
    idMarca int not null,
    idModelo int not null,
    idTipoEquipo int not null,
    numeroSerie varchar(100) unique not null,
    procesador varchar(100) not null,
    memoriaRAM varchar(50) not null,
    almacenamientoGB int not null check (almacenamientoGB > 0),
    discoDuro int,
    idSistemaOperativo int not null,

    constraint fk_detInfo_activo foreign key (idActivo) references activo(id) on delete cascade,
    constraint fk_detInfo_marca foreign key (idMarca) references marca(id) on delete restrict,
    constraint fk_detInfo_modelo foreign key (idModelo) references modelo(id) on delete restrict,
    constraint fk_detInfo_tipoEquipo foreign key (idTipoEquipo) references tipoEquipo(id) on delete restrict,
    constraint fk_detInfo_so foreign key (idSistemaOperativo) references sistemaOperativo(id) on delete restrict
);

create table detalleMobiliario(
    idActivo int primary key,
    idTipoMueble int not null,
    material varchar(100) not null,
    color varchar(100) not null,
    dimensiones varchar(100),

    constraint fk_detMob_activo foreign key (idActivo) references activo(id) on delete restrict,
    constraint fk_detMob_tipoMueble foreign key (idTipoMueble) references tipoMueble(id) on delete restrict
);

create table detalleInmueble(
    idActivo int primary key,
    idTipoInmueble int not null,
    direccion varchar(150) not null,
    areaTotalM2 decimal(10,2) not null check (areaTotalM2 > 0),

    constraint fk_detInm_activo foreign key (idActivo) references activo(id) on delete restrict,
    constraint fk_detInm_tipoInmueble foreign key (idTipoInmueble) references tipoInmueble(id) on delete restrict
);

create table detalleMaquinaria(
    idActivo int primary key,
    idMarca int not null,
    idModelo int not null,
    numeroSerie varchar(100) unique not null,
    idTipoMaquinaria int not null,

    constraint fk_detMaq_activo foreign key (idActivo) references activo(id) on delete cascade,
    constraint fk_detMaq_marca foreign key (idMarca) references marca(id) on delete restrict,
    constraint fk_detMaq_modelo foreign key (idModelo) references modelo(id) on delete restrict,
    constraint fk_detMaq_tipoMaq foreign key (idTipoMaquinaria) references tipoMaquinaria(id) on delete restrict
);

create table detalleOficina(
    idActivo int primary key,
    idMarca int not null,
    idModelo int not null,
    idTipoEquipo int not null,
    capacidadPotencia varchar(100) not null,
    dimensiones varchar(100),

    constraint fk_detOfi_activo foreign key (idActivo) references activo(id) on delete cascade,
    constraint fk_detOfi_marca foreign key (idMarca) references marca(id) on delete restrict,
    constraint fk_detOfi_modelo foreign key (idModelo) references modelo(id) on delete restrict,
    constraint fk_detOfi_tipoEquipo foreign key (idTipoEquipo) references tipoEquipo(id) on delete restrict
);

create table imagenActivo(
    id int auto_increment primary key,
    idActivo int not null,
    rutaImagen varchar(255) not null,
    descripcion varchar(255),

    constraint fk_imgActivo_activo foreign key (idActivo) references activo(id) on delete cascade
);

create table historialActivo(
    id int auto_increment primary key,
    idActivo int,
    idDocumentoCargo int,
    idTipoMovimiento int,
    UnidadOperativaOrigen int,
    UnidadOperativaDestino int,
    costoAnterior decimal(10,2),
    costoActual decimal(10,2),
    estadoAnterior int,
    estadoActual int,
    observaciones varchar(255),
    fechaMovimiento timestamp default current_timestamp,
    idUsuarioSistema int,
    idUsuarioActual int,
    idUsuarioAnterior int,
    ipOrigen varchar(45),
    hashAnterior varchar(255),
    hashActual varchar(255),

    constraint fk_hist_activo foreign key (idActivo) references activo(id) on delete restrict,
    constraint fk_hist_docCargo foreign key (idDocumentoCargo) references documentoCargo(id) on delete restrict,
    constraint fk_hist_tipoMov foreign key (idTipoMovimiento) references tipoMovimiento(id) on delete restrict,
    constraint fk_hist_uOpOrigen foreign key (UnidadOperativaOrigen) references unidadOperativa(id) on delete restrict,
    constraint fk_hist_uOpDestino foreign key (UnidadOperativaDestino) references unidadOperativa(id) on delete restrict,
    constraint fk_hist_estadoAnt foreign key (estadoAnterior) references estadoActivo(id) on delete restrict,
    constraint fk_hist_estadoAct foreign key (estadoActual) references estadoActivo(id) on delete restrict,
    constraint fk_hist_usuSistema foreign key (idUsuarioSistema) references usuario(id) on delete restrict,
    constraint fk_hist_usuActual foreign key (idUsuarioActual) references usuario(id) on delete restrict,
    constraint fk_hist_usuAnterior foreign key (idUsuarioAnterior) references usuario(id) on delete restrict
);

create table alertaIntegridad(
    id int auto_increment primary key,
    idMovimiento int,
    observacion varchar(255),
    fecha timestamp default current_timestamp,

    constraint fk_alerta_movimiento foreign key (idMovimiento) references historialActivo(id) on delete restrict
);