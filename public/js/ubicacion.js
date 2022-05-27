document.addEventListener('DOMContentLoaded', async () => {
  //CARGAR ICONOS DE MARCADORES
  const markerHotel = L.icon({
    iconUrl: '/icons/icons8-hotel-40.png',
    iconSize: [40, 51],
    iconAnchor: [20, 51],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const markerPayPerTop = L.icon({
    iconUrl: '/icons/marker-icon-red.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const markerNormal = L.icon({
    iconUrl: '/icons/marker-icon-grey.png',
    shadowUrl: '/icons/marker-shadow.png',
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
  const lat_lng = document
    .getElementById('mapa')
    .getAttribute('data-lat-lng')
    .split(',');
  const mapa = L.map('mapa')
    .setView([lat_lng[0], lat_lng[1]], 15)
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

  L.marker([lat_lng[0], lat_lng[1]], {
    icon: markerHotel,
  })
    .addTo(mapa)
    .bindPopup(
      `<b>${document
        .getElementById('mapa')
        .getAttribute('data-nombre-hotel')}</b>`,
    );

  let arrayGastro = [];
  let arrayAtrac = [];
  let arraySuper = [];

  //CARGO LOS PAYPERTOPS
  const hotelUri = location.pathname.split('/')[1];
  const paypertops = await fetch(
    `${location.origin}/api/paypertop/hotel/${hotelUri}`,
  )
    .then((response) => response.json())
    .then((dataJson) => dataJson.data);

  //CARGAR MARCADORES
  let innerHTMLMarkers = ``;
  paypertops.forEach((paypertop) => {
    if (paypertop.activo) {
      const premium = paypertop.abono_mensual > 0;
      const marker = L.marker(paypertop.lat_lng, {
        icon: premium ? markerPayPerTop : markerNormal,
      }).addTo(mapa);
      marker['id'] = paypertop.id;
      marker.bindPopup(`
        <b>${paypertop.razon_social}</b><br>
        <small>${paypertop.descripcion}</small><br>
        <a href="${paypertop.url}">${paypertop.url}</a>
      `);
      let tipoList;
      let tipoImg;
      if (paypertop.tipoPPT.id === 1) {
        arrayGastro.push(marker);
        tipoList = 'list-gastro';
        tipoImg = '/icons/food-svgrepo-com.svg';
      } else if (paypertop.tipoPPT.id === 2) {
        arrayAtrac.push(marker);
        tipoList = 'list-atrac';
        tipoImg = '/icons/balloon-svgrepo-com.svg';
      } else {
        arraySuper.push(marker);
        tipoList = 'list-super';
        tipoImg = '/icons/supermarket-cart-svgrepo-com.svg';
      }
      innerHTMLMarkers += `
        <li class="list-paypertop ${tipoList} show" 
          data-marker="${paypertop.id}">
          <img src="${tipoImg}" />
          ${
            premium ? '<img src="/icons/star-svgrepo-com.svg" />' : ''
          }          
          <span>${paypertop.razon_social}</span>
        </li>
      `;
    }
  });
  const listpptContainer = document.getElementById('listppt');
  const ulListPPT = listpptContainer.getElementsByTagName('ul')[0];
  ulListPPT.innerHTML = innerHTMLMarkers;

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
