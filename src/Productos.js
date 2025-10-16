import arm01 from './assets/armas/M4A1_Carbine/M4A1_Carbine.png';
import arm02 from './assets/armas/AK-47_Tactical.png';
import arm03 from './assets/armas/Glock_17.png';
import arm04 from './assets/armas/Desert_Eagle_50AE.png';
import arm05 from './assets/armas/Scar.png';
import arm06 from './assets/armas/HK416D.png';
import arm07 from './assets/armas/M249_SAW.png';
import arm08 from './assets/armas/MP5_Submachine_Gun.png';
import arm09 from './assets/armas/P90.png';
import arm10 from './assets/armas/Shotgun_M870_Tactical.png';
import arm11 from './assets/armas/Sniper_Rifle_L96_AWS.png';
import arm12 from './assets/armas/UMP45.png';

export const productos = [
  { id: 1, nombre: "M4A1 Carbine", precio: 150000, img: arm01, cantidad: 1, tipo: "rifle", desc: "Rifle de asalto eléctrico (AEG). Versátil y altamente personalizable, ideal para principiantes y veteranos." },
  { id: 2, nombre: "AK-47 Tactical", precio: 170000, img: arm02, cantidad: 1, tipo: "rifle", desc: "Réplica del clásico fusil soviético. Robusto, fiable y con alta capacidad de cargador." },
  { id: 3, nombre: "Glock 17", precio: 60000, img: arm03, cantidad: 1, tipo: "pistola", desc: "Pistola de gas (GBB) semiautomática. Ligera y con buena ergonomía, con realismo en retroceso." },
  { id: 4, nombre: "Desert Eagle", precio: 80000, img: arm04, cantidad: 1, tipo: "pistola", desc: "Pistola pesada y visualmente imponente. Más para coleccionistas o roles específicos que para uso general." },
  { id: 5, nombre: "FN SCAR-L", precio: 180000, img: arm05, cantidad: 1, tipo: "rifle", desc: "Rifle de asalto eléctrico (AEG). Modular, con excelente precisión y diseño moderno." },
  { id: 6, nombre: "HK416D", precio: 150000, img: arm06, cantidad: 1, tipo: "rifle", desc: "Variante moderna del M4 con mejor ergonomía y precisión. Muy usado en milsim." },
  { id: 7, nombre: "M249 SAW", precio: 200000, img: arm07, cantidad: 1, tipo: "lmg", desc: "Réplica de apoyo con gran cadencia de fuego. Ideal para cubrir a compañeros." },
  { id: 8, nombre: "MP5 Submachine Gun", precio: 100000, img: arm08, cantidad: 1, tipo: "subfusil", desc: "Subfusil compacto, manejable en espacios cerrados y con buena cadencia." },
  { id: 9, nombre: "P90", precio: 130000, img: arm09, cantidad: 1, tipo: "subfusil", desc: "Subfusil eléctrico. diseño futurista y cargador superior. Popular en escenarios de combate cercano." },
  { id: 10, nombre: "M870 Tactical", precio: 160000, img: arm10, cantidad: 1, tipo: "escopeta", desc: "Escopeta táctica de corto alcance. Ideal para combates en espacios cerrados." },
  { id: 11, nombre: "Rifle L96 AWS", precio: 220000, img: arm11, cantidad: 1, tipo: "sniper", desc: "Réplica de precisión, usada por jugadores de rol de francotirador. Disparo certero y gran alcance." },
  { id: 12, nombre: "UMP45", precio: 120000, img: arm12, cantidad: 1, tipo: "subfusil", desc: "Compacto, perfecto para juegos en interiores (CQB). Ligero y con gran cadencia de disparo." }
];