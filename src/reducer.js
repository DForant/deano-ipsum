import{
    SET_ACTIVE_IPSUM,
    SET_NBR_PARAGRAPHS,
    SET_PARAGRAPH_SIZE,
    ALLOW_P_TAGS,
    GET_IPSUM_RESULT,
    IS_IPSUM_GENERATED
} from './actions'

const reducer = (state, action) => {
    if(action.type === SET_ACTIVE_IPSUM){
        const newIpsumId = action.payload.id
        return {...state, activeIpsum: newIpsumId}
    }

    if(action.type === SET_NBR_PARAGRAPHS){
        const newNbr = action.payload.nbr
        return{...state, paragraphs: newNbr}
    }

    if(action.type === SET_PARAGRAPH_SIZE){
        const newSize = action.payload.size
        return{...state, size: newSize}
    }

    if(action.type === ALLOW_P_TAGS){
        return{...state, allowPTags: (!state.allowPTags)}
    }

    if(action.type === GET_IPSUM_RESULT){
        const newResult = action.payload.result
        return{...state, ipsumResult: newResult}
    }

    if(action.type === IS_IPSUM_GENERATED){
        return{...state,  isIpsumGenerated: action.payload.isGenerated}
    }

}

export default reducer