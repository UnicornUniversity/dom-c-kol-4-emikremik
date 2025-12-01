
// paste stary kod,, cakam na feedback

const muzskePriezvisko = [
"Novák","Svoboda","Novotný","Dvořák","Černý","Procházka","Kučera","Veselý","Horák","Němec", "Marek","Pospíšil","Pokorný","Hájek",
"Král","Jelínek","Růžička","Beneš","Fiala","Sedláček", "Doležal","Zeman","Kolář","Urban","Vašek","Kopecký","Šimek","Malý","Kadlec",
"Čech", "Říha","Holub","Bláha","Moravec","Beran","Krejčí","Tichý","Pavlík","Vondrák","Matouš", "Straka","Soukup","Vlček","Krupa",
"Štěpánek","Bartoš","Kovařík","Benda","Hlaváček","Konečný"
];

const zenskePriezvisko = [
"Nováková","Svobodová","Novotná","Dvořáková","Černá","Procházková","Kučerová","Veselá","Horáková","Němcová", "Marková","Pospíšilová",
"Pokorná","Hájková","Králová","Jelínková","Růžičková","Benešová","Fialová","Sedláčková", "Doležalová","Zemanová","Kolářová",
"Urbanová","Vašková","Kopecká","Šimková","Malá","Kadlecová","Čechová", "Říhová","Holubová","Bláhová","Moravcová","Beranová",
"Krejčíková","Tichá","Pavlíková","Vondráková","Matoušová", "Straková","Soukupová","Vlčková","Krupová","Štěpánková","Bartošová",
"Kovaříková","Bendová","Hlaváčková","Konečná"
];

const muzskeMeno = [
"Adam","Adrian","Aleš","Albert","Alex","Alexander","Antonín","Benedikt","Bohumil","Bohuslav", "Cyril","Dalibor","Daniel","David",
"Denis","Dominik","Eduard","Erik","František","Hynek", "Ivan","Jakub","Jan","Jaromír","Jaroslav","Jindřich","Josef","Kamil","Karel",
"Kryštof", "Ladislav","Leo","Lukáš","Marcel","Marek","Martin","Matěj","Michal","Miroslav","Norbert", "Oldřich","Ondřej","Patrik",
"Pavel","Radek","Roman","Stanislav","Štěpán","Václav","Vojtěch"
];

const zenskeMeno = [
"Adéla","Alena","Alice","Amálie","Andrea","Anna","Barbora","Beáta","Blanka","Božena", "Denisa","Diana","Eliška","Eva","Gabriela",
"Hana","Helena","Ivana","Jana","Jarmila", "Jitka","Kamila","Karolína","Kateřina","Klára","Kristýna","Lenka","Lucie","Magdaléna",
"Marcela", "Marie","Markéta","Michaela","Monika","Nela","Nikola","Olga","Petra","Renata","Romana", "Sandra","Simona","Soňa","Šárka",
"Tereza","Veronika","Věra","Viktorie","Zdeňka","Žaneta"
];


/**
 * Vracia náhodný prvok z poľa.
 * @param {Array} array - Pole, z ktorého sa vyberie náhodný prvok.
 * @returns {*} Náhodný prvok poľa.
 */
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Generuje náhodnú osobu s menom, priezviskom a pohlavím.
 * @returns {{name: string, surname: string, gender: "male"|"female"}} Náhodne vygenerovaná osoba.
 */
function nahodneMeno() {
  const zena = Math.random() < 0.5;

  const krstneMeno = zena ? zenskeMeno : muzskeMeno;
  const priezviskoList = zena ? zenskePriezvisko : muzskePriezvisko;

  const name = randomItem(krstneMeno);
  const surname = randomItem(priezviskoList);
  const gender = zena ? "female" : "male";

  return { name, surname, gender };  
}

/**
 * Generuje náhodné pracovné zaťaženie.
 * @returns {"10"|"20"|"30"|"40"} Náhodné zaťaženie.
 */
function nahodneZatazenie() {
  const uvazok = ["10", "20", "30", "40"]

  const hodiny = randomItem(uvazok)

  const workLoad = hodiny
  return workLoad
}

/**
 * Generuje náhodný vek na základe minimálnej a maximálnej hodnoty.
 * @param {number} min - Minimálny vek.
 * @param {number} max - Maximálny vek.
 * @throws {Error} Ak je vekMin väčší ako vekMax alebo naopak.
 * @returns {number} Náhodný vek medzi min a max.
 */
function nahodnyVek(min, max) {

  if (dtoIn.vekMin > dtoIn.vekMax) {
    throw new Error("vekMin nemôže byť väčší ako vekMax")
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generuje náhodné dátum narodenia vo formáte ISO na základe veku.
 * @param {number} vek - Vek zamestnanca.
 * @returns {string} Dátum narodenia vo formáte ISO.
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
 * @param {{count: number, vekMin: number, vekMax: number}} dtoIn - Vstupné dáta.
 * @returns {{employees: Array}} Objekt obsahujúci zoznam vygenerovaných zamestnancov.
 */
function main(dtoIn) {
  const employees = [];

  for (let i = 0; i < dtoIn.count; i++) {
    const osoba = nahodneMeno();
    const vek = nahodnyVek(dtoIn.vekMin, dtoIn.vekMax);  
    const narodeniny = nahodneNarodeniny(vek);
    const workload = nahodneZatazenie();

    employees.push({
      gender: osoba.gender, 
      narodeniny,
      name: osoba.name,
      surname: osoba.surname,
      workload
    });
  }

  return { employees };
}

// statistic

// pocet jednotlivych workloads


// test 
const dtoIn = { count: 50, vekMin: 19, vekMax: 35 };
export function getEmployeeStatistics(employees) {
  //TODO code
  //let dtoOut = exGetEmployeeStatistics(employees);
  return dtoOut;
}
