// Main script: renders the full menu (names + prices) and registers the PWA service worker
// Centralized contact config
const PHONE_NUMBER = '213556690586'; // Algeria phone (no +)
const WHATSAPP_BASE = `https://wa.me/${PHONE_NUMBER}?text=`;

function makeWhatsAppLink(itemName){
  const message = `I'd like to order: ${itemName}`;
  return WHATSAPP_BASE + encodeURIComponent(message);
}

const MENU_DATA = [
  {sectionKey:'coffee', title:{en:'COFFEE'}, items:[
    {name:'Espresso',price:'100 DA'},{name:'Espresso Arabica',price:'200 DA'},{name:'Ristretto',price:'100 DA'},{name:'Lungo',price:'150 DA'},{name:'Decaffeinato',price:'150 DA'},{name:'Nutella',price:'250 DA'},{name:'Pistachio',price:'250 DA'},{name:'Americano',price:'150 DA'},{name:'Double Espresso',price:'200 DA'},{name:'Tea Citron',price:'100 DA'}
  ]},
  {sectionKey:'cappuccino', title:{en:'CAPPUCCINO'}, items:[{name:'Classic',price:'200 DA'},{name:'Noisette',price:'300 DA'},{name:'Milka',price:'300 DA'},{name:'Caramel',price:'300 DA'},{name:'Vanille',price:'300 DA'}]},
  {sectionKey:'hot_chocolate', title:{en:'HOT CHOCOLATE'}, items:[{name:'Hot Chocolate',price:'200 DA'}]},
  {sectionKey:'iced_coffee', title:{en:'ICED COFFEE'}, items:[{name:'Classic',price:'300 DA'},{name:'Nutella',price:'450 DA'},{name:'Honey',price:'400 DA'},{name:'Lotus',price:'400 DA'},{name:'Pistachio',price:'400 DA'},{name:'Iced Tea',price:'250 DA'}]},
  {sectionKey:'frappuccino', title:{en:'FRAPPUCCINO'}, items:[{name:'Caramel',price:'350 DA'},{name:'Chocolate',price:'350 DA'},{name:'Lotus',price:'450 DA'}]},
  {sectionKey:'milkshake', title:{en:'MILKSHAKE'}, items:[{name:'Nutella',price:'400 DA'},{name:'Chocolate',price:'300 DA'},{name:'Biscuit',price:'350 DA'},{name:'Energy',price:'300 DA'},{name:'Banana',price:'300 DA'},{name:'Strawberry',price:'350 DA'},{name:'Pistachio',price:'400 DA'},{name:'Lotus',price:'400 DA'},{name:'Milkshake Strike',price:'500 DA'}]},
  {sectionKey:'natural_juices', title:{en:'NATURAL JUICES'}, items:[{name:'Lemon',price:'250 DA'},{name:'Orange',price:'300 DA'},{name:'Pineapple',price:'300 DA'}]},
  {sectionKey:'cocktail', title:{en:'COCKTAIL'}, items:[{name:'Strawberry',price:'300 DA'},{name:'Strawberry Lemon',price:'300 DA'},{name:'Cocktail',price:'300 DA'},{name:'Cocktail Strike',price:'500 DA'},{name:'Pomegranate',price:'300 DA'}]},
  {sectionKey:'mojito', title:{en:'MOJITO'}, items:[{name:'Classic',price:'250 DA'},{name:'Curacao Blue',price:'350 DA'},{name:'Strawberry',price:'300 DA'},{name:'Pina Colada',price:'350 DA'},{name:'Galaxy',price:'500 DA'}]},
  {sectionKey:'crepes', title:{en:'CREPES'}, items:[{name:'Simple',price:'200 DA'},{name:'Nutella',price:'300 DA'},{name:'Banana',price:'250 DA'},{name:'Pistachio',price:'350 DA'},{name:'Mix',price:'450 DA'},{name:'Sushi',price:'400 DA'},{name:'Strike',price:'700 DA'}]},
  {sectionKey:'mini_pancakes', title:{en:'MINI PANCAKES'}, items:[{name:'Chocolate',price:'250 DA'},{name:'Nutella',price:'350 DA'},{name:'Banana',price:'300 DA'},{name:'Strike',price:'500 DA'}]},
  {sectionKey:'crepe_crispy', title:{en:'CREPE CRISPY'}, items:[{name:'Chocolate',price:'250 DA'},{name:'Nutella',price:'300 DA'},{name:'Banana',price:'300 DA'},{name:'Pistachio',price:'350 DA'},{name:'Mix',price:'450 DA'},{name:'Strike',price:'750 DA'}]},
  {sectionKey:'browns', title:{en:'BROWNS'}, items:[{name:'Classic',price:'120 DA'},{name:'Nutella',price:'200 DA'},{name:'Pistachio',price:'200 DA'}]},
  {sectionKey:'cascada', title:{en:'CASCADA'}, items:[{name:'Cascada Strike',price:'500 DA'}]},
  {sectionKey:'creme_brule', title:{en:'CREME BRULE'}, items:[{name:'Creme Brule',price:'150 DA'}]},
  {sectionKey:'cheesecake', title:{en:'CHEESECAKE'}, items:[{name:'Nutella',price:'350 DA'},{name:'Lotus',price:'350 DA'},{name:'Pistachio',price:'350 DA'},{name:'Fruit',price:'350 DA'},{name:'Bueno',price:'350 DA'}]},
  {sectionKey:'tiramisu', title:{en:'TIRAMISU'}, items:[{name:'Classic',price:'280 DA'},{name:'Mini Classic',price:'150 DA'},{name:'Mini Nutella',price:'250 DA'},{name:'Mini Lotus',price:'250 DA'},{name:'Mini Pistachio',price:'250 DA'},{name:'Mini Fruit',price:'250 DA'},{name:'Mini Bueno',price:'250 DA'}]},
  {sectionKey:'mini_donut', title:{en:'MINI DONUT'}, items:[{name:'Chocolate (9/12/18)',price:'200 / 250 / 350 DA'},{name:'Nutella (9/12/18)',price:'300 / 350 / 450 DA'},{name:'Banana (9/12/18)',price:'250 / 300 / 400 DA'},{name:'Pistachio (9/12/18)',price:'250 / 300 / 400 DA'},{name:'Mix (9/12/18)',price:'400 / 500 / 600 DA'},{name:'Strike (9/12/18)',price:'500 / 600 / 700 DA'}]},
  {sectionKey:'fruit_salad', title:{en:'FRUIT SALAD'}, items:[{name:'Salade Strike',price:'350 DA'}]}
];

