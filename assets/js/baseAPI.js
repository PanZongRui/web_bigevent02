// 每次调用 $.get() ,$.post(), $.ajax()
// 会调用  ajaxPrefilter 这个函数
// 这个函数可以拿到给 Ajax 提供的配置的对象 
$.ajaxPrefilter(function (option) {

  // 在发起 Ajax 之前,统一拼接请求的根路径
  option.url = 'http://www.liulongbin.top:3007' + option.url
})