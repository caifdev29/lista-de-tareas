let table;
const storageKey = "tareasData";

// Cargar datos desde LocalStorage
function loadTasks() {
  const data = localStorage.getItem(storageKey);
  return data ? JSON.parse(data) : [];
}

// Guardar datos en LocalStorage
function saveTasks() {
  const data = table.rows().data().toArray();
  localStorage.setItem(storageKey, JSON.stringify(data));
}

// Inicializar tabla
$(document).ready(function () {
  table = $('#taskTable').DataTable({
    data: loadTasks(),
    columns: [
      {
        data: "nombre",
        render: function (data, type, row) {
          const cls = row.completada ? 'completed' : '';
          return `<input type="text" class="edit nombre ${cls}" value="${escapeHtml(data)}">`;
        }
      },
      {
        data: "detalles",
        render: function (data) {
          return `<input type="text" class="edit detalles" value="${escapeHtml(data)}">`;
        }
      },
      {
        data: "fecha",
        render: function (data) {
          return `<input type="date" class="edit fecha" value="${data}">`;
        }
      },
      {
        data: "completada",
        render: function (data) {
          return `<input type="checkbox" class="edit completada" ${data ? "checked" : ""}>`;
        }
      },
      {
        data: null,
        render: function () {
          return `<span class="delete-btn">🗑️</span>`;
        }
      }
    ],
    createdRow: function (rowEl, data) {
      const today = new Date().toISOString().split("T")[0];
      if (!data.completada && data.fecha < today) {
        $(rowEl).addClass("overdue");
      }
    },
    order: [[2, 'asc']],
    paging: false,
    info: false,
    searching: false
  });

  // Agregar nueva tarea
  $('#addTask').on("click", function () {
    table.row.add({
      nombre: "Nueva tarea",
      detalles: "",
      fecha: new Date().toISOString().split("T")[0],
      completada: false
    }).draw(false);
    saveTasks();
  });

  // Editar campos
  $('#taskTable tbody').on("change", ".edit", function () {
    const row = table.row($(this).closest("tr"));
    const data = row.data();

    const input = $(this);
    if (input.hasClass("nombre")) {
      data.nombre = input.val();
    } else if (input.hasClass("detalles")) {
      data.detalles = input.val();
    } else if (input.hasClass("fecha")) {
      data.fecha = input.val();
    } else if (input.hasClass("completada")) {
      data.completada = input.is(":checked");
      input.closest("tr").find(".nombre").toggleClass("completed", data.completada);
      if (data.completada) {
        $(row.node()).removeClass("overdue");
      }
    }

    row.data(data).invalidate().draw(false);
    saveTasks();
  });

  // Eliminar tarea
  $('#taskTable tbody').on("click", ".delete-btn", function () {
    table.row($(this).parents("tr")).remove().draw(false);
    saveTasks();
  });
});

// pequeña función para escapar texto en inputs (evita romper HTML)
function escapeHtml(text){
  if (typeof text !== 'string') return text;
  return text.replace(/[&<>"'`=\/]/g, function (s) {
    return ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'
    })[s];
  });
}
