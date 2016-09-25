/*Generate first five Fibonacci numbers that are divisible by three

1. Generate a list of Fibonacci numbers; will include some kind of a loop involving initial values and indexing
2. Use conditionals to check if the current fibonachi number is divisible by 3
3. Add that number to an array*/

function fibBy3(len){
  var fibs = [0, 1];
  var fibDiv3 = [];
  while (fibDiv3.length < len){
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
    if (fibs[fibs.length - 1] % 3 === 0){
      fibDiv3.push(fibs[fibs.length - 1]);
    }
  }
  return fibDiv3;
}

var fibDiv3 = fibBy3(5);

/*Now, consider an ordered list of prime numbers, including and starting at 1.
What is the sum of the prime numbers whose positions in the list of prime numbers
are those five numbers from the Fibonacci sequence?

1. Generate a list of prime numbers up to length of last element in fibBy3 array - 1
1a. Develop a function that tests whether or not a number is prime
1b.
2. Sum the prime numbers with indices from the Fibonacci sequence*/

//From stack overflow: http://stackoverflow.com/questions/21966000/need-to-generate-prime-numbers-in-java-script
function isPrime(num) {
  for (var ii = 2; ii < num; ii++) {
    if (num % ii === 0) {
      return false;
    }
  }
  return true;
}

function makePrime(limit) {
  var primeArray = [1, 2];
  for (var ii = 3; ii < limit; ii += 2) {
    if (isPrime(ii)) {
      primeArray.push(ii);
    }
  }
  console.log(primeArray);
}

makePrime(100);
