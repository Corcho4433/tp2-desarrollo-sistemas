import { db } from "../db/db.js";

export class MenuService {
	static instance: MenuService;

	constructor() {
		if (MenuService.instance) {
			throw new Error("Usa AuthService.getInstance()!");
		}
		MenuService.instance = this;
	}

	static getInstance(): MenuService {
		if (!MenuService.instance) {
			MenuService.instance = new MenuService();
		}
		return MenuService.instance;
	}

	public async addDish(
		nombre: string,
		descripcion: string,
		precio: number,
		categoria: string,
	) {
		try {
			const categoria_encontrada = await db.categorias.findFirst({
				where: {
					categoria: categoria,
				},
			});

			if (!categoria_encontrada) {
				throw new Error("Categoría no encontrada");
			}

			const dish = await db.menu.create({
				data: {
					nombre,
					descripcion,
					precio,
					categoria: categoria_encontrada.id,
				},
			});
			return dish;
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al agregar el plato. Revisar datos.");
		}
	}

	public async deleteDish(id_plato: string) {
		try {
			const dish = await db.menu.delete({
				where: {
					id: id_plato,
				},
			});
			return dish;
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al eliminar el plato. Revisar datos.");
		}
	}

	public async getMenu() {
		try {
			const menu = await db.menu.findMany({
				select: {
					nombre: true,
					descripcion: true,
					precio: true,
					categoria_plato: {
						select: {
							categoria: true,
						},
					},
				},
			});

			if (!menu || menu.length === 0) {
				throw new Error("No se encontraron platos");
			}

			return menu;
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al conseguir el menú");
		}
	}

	public async getPrice(id_plato: string) {
		try {
			const plato = await db.menu.findUnique({
				where: {
					id: id_plato,
				},
				select: {
					precio: true,
				},
			});
			if (!plato) {
				throw new Error("No se encontro el plato. Revisar datos.");
			}
			return plato.precio;
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al consultar el precio del plato");
		}
	}
}
