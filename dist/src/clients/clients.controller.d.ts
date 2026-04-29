import { ClientsService } from './clients.service';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    findAll(search?: string, location?: string, page?: string, limit?: string): Promise<{
        data: {
            id: number;
            slNo: number | null;
            name: string;
            location: string | null;
            address: string | null;
            contactPerson: string | null;
            contactNo: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findAllForMap(): Promise<{
        id: number;
        slNo: number | null;
        name: string;
        location: string | null;
        address: string | null;
        contactPerson: string | null;
        contactNo: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getLocations(): Promise<string[]>;
    getStats(): Promise<{
        total: number;
        byLocation: {
            location: string;
            count: number;
        }[];
    }>;
}
