const initialState = {
  currAccount:{
    username:null,
    address:'',
    balanceVal:''
  },
  wordsArray:[],
  exportMnoic:''
}

export default (state=initialState,action) => {
  switch (action.type){
    case 'SET_CURRACCOUNT':
      return {
        ...state,
        currAccount:action.currAccount
      }
    case 'SET_WORDSARRAY':
      return {
        ...state,
        wordsArray:action.wordsArray
      }
    case 'SET_EXPORTMNOIC':
      return {
        ...state,
        exportMnoic:action.exportMnoic
      }
  }
}