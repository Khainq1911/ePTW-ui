export interface dashboardType {
    total_permits?: number;
    pending?: number | undefined;
    suspend?: number | undefined;
    close?: number | undefined;
    revise?: number | undefined;
    accept?: number | undefined;
}

export interface dashboardParams {
    start: any;
    end: any;
    templateId: number | null;
    senderId: number | null;
}
