import { main as hw3Main } from './src/domacaUloha3.js';

/**
 * Calculates age based on ISO birthdate.
 * @param {string} datumNarodenia - Date of birth in ISO format
 * @returns {number} Age in years
 */
function getAge(datumNarodenia) {
  const narodenie = new Date(datumNarodenia);
  const dnes = new Date();
  let age = dnes.getFullYear() - narodenie.getFullYear();
  const mediacDiff = dnes.getMonth() - narodenie.getMonth();
  if (mediacDiff < 0 || (mediacDiff === 0 && dnes.getDate() < narodenie.getDate())) {
    age -= 1;
  }
  return age;
}

/**
 * Counts total employees and workload distribution.
 * @param {Array} employees - Array of employee objects
 * @returns {object} total count and workloads { total, scitaneWorkloads }
 */
function pocetZamestnancu(employees) {
  const total = employees.length;
  const scitaneWorkloads = { 10: 0, 20: 0, 30: 0, 40: 0 };

  for (let i = 0; i < employees.length; i++) {
    const w = employees[i].workload;
    scitaneWorkloads[w] += 1;
  }

  return { total, scitaneWorkloads };
}

/**
 * Calculates age statistics: min, max, average, medianAge
 * @param {Array} employees - Array of employee objects
 * @returns {object} Age statistics { vekMin, vekMax, avgAge, medianAge }
 */
function vekStats(employees) {
  const vek = employees.map(e => getAge(e.narodeniny));

  let sum = 0;
  let vekMin = vek[0];
  let vekMax = vek[0];

  for (let i = 0; i < vek.length; i++) {
    sum += vek[i];
    if (vek[i] < vekMin) vekMin = vek[i];
    if (vek[i] > vekMax) vekMax = vek[i];
  }

  const avgAge = Math.round((sum / vek.length) * 10) / 10;

  const sorted = vek.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const medianAge = sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;

  return { vekMin, vekMax, avgAge, medianAge };
}

/**
 * Calculates medianAge workload among employees.
 * @param {Array} employees - Array of employee objects
 * @returns {number} Median workload
 */
function medianWorkload(employees) {
  const allWorkloads = employees.map(e => parseInt(e.workload)).sort((a, b) => a - b);
  const mid = Math.floor(allWorkloads.length / 2);
  return allWorkloads.length % 2 !== 0
    ? allWorkloads[mid]
    : (allWorkloads[mid - 1] + allWorkloads[mid]) / 2;
}

/**
 * Calculates average workload for female employees.
 * @param {Array} employees - Array of employee objects
 * @returns {number} Average workload of females
 */
function priemerZenskyWorkload(employees) {
  const zeny = employees.filter(e => e.gender === 'female');
  if (zeny.length === 0) return 0;
  const sum = zeny.reduce((acc, e) => acc + parseInt(e.workload), 0);
  return Math.round((sum / zeny.length) * 10) / 10;
}

/**
 * Returns employees sorted by workload ascending.
 * @param {Array} employees - Array of employee objects
 * @returns {Array} Sorted employees
 */
function zoradPodlaWorkload(employees) {
  return employees.slice().sort((a, b) => parseInt(a.workload) - parseInt(b.workload));
}

/**
 * Generates employee data using Homework 3 generator.
 * @param {object} dtoIn - Input object { count, vekMin, vekMax }
 * @returns {Array} Array of employees
 */
function generateEmployeeData(dtoIn) {
  return hw3Main(dtoIn).employees;
}

/**
 * Collects all required statistics from employees.
 * @param {Array} employees - Array of employee objects
 * @returns {object} All statistics { counts, vekStatistiky, medianWorkload, priemernyZensk, zoradeniEmployees }
 */
function getEmployeeStatistics(employees) {
  const counts = pocetZamestnancu(employees);
  const vekStatistiky = vekStats(employees);
  const medianWork = medianWorkload(employees);
  const avgZeny = priemerZenskyWorkload(employees);
  const zoradeniEmployees = zoradPodlaWorkload(employees);

  return {
    counts,
    vekStatistiky,
    medianWorkload: medianWork,
    priemernyZensk: avgZeny,
    zoradeniEmployees
  };
}

/**
 * Main exported function for assignment.
 * Returns structured output for submission.
 * @param {object} dtoIn - Input { count, vekMin, vekMax }
 * @returns {object} dtoOut containing employees and statistics
 */
export function runMain(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  const stats = getEmployeeStatistics(employees);
  return { employees, ...stats };
}

/**
 * Optional console logger for testing/debugging.
 * @param {object} testdtoIn - Input { count, vekMin, vekMax }
 */
function main(testdtoIn) {
    const dtoOut = runMain(testdtoIn);

    const consoleDtoOut = {
      total: dtoOut.counts.total,
  
      workload10: dtoOut.counts.scitaneWorkloads["10"],
      workload20: dtoOut.counts.scitaneWorkloads["20"],
      workload30: dtoOut.counts.scitaneWorkloads["30"],
      workload40: dtoOut.counts.scitaneWorkloads["40"],
  
      averageAge: dtoOut.vekStatistiky.avgAge,
      minAge: dtoOut.vekStatistiky.vekMin,
      maxAge: dtoOut.vekStatistiky.vekMax,
      medianAge: dtoOut.vekStatistiky.medianAge,
  
      medianWorkload: dtoOut.medianWorkload,
      averageWomenWorkload: dtoOut.priemernyZensk,
  
      sortedByWorkload: dtoOut.zoradeniEmployees.map(e => ({
        gender: e.gender,
        birthdate: e.narodeniny,
        name: e.name,
        surname: e.surname,
        workload: Number(e.workload)
      }))
    };
  
    console.log(consoleDtoOut);
  }
  
// ---------- Test Run ----------
const dtoIn = { count: 2, vekMin: 19, vekMax: 35 };
main(dtoIn);
