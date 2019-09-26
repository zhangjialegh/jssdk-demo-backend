const { Cards } = require('../model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

// 注册用户
exports.insertCard = ( {webname,account,remark,userId} ) => {
  return Cards.create({
    webname,
    account,
    remark,
    userId
  })
}

exports.findAllCards = ({ userId }) => {
  return Cards.findAll({
    where: {
      userId,
      [Op.and]: {
        showTime: true
      }
    }
  })
}

exports.findOneCard = ({ id, userId }) => {
  return Cards.findOne({
    where: {
      id,
      [Op.and]: [{
        userId
      }, {
        showTime: true
      }]
    }
  })
}

exports.updateCard = ({ id, userId, account, remark }) => {
  return Cards.update({
    account,
    remark
  }, {
    where: {
      id,
      [Op.and]: {
        userId
      }
    }
  })
}

exports.deleteCard = ({ id, userId }) => {
  return Cards.update({
    showTime: false
  }, {
    where: {
      id,
      [Op.and]: {
        userId
      }
    }
  })
}

// exports.getTopic = async (lastCursor, pageSize) => {
//   const topicList = await Cards.findAll({
//     where: {
//       publish_time: {
//         $ne: null
//       }
//     },
//     order: [
//       ['order','DESC']
//     ]
//   })
//   const res = topicList.slice(lastCursor, Number(pageSize)+Number(lastCursor))
//   return res
// }