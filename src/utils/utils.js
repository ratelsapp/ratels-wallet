export const validator = (parameter,rules) => {
  let result = {
    isRight:true,
    msg:'',
    key:''
  }
  for(let key in rules){
    if(parameter[key] === undefined){
      result.isRight = false
      result.msg = `缺少${key}参数`
      result.key = key
      return result
    }
    const len = rules[key].length
    for(let i=0;i<len;i++){
      if(rules[key][i].required && parameter[key] === ''){
        result.isRight = false;
        result.msg = rules[key][i].message
        result.key = key
        return result
      }
      if(rules[key][i].validator){
        const reg = rules[key][i].validator
        if(!reg.test(parameter[key])){
          result.isRight = false;
          result.msg = rules[key][i].message
          result.key = key
          break 
        }
      }
      if(rules[key][i].compare){
        const compareKey = rules[key][i].compare
        if(parameter[key] !== parameter[compareKey]){
          result.isRight = false;
          result.msg = rules[key][i].message
          result.key = key
          break 
        }
      }
    }
  }
  return result
}

export const selfFixed = function(value, count) {
  const [integer, decimal = '0'.repeat(count)] = value.toString().split('.');
  return integer + '.' + (decimal + '0'.repeat(count - 1)).substr(0, count);
};

export const randomRange = (min,max) => {
  const num = Math.floor(Math.random() * (max+1-min) + min)
  return num
}

export const urlParameter = (search) => {
  var params = {};
  if(!search){
    return {}
  }
  var urls = search.split("?")
  var arr = urls[1].split("&")
  for (var i = 0, l = arr.length; i < l; i++) {
    var a = arr[i].split("=");
    params[a[0]] = a[1];
  }
  return params
}

export const addressSecret = (str) => {
  const len = str.length 
  const last5Index = len-5;
  const front5 = str.substring(0,5)
  const last5 = str.substring(last5Index)

  return `${front5}......${last5}`
}

export const arrMaxNum = (arr) =>{
  const newarr = arr.sort(function(a,b){
    return a-b
  })
  const arrMax = newarr[newarr.length-1];
  return Number(arrMax)+1
}


