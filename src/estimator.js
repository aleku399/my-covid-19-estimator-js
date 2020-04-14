import getExpectedData from './calc';

const covid19ImpactEstimator = (data) => (
  {
    data,
    impact: getExpectedData(data, 10),
    severeImpact: getExpectedData(data, 50)
  }
);

export default covid19ImpactEstimator;
