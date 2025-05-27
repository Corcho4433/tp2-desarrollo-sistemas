import { db } from "../db/db";

export class TableService {
	static instance: TableService;

	constructor() {
		if (TableService.instance) {
			throw new Error("Usa AuthService.getInstance()!");
		}
		TableService.instance = this;
	}

	static getInstance(): TableService {
		if (!TableService.instance) {
			TableService.instance = new TableService();
		}
		return TableService.instance;
	}

	public async createTable() {
		try {
			const table = await db.mesa.create({
				data: {
					estado_mesa: "cmb5nkru20000x01ez8u5mlbr",
				},
			});
			return table;
		} catch (error) {
			throw new Error("Hubo un error al crear la mesa");
		}
	}

	public async getTables() {
		try {
			const tables = await db.mesa.findMany({
				include: {
					estado: true,
				},
			});
			const result = tables.map((mesa) => ({
				numero: mesa.id,
				estado: mesa.estado.estado,
			}));
			return result;
		} catch (error) {
			throw new Error("Hubo un error al conseguir las mesas");
		}
	}
}
