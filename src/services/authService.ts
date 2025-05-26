export class AuthService {
	static instance: AuthService;

	constructor() {
		if (AuthService.instance) {
			throw new Error("Usa AuthService.getInstance()!");
		}
		AuthService.instance = this;
	}

	static getInstance(): AuthService {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService();
		}
		return AuthService.instance;
	}

	public async login(email: string, password: string): Promise<boolean> {
		return true;
	}

	public async registerUser(
		email: string,
		nombre: string,
		correo: string,
		telefono: string,
		domicilio_envio: string,
		contrasena: string,
	): Promise<boolean> {
		return true;
	}

	public async registerAdmin(email: string): Promise<boolean> {
		return true;
	}
}
