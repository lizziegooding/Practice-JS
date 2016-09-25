/*Generate first five Fibonacci numbers that are divisible by three

Now, consider an ordered list of prime numbers, including and starting at 1.
What is the sum of the prime numbers whose positions in the list of prime numbers
are those five numbers from the Fibonacci sequence?*/

//1. Generate a list of Fibonacci numbers; will include some kind of a loop involving initial values and indexing
//2. Use conditionals to check if the current fibonachi number is divisible by 3
//3. Add that number to an array

function fibBy3(){
  // index0 = 0;
  // index1 = 1;
  fibs = [0, 1];
  answer = [];
  while (answer.length < 5){
    for (i in fibs){
      fibs.push(fibs[:2] + fibs[:1]);
      if (fibs[:1] % 3 === 0){
        answer.push(fibs[:1]);
      }
    }
  }
}
