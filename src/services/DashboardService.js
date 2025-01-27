import { fDate } from '../utils/formatTime';

const patients = require('./dados.json');
const exams = require('./exames.json');

export const getPatients = async () => {
  return Promise.resolve(patients);
};

export const getProfitPerExam = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const filteredExams = exams.filter((e) => new Date(e.data) >= start && new Date(e.data) <= end);

  const aggregate = {};

  filteredExams.forEach((exam) => {
    if (!aggregate[exam.nome]) {
      aggregate[exam.nome] = 0;
    }

    aggregate[exam.nome] += parseFloat(exam.preco);
  });

  const result = Object.keys(aggregate).map((key) => ({
    label: key,
    value: aggregate[key],
  }));

  console.log(result);

  return result;
};

export const getExaminedPatients = (startDate, endDate) => {
  const labels = [];
  const aggregate = {};

  const start = new Date(startDate);
  const end = new Date(endDate);

  const distinctExams = [...new Set(exams.map((e) => e.nome))];

  distinctExams.forEach((examName) => {
    if (!aggregate[examName]) {
      aggregate[examName] = {
        name: examName,
        type: 'line',
        fill: 'solid',
        data: [],
      };
    }
  });

  while (start < end) {
    // create a label for current day
    labels.push(fDate(start, 'MM/dd/yyyy'));
    start.setDate(start.getDate() + 1);

    // filter exams done in the current day
    const examsDoneInCurrentDay = exams.filter((e) => e.data === fDate(start, 'yyyy-MM-dd'));
    distinctExams.forEach((examName) => {
      const totalsForCurrentExam = examsDoneInCurrentDay.filter((e) => e.nome === examName);
      aggregate[examName].data.push(totalsForCurrentExam.length);
    });
  }

  return {
    labels,
    aggregate: Object.values(aggregate),
  };
};

export const getTotalProfitForPeriod = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const total = exams
    .filter((e) => new Date(e.data) >= start && new Date(e.data) <= end)
    .map((e) => parseFloat(e.preco))
    .reduce((carry, current) => carry + current, 0);

  return total;
};

export const getWeeklyProfitPerPeriod = (startDate, endDate) => {
  const total = getTotalProfitForPeriod(startDate, endDate);
  const weeks = getWeeksBetween(startDate, endDate);

  return parseFloat(total / weeks);
};

export const getMonthlyProfitPerPeriod = (startDate, endDate) => {
  const total = getTotalProfitForPeriod(startDate, endDate);
  let months = getMonthsBetween(startDate, endDate);

  if (!months) {
    months = 1;
  }

  return parseFloat(total / months);
};

export const getDailyProfitPerPeriod = (startDate, endDate) => {
  const total = getTotalProfitForPeriod(startDate, endDate);
  const days = getDaysBetween(startDate, endDate);

  return parseFloat(total / days);
};

const getWeeksBetween = (startDate, endDate) => {
  // Parse the input dates to ensure they are Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Get the time difference in milliseconds
  const timeDifference = end.getTime() - start.getTime();

  // Convert the time difference to weeks (1 week = 604800000 milliseconds)
  const weeksDifference = timeDifference / (7 * 24 * 60 * 60 * 1000);

  return Math.abs(weeksDifference);
};

const getMonthsBetween = (startDate, endDate) => {
  // Parse the input dates to ensure they are Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Get the time difference in milliseconds
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  // Convert the time difference to weeks (1 week = 604800000 milliseconds)
  const monthsDifference = years * 12 + months;

  return Math.abs(monthsDifference);
};

const getDaysBetween = (startDate, endDate) => {
  // Parse the input dates to ensure they are Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Get the time difference in milliseconds
  const timeDifference = end.getTime() - start.getTime();

  // Convert the time difference to weeks (1 week = 604800000 milliseconds)
  const daysDifference = timeDifference / (24 * 60 * 60 * 1000);

  return Math.abs(daysDifference);
};
