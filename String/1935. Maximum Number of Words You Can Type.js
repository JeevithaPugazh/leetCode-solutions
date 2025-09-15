var canBeTypedWords = function(text, brokenLetters) {
  let brokenLettersSet = new Set(brokenLetters)
  let words = text.split(" ")
  let count = 0

  for(let word of words){
    let nobrokenLetters = true
    for(let ch of word){
        if(brokenLettersSet.has(ch))
        nobrokenLetters = false
    }
    if(nobrokenLetters){
        count ++
    }
  }
  return count
};