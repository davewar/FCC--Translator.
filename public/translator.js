import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

let translation = document.querySelector('#locale-select')
let translateBtn = document.querySelector('#translate-btn')
let textInput = document.querySelector('#text-input')
let translatedSentence = document.querySelector('#translated-sentence')
let errorMsg = document.querySelector('#error-msg')
let clearBtn = document.querySelector('#clear-btn')

let timeRgx = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g

let mode = 'american-to-british'
let combinedList = []

//combines the four files
Object.keys(americanOnly).forEach((key) =>{
	combinedList.push([
		key, americanOnly[key]
	])
})
Object.keys(americanToBritishSpelling).forEach((key) =>{
	combinedList.push([
		key,
		americanToBritishSpelling[key]
	])
})
Object.keys(americanToBritishTitles).forEach((key) =>{
	combinedList.push([
		key,
		americanToBritishTitles[key]
	])
})
Object.keys(britishOnly).forEach((key) =>{
	combinedList.push([
		britishOnly[key],
		key
	])
})

// console.log(combinedList)



let translate = () => {


  //    console.log("testin dw", input)
  //     console.log("testin dw", mode)
  // // //// for testing


  // textInput.value = input
  // translation.value = mode
  ////

	errorMsg.innerText = ""
  translatedSentence.innerText = ""
  // no data
	if(textInput.value === ""){
		errorMsg.innerText = 'Error: No text to translate.'
		return
	}
	
	let newString = textInput.value

   // i want to acclimate, acclimatise
    let start = `<span class="highlight">`;
    let end = `</span>`
 
           // console.log(item)
      if (mode === "american-to-british" ){
                    // console.log(mode)
                   combinedList.forEach((item)=>{
                // newString = newString.replace(item[0],item[1])
                newString = newString.replace(item[0], start + item[1] + end)
                 })
      } else{
                // console.log(mode)
              combinedList.forEach((item)=>{
                // newString = newString.replace(item[1],item[0])
                 newString = newString.replace(item[1],start + item[0] + end)
                 })

      }
   


  // console.log(newString)
    
    // time convert
    // i am at 10:30 london and NY is 10.30
    let timeConvert = newString.match(timeRgx)
    // console.log(timeConvert);
     

     if (timeConvert){

            timeConvert.forEach( (item) => {
                  // console.log("dw111", item)

                  if (mode === "american-to-british" ){

                        // newString = newString.replace(item, item.replace(":","."))
                        newString = newString.replace(item, start + item.replace(":",".") + end)

                  } else {

                        // newString = newString.replace(item, item.replace(".",":"))
                        newString = newString.replace(item, start + item.replace(".",":") + end)
                  }  



            })

     }

   
    //console.log(newString)




  // no translation
	if(newString == textInput.value){
		translatedSentence.innerText = 'Everything looks good to me!'
		return
	}

	// translatedSentence.innerText = newString
translatedSentence.innerHTML = newString



} // end

translateBtn.onclick = translate

translation.onchange = () => {
	mode = translation.value

}

const clear = clearBtn.onclick = () => {
	textInput.value = ''
	translatedSentence.innerHTML = ''
	errorMsg.innerText = ''
}




///










/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {

  module.exports = {
          translate,
          clear

  }
} catch (e) {}
