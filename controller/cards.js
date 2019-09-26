const cardsModel = require('../lib/cards.js');
const userModel = require('../lib/user')
const $utils = require('../utils/utils')
const resState = require('./response/template')

exports.insertCard = async ctx => {
  const { authorization } = ctx.request.header
  const token = authorization ? authorization : null
  const { openId } = $utils.decodeToken(token).payload.data
  try {
    const res = await userModel.findUserData(openId)
    if(res[0]) {
      try {
        const { webname, account, remark } = ctx.request.body
        const userId = res[0]['id']
        await cardsModel.insertCard({ webname, account, remark, userId })
        resState.success(ctx)
      } catch (err) {
        resState.sysError(ctx,err)
      }
    } else {
      resState.invalidAuth(ctx)
    }
  } catch (error) {
    resState.sysError(ctx,error)
  }
}

exports.findAllCards = async (ctx,next) => {
  const { authorization } = ctx.request.header
  const token = authorization ? authorization : null
  if(!token) {
    resState.needAuth(ctx)
    next()
  }
  const { openId } = $utils.decodeToken(token).payload.data
  try {
    const res = await userModel.findUserData(openId)
    if(res[0]) {
      const cards = await cardsModel.findAllCards({ userId: res[0]['id'] })
      let cardsList = []
      for (const key in cards) {
        if (cards.hasOwnProperty(key)) {
          const ele = cards[key];
          cardsList.push({
            logo: ele['webname'].slice(0,1),
            webname: ele['webname'],
            remark: ele['remark'],
            id: ele['id'],
            updatedAt: new Date(ele['updatedAt']).getTime()
          })
        }
      }
      resState.success(ctx,cardsList)
    } else {
      resState.invalidAuth(ctx)
    }
  } catch (error) {
    resState.sysError(ctx,error)
  }
}

exports.findOneCard = async (ctx,next) => {
  const { authorization } = ctx.request.header
  const token = authorization ? authorization : null
  if(!token) {
    resState.needAuth(ctx)
    next()
  }
  const { openId } = $utils.decodeToken(token).payload.data
  const { id } = ctx.request.query
  try {
    const res = await userModel.findUserData(openId)
    if(res[0]) {
      const card = await cardsModel.findOneCard({ id, userId: res[0]['id'] })
      if(!card) {
        resState.otherScene(ctx,{
          message: '未找到该信息'
        })
      } else {
        resState.success(ctx,{
          id: card.id,
          logo: card.webname.slice(0,1),
          webname: card.webname,
          account: card.account,
          remark: card.remark
        })
      }
    } else {
      resState.invalidAuth(ctx)
    }
  } catch (error) {
    resState.sysError(ctx,error)
  }
}


exports.updateCard = async (ctx,next) => {
  const { authorization } = ctx.request.header
  const token = authorization ? authorization : null
  if(!token) {
    resState.needAuth(ctx)
    next()
  }
  const { openId } = $utils.decodeToken(token).payload.data
  const { id, account, remark } = ctx.request.body
  try {
    const res = await userModel.findUserData(openId)
    if(res[0]) {
      const card = await cardsModel.updateCard({ 
        id, 
        userId: res[0]['id'],
        account,
        remark
      })
      if(!card) {
        resState.otherScene(ctx,{
          message: '未找到该信息'
        })
      } else {
        resState.success(ctx)
      }
    } else {
      resState.invalidAuth(ctx)
    }
  } catch (error) {
    resState.sysError(ctx,error)
  } 
}

exports.deleteCard = async (ctx,next) => {
  const { authorization } = ctx.request.header
  const token = authorization ? authorization : null
  if(!token) {
    resState.needAuth(ctx)
    next()
  }
  const { openId } = $utils.decodeToken(token).payload.data
  const { id } = ctx.request.query
  try {
    const res = await userModel.findUserData(openId)
    if(res[0]) {
      await cardsModel.deleteCard({ 
        id, 
        userId: res[0]['id']
      })
      const cards = await cardsModel.findAllCards({ userId: res[0]['id'] })
      let cardsList = []
      for (const key in cards) {
        if (cards.hasOwnProperty(key)) {
          const ele = cards[key];
          cardsList.push({
            logo: ele['webname'].slice(0,1),
            webname: ele['webname'],
            remark: ele['remark'],
            id: ele['id'],
            updatedAt: new Date(ele['updatedAt']).getTime()
          })
        }
      }
      resState.success(ctx,cardsList)
    } else {
      resState.invalidAuth(ctx)
    }
  } catch (error) {
    resState.sysError(ctx,error)
  } 
}
