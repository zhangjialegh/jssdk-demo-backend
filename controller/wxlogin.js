const userModel = require('../lib/user.js');
const $utils = require('../utils/utils')

exports.wxLogin = async ctx => {
  try {
    const res = await $utils.code_to_session(ctx.request.body, ctx.request.body.code)
    const openId = res.data.openid
    const scene = ctx.request.body.scene
    let data={}
        data['wechat_openid'] = openId
        data['third_session'] = $utils.createToken({openId: openId},3)
        data['scene'] = scene
    let params = []
    Object.keys(data).map((item) => {
      params.push(data[item])
    })
    try {
      const resMiddle = await userModel.findUserData(openId)
      if(resMiddle[0]) {
        ctx.body = {
          success: true,
          code: 200,
          message: '用户登录成功',
          third_session: data['third_session'],
          id: resMiddle[0].id
        }
      } else {
       try {
         const res = await userModel.createUser(params)
         if(res) {
          ctx.body = {
            code: 200,
            success: true,
            third_session: data['third_session'],
            id: resMiddle.insertId
          }    
        }
       } catch (err) {
        ctx.body = {
          code: 500,
          msg: err.message
        }
       }
      }
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: err.message
      }
    }

  } catch (err) {
    ctx.body = {
      code: 500,
      msg: err.message
    }
  }
}

