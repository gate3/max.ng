
/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */
function classifier(input) {
  // Your code should go here.
  
  if(!input || Object.prototype.toString.call(input) !== '[object Array]'){
    throw new Error('Invalid input')
  }

  const invalidInputs = input.filter(i=>!i.dob || !i.name || !i.regNo)
  if(invalidInputs.length > 0){
    throw new Error('Invalid input provided') 
  }

  //Deep clone the array, JSON fuction works because array is still an object type
  const cloneArray = JSON.parse(JSON.stringify(input))

  //Create my own version of the array using prototype so we can use it like an event listener to perform required changes
  const MyArray = function (){}
  MyArray.prototype = []
  MyArray.prototype.sum = 0
  MyArray.prototype.oldest = 0
  MyArray.prototype.push = function (data) {
    if(data.age > this.oldest){
      this.oldest = data.age
    }
    this.sum += data.age
    Array.prototype.push.call(this, data)
  }

  /**
   * 
   * @param {String} date function to calculate the age given year
   */
  const calculateAge = (date) => {
    const currentDate = new Date().getFullYear()
    const passedInDate = new Date(date).getFullYear()
    // We need to perform this check to avoid negative values 
    if(passedInDate > currentDate){
      return null
    }else{
      return (currentDate - passedInDate)
    }
  } 

  /**
   * Replace dob with age by using the map function to mutate the array objects
   */
  const transformedInput = cloneArray.map(i=>{
    const age = calculateAge(i.dob)
    i.age = age
    delete i.dob
    return i
  })

  /**
   * 
   * @param {number} age1 First age
   * @param {number} age2 Second age
   * 
   * Function helps compare the age difference constraint, to check if two different ages to find if their difference is greater than 5
   */
  const isGreaterThan5 = (age1, age2)=>{
    if(age1 > age2){
      return (age1 - age2) > 5
    }else{
      return (age2 - age1) > 5
    }
  }

  const mainContainer = []
  const hashtable = {}
  
  /**
   * The engine of the code :-) 
   * The part of the code loops through the provided array and does the following:
   * 
   * (1) We declare a object (or hashtable) and a maincontainer to store our groups
   * (2) We loop through the input array and for each item we create a new Array using the extended array I created earlier (MyArray)
   * (3) We store the current item in a hashtable to we know it has been sorted already
   * (4) We filter the main array and only get the items that is not the current item and have not been sorted before 
   * (5) We loop through the items from the filtered array and compare the current item with each one
   * (6) If the difference is not up to 5 push into the array we created in (2)
   * (7) Then we also add it to the hashtable
   * (8) Once the array from (2) is filled up (up to 3 items) break out of the inner loop
   */


  for(let i = 0;i < transformedInput.length; i++){

    const id = transformedInput[i].regNo
    if(hashtable[id]){
      continue
    }else{
      const curArr = new MyArray()
      curArr.push(transformedInput[i])
      hashtable[transformedInput[i].regNo] = true
      const compareWithArr = transformedInput.filter(t=>hashtable[t.regNo] == null && t.regNo != id)
      
      for(let j = 0; j < compareWithArr.length; j++){
        if(!isGreaterThan5(compareWithArr[j].age, transformedInput[i].age)){
          curArr.push(compareWithArr[j])
          hashtable[compareWithArr[j].regNo] = true
          if(curArr.length === 3){
            break
          }
        }
      }

      mainContainer.push(curArr)
    }
  } 

 //variable to store the result
 const exampleOutput = {}
 exampleOutput['noOfGroups'] = mainContainer.length
 /**
 * The analysis :-)
 * ______________
 * (1) Store the number of sub groups as noOfGroups
 * (2) Loop through the items in the main container 
 * (3) Create an object name with each string "group" suffixed by the group number
 * (4) For each item in the main container array
 * (5) Get the regNo from each object in the group and place in regNos array
 * (6) Delete the regNo from the object
 * (7) Place the object in a members array for the group
 * (8) Assign the properties from the MyArray array to the group object
 */
 for(let i = 0;i < mainContainer.length; i++){
  const curArr = mainContainer[i]
  exampleOutput[`group${i + 1}`] = {}
  let group = exampleOutput[`group${i+1}`]
  group['members'] = []
  group['regNos'] = []
    
  for(let j = 0;j < curArr.length;j++){
    group['regNos'].push(curArr[j].regNo)
    delete curArr[j].regNo
    group['members'].push(curArr[j])
  } 
  group['oldest'] = mainContainer[i].oldest
  group['sum'] = mainContainer[i].sum
  group['regNos'].sort()
 }

 return exampleOutput
}

module.exports = classifier
