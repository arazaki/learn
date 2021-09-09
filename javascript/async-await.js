const getDataPromise = num =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      typeof num === "number"
        ? resolve(num * 2)
        : reject("Number must be provided");
    }, 2000);
  });

// async await mode
const calculate = async num => {
  try {
      //need to call a function after await
    let data = await getDataPromise(num);
    console.log("AA Result:", data);
  } catch (error) {
    console.log("AA Error:", error);
  }
};

calculate(2);

//promise mode
getDataPromise(2)
  .then(result => {
    console.log("Promise result:", result);
  })
  .catch(error => {
    console.log("Promisse error:", error);
  });
