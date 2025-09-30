//your JS code here. If required.
const input = document.getElementById("ip");
const button = document.getElementById("btn");
const output = document.getElementById("output");

function delayedPromise(value, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
}

button.addEventListener("click", () => {
  const num = Number(input.value);
  output.textContent = "";

  delayedPromise(num, 2000)
    .then((res) => {
      output.textContent = `Result: ${res}`;
      return delayedPromise(res * 2, 2000); 
    })
    .then((res) => {
      output.textContent = `Result: ${res}`;
      return delayedPromise(res - 3, 1000); 
    })
    .then((res) => {
      output.textContent = `Result: ${res}`;
      return delayedPromise(res / 2, 1000); 
    })
    .then((res) => {
      output.textContent = `Final Result: ${res + 10}`;
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});
