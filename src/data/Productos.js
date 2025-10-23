import arm01 from '../assets/armas/M4A1_Carbine/M4A1_Carbine.png';
import arm02 from '../assets/armas/AK-47_Tactical.png';
import arm03 from '../assets/armas/Glock_17.png';
import arm04 from '../assets/armas/Desert_Eagle_50AE.png';
import arm05 from '../assets/armas/Scar.png';
import arm06 from '../assets/armas/HK416D.png';
import arm07 from '../assets/armas/M249_SAW.png';
import arm08 from '../assets/armas/MP5_Submachine_Gun.png';
import arm09 from '../assets/armas/P90.png';
import arm10 from '../assets/armas/Shotgun_M870_Tactical.png';
import arm11 from '../assets/armas/Sniper_Rifle_L96_AWS.png';
import arm12 from '../assets/armas/UMP45.png';

export const productos = [
{
id: 1,
slug: "m4a1-carbine",
nombre: "M4A1 Carbine",
precio: 150000,
img: arm01,
cantidad: 10,
tipo: "rifle",
desc: "Rifle de asalto eléctrico (AEG). Versátil y altamente personalizable.",
estadisticas: { daño: 65, alcance: 70, cadencia: 75, precision: 72, movilidad: 78, capacidad: 30 },
ventajas: ["Versátil en la mayoría de escenarios", "Amplia disponibilidad de upgrades"],
desventajas: ["No sobresale en alcance extremo", "Requiere mantenimiento regular"],
uso_recomendado: "Partidas tácticas, asalto medio distancia",
notas: "Economía y disponibilidad lo hacen ideal como arma de entrada para jugadores nuevos y avanzados."
},
{
id: 2,
slug: "ak47-tactical",
nombre: "AK-47 Tactical",
precio: 170000,
img: arm02,
cantidad: 11,
tipo: "rifle",
desc: "Réplica robusta con alto impacto por disparo.",
estadisticas: { daño: 75, alcance: 68, cadencia: 68, precision: 64, movilidad: 70, capacidad: 30 },
ventajas: ["Mayor daño por ráfaga", "Construcción resistente"],
desventajas: ["Retroceso notorio", "Necesita ajustes para precisión"],
uso_recomendado: "Jugadores agresivos que buscan alto impacto",
notas: "Revisar lubricación y gearbox para largo rendimiento."
},
{
id: 3,
slug: "glock-17",
nombre: "Glock 17",
precio: 60000,
img: arm03,
cantidad: 21,
tipo: "pistola",
desc: "Pistola de gas (GBB) semiautomática; buen realismo de retroceso.",
estadisticas: { daño: 40, alcance: 30, cadencia: 60, precision: 60, movilidad: 95, capacidad: 17 },
ventajas: ["Ligera y fiable", "Buena ergonomía"],
desventajas: ["Menor alcance que largas", "Dependiente de gas en frío"],
uso_recomendado: "Backup/sidearm para CQB",
notas: "Mantener sellos y válvulas; usar gas recomendado por el fabricante."
},
{
id: 4,
slug: "desert-eagle",
nombre: "Desert Eagle",
precio: 80000,
img: arm04,
cantidad: 31,
tipo: "pistola",
desc: "Pistola de gran apariencia y alto daño por disparo.",
estadisticas: { daño: 62, alcance: 40, cadencia: 35, precision: 58, movilidad: 65, capacidad: 7 },
ventajas: ["Alto impacto por disparo", "Estética llamativa"],
desventajas: ["Baja cadencia y capacidad", "Retroceso notable"],
uso_recomendado: "Coleccionistas y roles de alto daño puntual",
notas: "No recomendable como arma primaria en partidas largas."
},
{
id: 5,
slug: "fn-scar-l",
nombre: "FN SCAR-L",
precio: 180000,
img: arm05,
cantidad: 12,
tipo: "rifle",
desc: "Rifle AEG modular con buena precisión.",
estadisticas: { daño: 72, alcance: 74, cadencia: 70, precision: 76, movilidad: 72, capacidad: 30 },
ventajas: ["Alta precisión", "Modularidad"],
desventajas: ["Precio/maintenimiento superior (si aplica en el juego real)","No tan ligero como variantes ultramóviles"],
uso_recomendado: "Jugadores que buscan precisión en asaltos/milsim",
notas: "Muy sólido para milsim por estabilidad y opciones de configuración."
},
{
id: 6,
slug: "hk416d",
nombre: "HK416D",
precio: 150000,
img: arm06,
cantidad: 11,
tipo: "rifle",
desc: "Variante moderna del M4, con ergonomía mejorada.",
estadisticas: { daño: 68, alcance: 73, cadencia: 74, precision: 75, movilidad: 74, capacidad: 30 },
ventajas: ["Excelente ergonomía", "Equilibrio entre precisión y cadencia"],
desventajas: ["Costo y repuestos"],
uso_recomendado: "Equipos tácticos y milsim",
notas: "Mantener limpieza regular en el sistema de gas/gearbox."
},
{
id: 7,
slug: "m249-saw",
nombre: "M249 SAW",
precio: 200000,
img: arm07,
cantidad: 17,
tipo: "lmg",
desc: "Réplica de soporte con gran capacidad de fuego sostenido.",
estadisticas: { daño: 70, alcance: 65, cadencia: 88, precision: 55, movilidad: 40, capacidad: 200 },
ventajas: ["Fuego sostenido", "Supresión de área"],
desventajas: ["Poca movilidad", "Mayor consumo de BBs"],
uso_recomendado: "Soporte de equipo y supresión",
notas: "Requiere batería y caja de cambios robusta; calibrar hop-up frecuentemente."
},
{
id: 8,
slug: "mp5",
nombre: "MP5 Submachine Gun",
precio: 100000,
img: arm08,
cantidad: 16,
tipo: "subfusil",
desc: "Compacto y manejable — excelente en espacios cerrados.",
estadisticas: { daño: 50, alcance: 45, cadencia: 80, precision: 66, movilidad: 90, capacidad: 30 },
ventajas: ["Excelente para CQB", "Controlable"],
desventajas: ["Alcance limitado"],
uso_recomendado: "Entradas y CQB",
notas: "Mantener hop-up y lubricación para precisión en ráfagas."
},
{
id: 9,
slug: "p90",
nombre: "P90",
precio: 130000,
img: arm09,
cantidad: 10,
tipo: "subfusil",
desc: "Diseño compacto con cargador superior de alta capacidad.",
estadisticas: { daño: 52, alcance: 48, cadencia: 85, precision: 64, movilidad: 92, capacidad: 50 },
ventajas: ["Gran capacidad y movilidad", "Cadencia alta"],
desventajas: ["Menor precisión a media distancia"],
uso_recomendado: "Roles agresivos y CQB",
notas: "Cuidado con repuestos de cargador por su diseño particular."
},
{
id: 10,
slug: "m870-tactical",
nombre: "M870 Tactical",
precio: 160000,
img: arm10,
cantidad: 15,
tipo: "escopeta",
desc: "Escopeta táctica de corto alcance, ideal para entradas.",
estadisticas: { daño: 90, alcance: 25, cadencia: 30, precision: 40, movilidad: 60, capacidad: 8 },
ventajas: ["Daño devastador a corta distancia"],
desventajas: ["Ineficaz a media-larga distancia", "Recarga lenta"],
uso_recomendado: "CQB extremo, entradas rápidas",
notas: "Práctica en escenarios urbanos; requiere práctica en manejo y recarga."
},
{
id: 11,
slug: "l96-aws",
nombre: "Rifle L96 AWS",
precio: 220000,
img: arm11,
cantidad: 22,
tipo: "sniper",
desc: "Réplica bolt-action de alta precisión para largo alcance.",
estadisticas: { daño: 95, alcance: 98, cadencia: 25, precision: 95, movilidad: 30, capacidad: 5 },
ventajas: ["Alto daño y precisión a larga distancia"],
desventajas: ["Baja cadencia y movilidad"],
uso_recomendado: "Francotirador / control de perímetro",
notas: "Revisar hop-up y canon para mantener agrupación."
},
{
id: 12,
slug: "ump45",
nombre: "UMP45",
precio: 120000,
img: arm12,
cantidad: 20,
tipo: "subfusil",
desc: "Compacto y con buen balance entre daño y control.",
estadisticas: { daño: 58, alcance: 50, cadencia: 78, precision: 68, movilidad: 88, capacidad: 25 },
ventajas: ["Versátil en CQB y medios", "Fácil de controlar"],
desventajas: ["No sobresale en ninguna categoría extrema"],
uso_recomendado: "Partidas rápidas y CQB",
notas: "Buen primer paso para jugadores que no quieren un rifle completo."
}
];