function buildMenu(){
  const container = document.getElementById('menu-container');
  if(!container) return;
  container.innerHTML = '';
  MENU_DATA.forEach(section=>{
    const sec = document.createElement('section');
    sec.className = 'menu-section';
    const h = document.createElement('h2'); h.textContent = section.title.en;
    sec.appendChild(h);
    const grid = document.createElement('div'); grid.className = 'grid';
    section.items.forEach(item=>{
      const card = document.createElement('div'); card.className = 'card menu';
      const name = document.createElement('div'); name.textContent = item.name;
      const right = document.createElement('div'); right.style.display='flex'; right.style.gap='8px'; right.style.alignItems='center';
      const price = document.createElement('div'); price.className='price'; price.textContent = item.price;
      const order = document.createElement('a'); order.className='order-btn'; order.textContent='Order';
      order.href = makeWhatsAppLink(item.name);
      order.target='_blank';
      order.rel = 'noopener noreferrer';
      order.setAttribute('aria-label', `Order ${item.name} via WhatsApp`);
      right.appendChild(price); right.appendChild(order);
      card.appendChild(name); card.appendChild(right);
      grid.appendChild(card);
    });
    sec.appendChild(grid);
    container.appendChild(sec);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  buildMenu();
  // register service worker for PWA
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('Service worker registered:', reg.scope);
        if(reg.waiting) console.log('SW waiting');
        if(reg.installing) console.log('SW installing');
        reg.addEventListener('updatefound', ()=> console.log('SW update found'));
      })
      .catch(err=>console.log('SW register failed',err));
  }
  // PWA beforeinstallprompt handling
  let deferredPrompt;
  const installBtn = document.getElementById('installBtn');
  if(installBtn){
    installBtn.style.display = 'none';
    installBtn.setAttribute('aria-hidden','true');
  }
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if(installBtn){ installBtn.style.display = 'inline-block'; installBtn.setAttribute('aria-hidden','false'); }
  });
  if(installBtn){
    installBtn.addEventListener('click', async () => {
      if(!deferredPrompt) return;
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if(choice.outcome === 'accepted'){
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
      installBtn.style.display = 'none';
      installBtn.setAttribute('aria-hidden','true');
    });
  }
  window.addEventListener('appinstalled', () => {
    console.log('PWA installed');
  });
});
