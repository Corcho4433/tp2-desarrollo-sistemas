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