export interface Building {
    type: 'building',
    id: number,
    title: string,
    address: string | null,
    floor_amount: number,
    description: string | null
};

export interface BuildingsFacultiesDependence {
    id: number,
    id_buildings: number,
    id_faculties: number
};

export interface Faculty {
    type: 'faculty',
    id: number,
    title: string,
    description: string | null,
    contacts: string | null
};

export interface IUserProfile {
    type: 'user',
    id: string,
    name: string,
    email: string,
    isActive: boolean,
    dataRegistration: string,
    lastChangesDate: string,
    applicationDate: string,
    lastActivityDate: string,
    isTelegram: boolean,
    telegramId: string,
    isAdmin: boolean,
    isSuper: boolean
};

export interface Log {
    type: 'log',
    id: number,
    id_user: number,
    table_name: string,
    id_record: number,
    action: string,
    logdate: string
};