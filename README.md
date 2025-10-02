# ✅ Lista de Tareas - Proyecto Web

![status](https://img.shields.io/badge/status-Finalizado-brightgreen?style=for-the-badge)
![php](https://img.shields.io/badge/PHP-8.2-blue?style=for-the-badge&logo=php)
![mysql](https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge&logo=mysql)
![javascript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript)
![css](https://img.shields.io/badge/CSS3-Modern-blue?style=for-the-badge&logo=css3)
![xampp](https://img.shields.io/badge/XAMPP-Apache%20%2B%20MySQL-lightgrey?style=for-the-badge&logo=xampp)

---

## 📌 Descripción
Esta es una **aplicación web de gestión de tareas** desarrollada con **HTML, CSS, JavaScript, PHP y MySQL**. Permite a los usuarios: ➕ Crear nuevas tareas, ✏️ Editar tareas existentes, ✅ Marcar tareas como completadas, ❌ Eliminar tareas y 📅 Visualizar tareas vencidas. La aplicación está pensada para ser **ligera, rápida y funcional** en entornos locales con XAMPP.

## 🎨 Paleta de Colores
| Color    | Hex       | Uso                       |
|----------|-----------|---------------------------|
| Charcoal | `#1C1C1C` | Fondo Header / Botones    |
| Canvas   | `#EAE6E0` | Fondo general             |
| Slate    | `#535366` | Encabezados de tabla      |
| White    | `#FFFFFF` | Texto / Cards             |

## 🚀 Tecnologías Utilizadas
**Frontend:** HTML5, CSS3, JavaScript (ES6) | **Backend:** PHP 8.2 | **Base de datos:** MySQL | **Servidor local:** XAMPP (Apache + MySQL)

## ⚡ Instalación y Uso
1. **Clonar o descargar el repositorio** en la carpeta `htdocs` de XAMPP: `C:\xampp\htdocs\mi-tareas`  
2. **Importar la base de datos** en phpMyAdmin: `CREATE DATABASE tareas_db; USE tareas_db; CREATE TABLE tasks (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255) NOT NULL, detalles TEXT, fecha DATE, completada TINYINT(1) DEFAULT 0);`  
3. **Configurar la conexión** en `api/db.php`: `<?php $host = "localhost"; $user = "root"; $pass = ""; $db = "tareas_db"; $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass); ?>`  
4. **Iniciar Apache y MySQL** desde XAMPP  
5. **Abrir la aplicación** en tu navegador: `http://localhost/mi-tareas/`

## 📁 Estructura del Proyecto

El proyecto `mi-tareas` tiene la siguiente organización:

```plaintext
mi-tareas/                  # Carpeta raíz del proyecto
│
├─ index.html               # Página principal del proyecto
├─ style.css                # Estilos generales
├─ script.js                # Lógica de frontend (JS)
├─ api/                     # Carpeta con el backend (PHP)
│   ├─ db.php               # Conexión a la base de datos
│   ├─ get_tasks.php        # Obtener todas las tareas
│   ├─ add_task.php         # Agregar nueva tarea
│   ├─ edit_task.php        # Editar tarea existente
│   └─ delete_task.php      # Eliminar tarea
└─ README.md                # Documentación del proyecto
```

## 🙌 Créditos
GitHub: [https://github.com/JuanGzu](https://github.com/JuanGzu) | 
GitHub: [https://github.com/caifdev29](https://github.com/caifdev29) | 


