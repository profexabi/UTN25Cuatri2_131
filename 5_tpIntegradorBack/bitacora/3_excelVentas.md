# 3. Descargando excels de productos y ventas
#### Primero tenemos que instalar [exceljs](https://www.npmjs.com/package/exceljs)
```sh
npm install exceljs
```


---


### 3.1 Descarga de excels de productos
- Ahora vamos a crear el endpoint para poder descargar un excel con todo nuestro inventario. Lo ideal sería que un botón en el nav hiciera esa llamada a este endpoint, tipo "Descargar productos".
```js
// index.js
// Importando ExcelJS en nuestro archivo principal (recuerden modularizar!)
import ExcelJS from "exceljs";


// Endpoint descarga Excel productos
app.get("/export/products", async (req, res) => {
	try {
		// 1. Obtener datos de MySQL
		const sql = "SELECT * FROM products";
		const [rows] = await connection.query(sql);

		// 2. Crear libro y hoja
		const workbook = new ExcelJS.Workbook(); // Crea un nuevo archivo (libro) Excel en memoria
		const worksheet = workbook.addWorksheet("Produtos"); // Crea una hoja de trabajo llamada "Produtos" dentro del libro.

		// 3. Encabezados
		worksheet.columns = [ // Define las columnas de la hoja
			{ header: "ID", key: "id", width: 10 }, // El texto que aparecerá en la primera fila como título.
			{ header: "Nombre", key: "name", width: 30 }, // La clave que vincula cada columna con la propiedad de los objetos en `rows`.
			{ header: "Precio", key: "price", width: 15 } // Ancho de la columna (en caracteres aproximados).
		];

		// 4. Agregar datos
		rows.forEach(row => worksheet.addRow(row)); // Recorre todos los registros que obtiene de mysql
		// Inserta cada registro como una nueva fila en la hoja, emparejando propiedades del objeto con las `key` definidas en `worksheet.columns`.

		// 5. Configurar la respuesta HTTP para la descarga
		res.setHeader( // Define cabeceras HTTP para que el navegador sepa que la respuesta es un archivo Excel.
			"Content-Type", // Tipo MIME oficial para archivos `.xlsx`.
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
		);
		// `attachment` indica que el navegador debe descargar el archivo en vez de mostrarlo, y `filename=productos.xlsx` sugiere el nombre del archivo.
		res.setHeader("Content-Disposition", "attachment; filename=productos.xlsx");


		// 6. Enviar al archivo
		// Escribe el contenido del libro Excel directamente en la respuesta HTTP (`res`), sin crear un archivo temporal en disco.
		await workbook.xlsx.write(res); // Espera a que se complete la escritura antes de continuar.
		
		res.end(); // Cierra la respuesta HTTP.

		
	} catch (error) {
		console.error(error); // Muestra el error en la consola del servidor.
		res.status(500).json({
			message: "Error exportando a Excel"
		})
	}
});
```


---



### 3.2 Descarga de excels de ventas
- Ahora vamos a crear el endpoint para poder descargar un excel con todas nuestras ventas. Crearemos otro botón en el nav que llame a este nuevo endpoint, tipo "Descargar ventas".
```js
// Endpoint descarga Excel ventas
app.get("/export/sales", async (req, res) => {
    try {
        // 1. Obtener datos de MySQL
        const sql = `
            SELECT 
                s.id AS sale_id,
                s.date,
                s.total_price,
                s.user_name,
                GROUP_CONCAT(p.name SEPARATOR ', ') AS products
            FROM sales s
            LEFT JOIN product_sales ps ON s.id = ps.sale_id
            LEFT JOIN products p ON ps.product_id = p.id
            GROUP BY s.id
            ORDER BY s.date DESC
        `;
        
        /* Entendiendo esta sentencia!

        - `s.id AS sale_id`: toma el ID de la venta de la tabla `sales` y lo renombra como `sale_id`.
		
        - `s.date`, `s.total_price`, `s.user_name`: columnas de la venta.
		
        - `GROUP_CONCAT(p.name SEPARATOR ', ') AS products`: concatena todos los nombres de productos asociados a la venta en una sola celda, separados por comas.

		- `FROM sales s`: tabla principal es `sales`, con alias `s`.
		- `LEFT JOIN product_sales ps ON s.id = ps.sale_id`: une la tabla `product_sales` para saber qué productos tiene cada venta. Es LEFT JOIN para incluir ventas aunque no tengan productos (no se pierden filas).

        - `LEFT JOIN products p ON ps.product_id = p.id`: une la tabla `products` para obtener los nombres de los productos.
        
        
		- `GROUP BY s.id` Agrupa todas las filas por `s.id` (una fila por venta). Es necesario porque `GROUP_CONCAT` funciona sobre grupos, así cada venta genera una fila con todos sus productos concatenados.
		
        - `ORDER BY s.date DESC` Ordena las ventas por fecha de forma descendente.*/
        
        const [rows] = await connection.query(sql);

        // 2. Crear libro y hoja
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Ventas");

        // 3. Definir columnas del Excel
        worksheet.columns = [
            { header: "ID Venta", key: "sale_id", width: 10 },
            { header: "Fecha", key: "date", width: 25 },
            { header: "Usuario", key: "user_name", width: 30 },
            { header: "Total", key: "total_price", width: 15 },
            { header: "Productos", key: "products", width: 50 }
        ];

        // 4. Insertar datos
        rows.forEach(row =>worksheet.addRow(row));

        // 5. Cabeceras HTTP para descarga
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", "attachment; filename=ventas.xlsx");

        // 6. Enviar el archivo Excel
        await workbook.xlsx.write(res);

        res.end();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error exportando ventas a Excel"
        });
    }
});
```

---

### 3.3 Endpoints listos! Falta simplemente modularizar y crear los botones que hagan esa peticion a nuestor endpoint