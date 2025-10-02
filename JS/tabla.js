let table;

// pequeña función para escapar texto en inputs (evita romper HTML)
function escapeHtml(text){
  if (typeof text !== 'string') return text;
  return text.replace(/[&<>"'`=\/]/g, function (s) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'})[s];
  });
}

// fetch wrappers
async function apiGet(path){
  const res = await fetch(path);
  return res.json();
}
async function apiPost(path, payload){
  const res = await fetch(path, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  return res.json();
}

async function loadTasksFromServer() {
  const tasks = await apiGet('api/get_tasks.php');
  return tasks.map(t => ({
    id: t.id,
    nombre: t.nombre,
    detalles: t.detalles,
    fecha: t.fecha,
    completada: Boolean(parseInt(t.completada))
  }));
}

$(document).ready(async function () {
  const initialData = await loadTasksFromServer();

  table = $('#taskTable').DataTable({
    data: initialData,
    columns: [
      {
        data: "nombre",
        render: function (data, type, row) {
          const cls = row.completada ? 'completed' : '';
          return `<input type="text" data-id="${row.id||''}" class="edit nombre ${cls}" value="${escapeHtml(data)}">`;
        }
      },
      {
        data: "detalles",
        render: function (data, type, row) {
          return `<input type="text" data-id="${row.id||''}" class="edit detalles" value="${escapeHtml(data)}">`;
        }
      },
      {
        data: "fecha",
        render: function (data, type, row) {
          return `<input type="date" data-id="${row.id||''}" class="edit fecha" value="${data}">`;
        }
      },
      {
        data: "completada",
        render: function (data, type, row) {
          return `<input type="checkbox" data-id="${row.id||''}" class="edit completada" ${data ? "checked" : ""}>`;
        }
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<span data-id="${row.id||''}" class="delete-btn">🗑️</span>`;
        }
      }
    ],
    order: [[2, 'asc']],
    paging: false,
    info: false,
    searching: false
  });

  // Agregar nueva tarea -> llama API add_task.php
  $('#addTask').on("click", async function () {
    const newTask = {
      nombre: "Nueva tarea",
      detalles: "",
      fecha: new Date().toISOString().split("T")[0],
      completada: false
    };
    const res = await apiPost('api/add_task.php', newTask);
    // `res` contiene el objeto creado con `id`
    table.row.add(res).draw(false);
  });

  // Editar campos -> update_task.php
  $('#taskTable tbody').on("change", ".edit", async function () {
    const input = $(this);
    const rowEl = input.closest('tr');
    const row = table.row(rowEl);
    const data = row.data() || {};

    const id = input.attr('data-id') || data.id;
    if (!id) {
      // sin id (no guardado) — puede ocurrir raro; mejor recargar
      return;
    }

    if (input.hasClass("nombre")) {
      data.nombre = input.val();
    } else if (input.hasClass("detalles")) {
      data.detalles = input.val();
    } else if (input.hasClass("fecha")) {
      data.fecha = input.val();
    } else if (input.hasClass("completada")) {
      data.completada = input.is(":checked");
      input.closest("tr").find(".nombre").toggleClass("completed", data.completada);
      if (data.completada) $(row.node()).removeClass("overdue");
    }

    // actualizar tabla localmente
    row.data(data).invalidate().draw(false);

    // enviar actualización al servidor
    await apiPost('api/update_task.php', { id: id, nombre: data.nombre, detalles: data.detalles, fecha: data.fecha, completada: data.completada ? 1 : 0 });
  });

  // Eliminar tarea -> delete_task.php
  $('#taskTable tbody').on("click", ".delete-btn", async function () {
    const id = $(this).attr('data-id');
    if (id) {
      await apiPost('api/delete_task.php', { id: id });
    }
    table.row($(this).parents('tr')).remove().draw(false);
  });

});
