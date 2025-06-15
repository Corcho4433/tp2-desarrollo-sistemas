# tp2-desarrollo-sistemas

Integrantes: Lisandro Garcia Seminara, Agustin Pizzano

Para instalar las dependencias:

```bash
npm install
```

Para compilar:

```bash
npm run build
```

Para ejecutar:

```bash
npm run start
```

Para ejecutar en modo de desarrollo:

```bash
npm run dev
```

Este proyecto fue creado usando `npm init` en npm v11.4.1.

Originalmente creado con [bun](https://bun.sh) v1.2.6. Pero luego fue migrado a NodeJS por la consigna del trabajo.

El trabajo consta de Routers, Services, Middleware (para la autenticación), abstracción de la base de datos con Prisma y un index.ts para iniciar el servidor.

La carpeta utils contiene modulos que fueron usados para cargar datos manualmente en la base de datos. Se puede obviar ya que se uso para fines de seeding manual necesarios (como crear administradores, definir los estados, definir las categorías, etc.).

Se trata de una *arquitectura monolítica* (ya que este repositorio contiene todos los componentes necesarios para la aplicación) separada en capas (Controllers, Services y Models) conformando una API REST, con un archivo principal, index.ts, que se encarga de iniciar el servidor y cargar las rutas. 