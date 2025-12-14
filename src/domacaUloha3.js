// Arrays of names and surnames
const muzskePriezvisko = [
  "Novák","Svoboda","Novotný","Dvořák","Černý","Procházka","Kučera","Veselý","Horák","Němec",
  "Marek","Pospíšil","Pokorný","Hájek","Král","Jelínek","Růžička","Beneš","Fiala","Sedláček",
  "Doležal","Zeman","Kolář","Urban","Vašek","Kopecký","Šimek","Malý","Kadlec","Čech",
  "Říha","Holub","Bláha","Moravec","Beran","Krejčí","Tichý","Pavlík","Vondrák","Matouš",
  "Straka","Soukup","Vlček","Krupa","Štěpánek","Bartoš","Kovařík","Benda","Hlaváček","Konečný"
];

const zenskePriezvisko = [
  "Nováková","Svobodová","Novotná","Dvořáková","Černá","Procházková","Kučerová","Veselá",
  "Horáková","Němcová","Marková","Pospíšilová","Pokorná","Hájková","Králová","Jelínková",
  "Růžičková","Benešová","Fialová","Sedláčková","Doležalová","Zemanová","Kolářová",
  "Urbanová","Vašková","Kopecká","Šimková","Malá","Kadlecová","Čechová","Říhová",
  "Holubová","Bláhová","Moravcová","Beranová","Krejčíková","Tichá","Pavlíková",
  "Vondráková","Matoušová","Straková","Soukupová","Vlčková","Krupová","Štěpánková",
  "Bartošová","Kovaříková","Bendová","Hlaváčková","Konečná"
];

const muzskeMeno = [
  "Adam","Adrian","Aleš","Albert","Alex","Alexander","Antonín","Benedikt","Bohumil",
  "Bohuslav","Cyril","Dalibor","Daniel","David","Denis","Dominik","Eduard","Erik",
  "František","Hynek","Ivan","Jakub","Jan","Jaromír","Jaroslav","Jindřich","Josef",
  "Kamil","Karel","Kryštof","Ladislav","Leo","Lukáš","Marcel","Marek","Martin",
  "Matěj","Michal","Miroslav","Norbert","Oldřich","Ondřej","Patrik","Pavel",
  "Radek","Roman","Stanislav","Štěpán","Václav","Vojtěch"
];

const zenskeMeno = [
  "Adéla","Alena","Alice","Amálie","Andrea","Anna","Barbora","Beáta","Blanka","Božena",
  "Denisa","Diana","Eliška","Eva","Gabriela","Hana","Helena","Ivana","Jana","Jarmila",
  "Jitka","Kamila","Karolína","Kateřina","Klára","Kristýna","Lenka","Lucie",
  "Magdaléna","Marcela","Marie","Markéta","Michaela","Monika","Nela","Nikola",
  "Olga","Petra","Renata","Romana","Sandra","Simona","Soňa","Šárka","Tereza",
  "Veronika","Věra","Viktorie","Zdeňka","Žaneta"
];

/**
 * Vracia náhodný prvok z poľa.
 * @param {Array} array - Pole, z ktorého sa vyberá
 * @returns {*} Náhodný prvok z poľa
 */
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generuje náhodnú osobu s menom, priezviskom a pohlavím.
 * @returns {{ name: string, surname: string, gender: string }} Náhodne vygenerovaná osoba
 */
function nahodneMeno() {
  const zena = Math.random() < 0.5;
  const krstneMeno = zena ? zenskeMeno : muzskeMeno;
  const priezviskoList = zena ? zenskePriezvisko : muzskePriezvisko;

  return {
    name: randomItem(krstneMeno),
    surname: randomItem(priezviskoList),
    gender: zena ? "female" : "male"
  };
}

/**
 * Generuje náhodné pracovné zaťaženie.
 * @returns {string} Náhodne vybrané pracovné zaťaženie
 */
function nahodneZatazenie() {
  const uvazok = ["10", "20", "30", "40"];
  return randomItem(uvazok);
}

/**
 * Generuje náhodný vek v zadanom rozsahu.
 * @param {number} min - Minimálny vek
 * @param {number} max - Maximálny vek
 * @returns {number} Náhodný vek
 */
function nahodnyVek(min, max) {
  if (min > max) {
    throw new Error("vekMin nemôže byť väčší ako vekMax");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generuje náhodný dátum narodenia (ISO) na základe veku.
 * @param {number} vek - Vek osoby
 * @returns {string} Dátum narodenia vo formáte ISO
 */
function nahodneNarodeniny(vek) {
  const dnes = new Date();
  const rok = dnes.getFullYear() - vek;
  const mesiac = Math.floor(Math.random() * 12);
  const den = Math.floor(Math.random() * 28) + 1;

  return new Date(Date.UTC(rok, mesiac, den)).toISOString();
}

/**
 * Hlavná funkcia generujúca zoznam zamestnancov.
 * @param {{ count: number, vekMin: number, vekMax: number }} dtoIn - Vstupný objekt s počtom a rozsahom veku
 * @returns {{ employees: Array }} Objekt obsahujúci pole zamestnancov
 */
export function main(dtoIn) {
  const employees = [];

  for (let i = 0; i < dtoIn.count; i++) {
    const osoba = nahodneMeno();
    const vek = nahodnyVek(dtoIn.vekMin, dtoIn.vekMax);

    employees.push({
      gender: osoba.gender,
      narodeniny: nahodneNarodeniny(vek),
      name: osoba.name,
      surname: osoba.surname,
      workload: nahodneZatazenie()
    });
  }

  return { employees };
}

// Test
// const dtoIn = { count: 50, vekMin: 19, vekMax: 35 };
// console.log(main(dtoIn));
