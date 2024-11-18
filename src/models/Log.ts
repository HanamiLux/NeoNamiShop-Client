export enum LogType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}

export interface Log {
    logId: number;
    userId: string;
    date: Date;
    type: LogType;
    description: string;
    entityName: string;
    entityId: string;
}

export interface CreateLog {
    type: LogType;
    description: string;
    entityName: string;
    entityId: number;
}

export interface UpdateLog extends Partial<CreateLog> {}