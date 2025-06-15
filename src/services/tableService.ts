import { db } from "../db/db.js";

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
			const last_id = await db.mesa.count();
			const id = last_id + 1;
			const table = await db.mesa.create({
				data: {
					id: id,
					estado_mesa: "cmb5nkru20000x01ez8u5mlbr",
				},
			});
			return table;
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al crear la mesa");
		}
	}

	public async deleteTable(id: number) {
		try {
			const table = await db.mesa.delete({
				where: {
					id: id,
				},
			});
			return table;
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al eliminar la mesa. Revisar datos.");
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
			console.error(error);
			throw new Error("Hubo un error al conseguir las mesas");
		}
	}

	public async reserveTable(id: number, id_cliente: string) {
		try {
			const mesa = await db.mesa.update({
				where: {
					id: id,
					estado_mesa: "cmb5nkru20000x01ez8u5mlbr",
				},
				data: {
					estado_mesa: "cmb5nkru20000x01ez8u5mlbq",
					id_cliente: id_cliente,
				},
			});
			return mesa;
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al reservar la mesa. Revisar disponibilidad");
		}
	}

	public async freeTable(id: number) {
		try {
			const mesa = await db.mesa.update({
				where: {
					id: id,
				},
				data: {
					estado_mesa: "cmb5nkru20000x01ez8u5mlbr",
					id_cliente: null,
				},
			});
			return mesa;
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al liberar la mesa. Revisar datos.");
		}
	}
}
