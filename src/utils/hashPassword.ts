import { hash } from "bcrypt";

if (!process.argv[2]) {
	console.log("Debes ingresar el password como primer argumento");
	process.exit(1);
}
const salt = await hash(process.argv[2], 10);
console.log(salt)