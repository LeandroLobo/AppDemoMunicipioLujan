export interface DolarsiResponse {
    casa: Casa;
}

export interface Casa {
    nombre?:           string;
    compra?:           string;
    venta?:            string;
    agencia?:          string;
    observaciones?:    Observaciones;
    geolocalizacion?: Geolocalizacion;
    telefono?:        Observaciones | string;
    direccion?:       Observaciones | string;
    decimales?:        string;
}

export interface Observaciones {
}

export interface Geolocalizacion {
    latitud?:  Observaciones | string;
    longitud?: Observaciones | string;
}
