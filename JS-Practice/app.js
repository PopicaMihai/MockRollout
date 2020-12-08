const cars = [
    { name: 'Ferrari', model: '250 Monza', price: 1000, weight: 800, country: 'Italy'},
    { name: 'Nissan', model: 'Maxima', price: 400, weight: 1200, country: 'Japan'},
    { name: 'Ferrari', model: '340 America', price: 1100, weight: 900, country: 'Italy'},
    { name: 'Renault', model: 'Captur', price: 900, weight: 1000, country: 'France'},
    { name: 'BMW', model: 'Sedan', price: 1700, weight: 1400, country: 'Germany'},
    { name: 'BMW', model: 'Coupe', price: 1500, weight: 1200, country: 'Germany'}
]

//Map
const allCarModels = cars.map((car) => {
    return car.model;
})

//Map
const allCarsNameAndModels = cars.map((car) => {
    return `Model ${car.model} is made by ${car.name} in ${car.country}`;
})

//Filter
const overPricedCars = cars.filter((car) => {
    return car.price > 1000
})

//Every
const areAllCarsItalians = cars.every((car) => {
    return car.country === 'Italy' // false
})

//Some
const areSomeCarsItalians = cars.some((car) => {
    return car.country === 'Italy' // true
})

//Find
const findFirstFerrariCar = cars.find((car) => {
    return car.name = 'Ferrari'; // First Ferrari car object
})

//Slice
const allCarsByCountryCode = cars.map((car) => {
    return car.country.slice(0,2); // Fr, Gr, It etc...
})

//Slice
const lastCar = cars.slice(cars.length - 1, cars.length)

//Sort 
const orderedByCountry = cars.sort((a, b) => a.country > b.country ? 1: -1)

//Reduce
let groupByCountry = cars.reduce((accumulator, currentValue) => {
    accumulator[currentValue.country] = [...(accumulator[currentValue.country] || []), currentValue];
    return accumulator;
}, {});

//Reduce
let allCarsOverweight = cars.reduce((accumulator, currentValue) => {
    if (currentValue.weight > 800) {
        accumulator.push(currentValue)
    }
    return accumulator;
}, []);

//Splice
let firstHalfOfCars = cars.splice(cars.length / 2);

console.log('Car models:', allCarModels);
console.log('Information about the cars:', allCarsNameAndModels);
console.log('Overpriced cars:', overPricedCars);
console.log('Are all cars from Italy?', areAllCarsItalians);
console.log('Is at least a car from Italy?', areSomeCarsItalians);
console.log('First Ferrari car:', findFirstFerrariCar);
console.log('Code of the countries:', allCarsByCountryCode);
console.log('Last car of the array', lastCar);
console.log('All cars ordered by country', orderedByCountry);
console.log('Cars grouped by country', groupByCountry);
console.log('All cars that are overweight', allCarsOverweight);
console.log('First half of the array', firstHalfOfCars);