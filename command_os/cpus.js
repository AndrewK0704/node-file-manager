import os from 'os';

export const cpus = async() => {
  const cpus = os.cpus();
  console.log(`overall amount of CPUS: ${cpus.length}`);
  cpus.forEach((cpus, index) => {
    console.log(
      `CPU ${index + 1}: Model: ${cpus.model}, Clock Rate: ${(cpus.speed / 1000).toFixed(2)} GHz`,
    );
  });
};