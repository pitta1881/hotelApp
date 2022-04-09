document.addEventListener('DOMContentLoaded', () => {
  //CARGAR ICONOS DE MARCADORES
  const markerHotel = L.icon({
    iconUrl: './icons/icons8-hotel-40.png',
    iconSize: [40, 51],
    iconAnchor: [20, 51],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const markerPayPerTop = L.icon({
    iconUrl: './icons/marker-icon-red.png',
    shadowUrl: './icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const markerNormal = L.icon({
    iconUrl: './icons/marker-icon-grey.png',
    shadowUrl: './icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const evCenterMap = (e) => {
    var px = mapa.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= e.target._popup._container.clientHeight / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    mapa.panTo(mapa.unproject(px), { animate: true }); // pan to new center
  };
  //CARGAR MAPA
  const mapa = L.map('mapa')
    .setView([-34.6061, -58.952], 15)
    .on('popupopen', evCenterMap)
    .on('popupclose', () => {
      Array.from(listppt).forEach((item) => {
        item.classList.remove('active');
      });
    });
  L.tileLayer(
    'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=2mVjYjN9xq8jxt729yv7',
    {
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    },
  ).addTo(mapa);

  L.marker([-34.6061, -58.952], {
    icon: markerHotel,
  })
    .addTo(mapa)
    .bindPopup(`<b>Hotel Pato</b>`);

  let arrayGastro = [];
  let arrayAtrac = [];
  let arraySuper = [];

  //DATOS QUE VENDRIAN DEL BACK
  const paypertops = [
    {
      id: 1,
      razon_social: 'razon_social 1',
      lat_lng: [-34.60901, -58.95391],
      descripcion: 'PPT 1',
      tipoPPT: 1,
      abono_mensual: 9000,
      activo: true,
    },
    {
      id: 2,
      razon_social: 'razon_social 2',
      lat_lng: [-34.60573, -58.95008],
      descripcion: 'PPT 2',
      tipoPPT: 2,
      abono_mensual: 12000,
      activo: true,
    },
    {
      id: 3,
      razon_social: 'razon_social 3',
      lat_lng: [-34.60508, -58.95202],
      descripcion: 'PPT 3',
      tipoPPT: 3,
      abono_mensual: 7000,
      activo: true,
    },
    {
      id: 4,
      razon_social: 'razon_social 4',
      lat_lng: [-34.6076, -58.956],
      descripcion: 'Normal 1',
      tipoPPT: 1,
      abono_mensual: 0,
      activo: true,
    },
  ];
  //CARGAR MARCADORES
  paypertops.forEach((paypertop) => {
    if (paypertop.activo) {
      const marker = L.marker(paypertop.lat_lng, {
        icon: paypertop.abono_mensual > 0 ? markerPayPerTop : markerNormal,
      }).addTo(mapa);
      marker['id'] = paypertop.id;
      marker.bindPopup(`
        <b>${paypertop.razon_social}</b><br>
        <b>${paypertop.descripcion}</b>
      `);
      if (paypertop.tipoPPT === 1) {
        arrayGastro.push(marker);
      } else if (paypertop.tipoPPT === 2) {
        arrayAtrac.push(marker);
      } else {
        arraySuper.push(marker);
      }
    }
  });

  //FUNCIONES BOTONES SHOW/HIDE
  const btnGastro = document.getElementById('btn-gastro');
  const btnAtrac = document.getElementById('btn-atrac');
  const btnSuper = document.getElementById('btn-super');
  [
    { btn: btnGastro, array: arrayGastro, class: 'list-gastro' },
    { btn: btnAtrac, array: arrayAtrac, class: 'list-atrac' },
    { btn: btnSuper, array: arraySuper, class: 'list-super' },
  ].forEach((boton) => {
    boton.btn.addEventListener('click', (e) => {
      boton.array.forEach((marker) => {
        if (e.target.checked) {
          mapa.addLayer(marker);
        } else {
          mapa.removeLayer(marker);
        }
      });
      const liSelecteds = document.getElementsByClassName(boton.class);
      Array.from(liSelecteds).forEach((li) => {
        li.classList.toggle('show');
      });
    });
  });

  const listppt = document.getElementsByClassName('list-paypertop');
  Array.from(listppt).forEach((item) => {
    item.addEventListener('click', (e) => {
      const markRef = [arrayGastro, arrayAtrac, arraySuper]
        .flat()
        .find((marker) => {
          return marker.id === Number(e.currentTarget.dataset.marker);
        });
      markRef.openPopup();
      Array.from(listppt).forEach((item) => {
        item.classList.remove('active');
      });
      e.currentTarget.classList.add('active');
    });
  });

  document.getElementById('btnList').addEventListener('click', () => {
    document.getElementById('listppt').classList.toggle('active');
  });
});
