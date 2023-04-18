let digimons
let levels
let page = 0;
let maxPage;

function dibujarCarta (digimon) {
  $('#listaDigimons').append(`
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 my-2">
       <div class="card shadow-sm">
        <div class="text-center p-4">
          <img src="${digimon.img}" height="150px" width="150px" alt="${digimon.name}">
        </div>
        <div class="card-body">
          <h4 class="card-title mb-0 font-weight-bold border-info border-0 border-top pt-2">${digimon.name}</h5>
          <span class="card-text text-secondary font-weight-bold font-size-sm">${digimon.level}</span>
        </div>
      </div>
    </div>
  `)
}

function dibujarDigimons () {
  const start = page * 10
  const end = (page + 1) * 10
  $('#listaDigimons').html('');

  for (let i = start; i < end; i++) {
    const digimon = digimons[i]
    dibujarCarta(digimon)
  }
}

function cargarDigimons () {
  for (let i = 0; i < digimons.length; i++) {
    const digimon = digimons[i]
    $('#digimonOpciones').append(`<option value=${digimon.name}></option>`)
  }
}

$.ajax({
  url: "https://digimon-api.vercel.app/api/digimon",
  success: function(response) {
    digimons = response
    page = 0
    maxPage = Math.floor(digimons.length / 10)
    $('#anterior').addClass('disabled')
    cargarDigimons()
    dibujarDigimons()
  }
});

$('#anterior').on('click', function () {
  if (page >= 1) {
    page = page -1
    if (page == maxPage - 1) {
      $('#siguiente').removeClass('disabled')
    }
    if (page === 0) {
      $('#anterior').addClass('disabled')
    }
    dibujarDigimons()
  }
})

$('#siguiente').on('click', function () {
  if (page < maxPage) {
    page = page + 1
    if (page == 1) {
      $('#anterior').removeClass('disabled')
    }
    if (page === maxPage) {
      $('#siguiente').addClass('disabled')
    }
    dibujarDigimons()
  }
})

$('#digimonNombre').on('change', function () {
  $('#error').html('')
})

$('#formulario').on('submit', function(e) {
  e.preventDefault();
  const nombreDigimon = $('#digimonNombre').val()

  if (!nombreDigimon) {
    $('#error').html(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Error:</strong> Debes escribir el nombre de un Digimon para poder ver sus detalles
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `)
  } else {
    for (let i = 0; i < digimons.length; i++) {
      const digimon = digimons[i]
      if (digimon.name == nombreDigimon) {
        $('#modal').html(`
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header border-0">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="text-center">
                <img src="${digimon.img}" height="250px" width="250px" max-width="90%" max-height="90%"alt="${digimon.name}">
              </div>
              <h5 class="modal-title border-info border-0 border-top pt-2">${digimon.name}</h5>
              <span class="card-text text-secondary font-weight-bold font-size-sm">${digimon.level}</span>
            </div>
            <div class="modal-footer p-1 border-0">
              <button type="button" class="btn btn-outline-info border-0" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
        `)
        new bootstrap.Modal('#modal').show()
      }
    }
  }
})
