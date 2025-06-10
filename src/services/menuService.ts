import { db } from "../db/db";

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
			throw new Error("Hubo un error al agregar el plato");
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

	public async getTotalPrice(platos: string[]) {
		try {
			const platos_encontrados = await db.menu.findMany({
				where: {
					id: {
						in: platos,
					},
				},
				select: {
					precio: true,
				},
			});
			if (!platos_encontrados || platos_encontrados.length === 0) {
				throw new Error("No se encontraron platos. Revisar ID.");
			}
			const total = platos_encontrados.reduce((acum, plato) => acum + plato.precio, 0);
			return total;
		}
		catch (error) {
			console.error(error);
		}
	}
}
