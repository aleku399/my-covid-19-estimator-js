import getDays from './normalise';

function getExpectedData(data, expectedInfections) {
  const days = getDays(data.periodType, data.timeToElapse);
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;
  const currentlyInfected = data.reportedCases * expectedInfections;
  const factor = Math.floor(days / 3);
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = Math.floor(0.15 * infectionsByRequestedTime);
  // eslint-disable-next-line max-len
  const hospitalBedsByRequestedTime = Math.trunc((0.35 * data.totalHospitalBeds) - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.floor(0.05 * infectionsByRequestedTime);
  const casesForVentilatorsByRequestedTime = Math.floor(0.02 * infectionsByRequestedTime);
  // eslint-disable-next-line max-len
  const dollarsInFlight = Math.floor((avgDailyIncomeInUSD * infectionsByRequestedTime * avgDailyIncomePopulation) / days);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
}

export default getExpectedData;
