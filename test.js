reverse = (string) => {
  let result = ""
  for (let i = 0; i < string.length; i++) {
    result = string[i] + result
  }
  return result
}

palindrome = (string) => {
  return string == reverse(string)
}



longestPalindrome = (string) => {
  let array = string.split(" ")
  let filteredArray = array.filter((word) => {
    return palindrome(word)
  })
  let longest = ""
  for (let i = 0; i < filteredArray.length; i++) {
    if (filteredArray[i].length > longest.length) {
      longest = filteredArray[i]
    }

    return longest;
  }
}

// "racecar mom ana hannah asdfdsaf afadsfas sfd" => "racecar"