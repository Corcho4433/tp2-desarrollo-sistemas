import type { Administrador, Cliente } from "@prisma/client";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SECRET_KEY: string;
		}
	}
	namespace Express {
		interface Request {
			user?: {
				id: string;	
				role: string
			};
		}
	}
}