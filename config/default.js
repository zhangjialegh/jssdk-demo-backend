const config = {
  dev: {
    // 启动端口
    port: 8001,
    // 数据库配置
    database: {
      DATABASE: 'demo',
      USERNAME: 'root',
      PASSWORD: 'mysql',
      PORT: '3306',
      HOST: '127.0.0.1'
    },
    wechat: {
      app_id:'wx4870da4113bed504',
      secret_id:'2a5ee5a59eaae4042d61d403c90fd0e8',
      wechat_grant_type:'authorization_code',
      wechat_code_to_session_url:'https://api.weixin.qq.com/sns/jscode2session'
    }
  },
  prod: {
    // 启动端口
    port: 8001,
    // 数据库配置
    database: {
      DATABASE: 'demo',
      USERNAME: 'root',
      PASSWORD: 'jiale',
      PORT: '3306',
      HOST: '127.0.0.1'
    },
    wechat: {
      app_id:'wx4870da4113bed504',
      secret_id:'2a5ee5a59eaae4042d61d403c90fd0e8',
      wechat_grant_type:'authorization_code',
      wechat_code_to_session_url:'https://api.weixin.qq.com/sns/jscode2session'
    }
  }
}

module.exports = config