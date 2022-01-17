$(function () {


  // 分页
  var laypage = layui.laypage;
  // 获取当前页数据条数

  // 定义一个查询的参数对象,将在请求数据时,
  // 需要将请求参数对象提交到服务器 
  let data = {
    // 当前页的数据长度
    art_length: '',
    q: {
      pagenum: 1,  //页码值
      pagesize: 3, // 每页显示多少条数据
      cate_id: '', // 文章分类的 Id
      state: ''  // 文章的状态，可选值有：已发布、草稿
    }
  }
  // let q = {
  //   pagenum: 1,  //页码值
  //   pagesize: 3, // 每页显示多少条数据
  //   cate_id: '', // 文章分类的 Id
  //   state: ''  // 文章的状态，可选值有：已发布、草稿
  // }

  // 定义美化时间格式的过滤器
  template.defaults.imports.dateFormat = function (date) {
    const dt = new Date(date);

    let y = String(dt.getFullYear())
    let m = String(dt.getMonth() + 1).padStart(2, '0');
    let d = String(dt.getDate()).padStart(2, '0');
    let h = String(dt.getHours()).padStart(2, '0');
    let i = String(dt.getMinutes()).padStart(2, '0');
    let s = String(dt.getSeconds()).padStart(2, '0');

    return `${y}-${m}-${d} ${h}-${i}-${s}`

  }
  // 获取文章的列表数据
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: data.q,
      success: function (res) {

        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        // 当前页的数据长度
        data.art_length = res.data.length;
        let htmlStr = template('tpl-table', res);
        $('tbody').html(htmlStr);
        layui.layer.msg(res.message);

        // 调用分页方法
        renderPage(res.total)
      }
    })
  }

  initTable();

  // 初始化文章分类
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        let htmlStr = template('tpl-cate', res);
        $('[name=cate_id]').html(htmlStr);
        // 通过 layui 重新渲染表单区域的 UI 结构
        layui.form.render(); //更新全部
      }
    })
  }
  initCate();

  // 实现筛选功能
  $('#form-search').on('submit', function (e) {
    e.preventDefault();
    // 获取所有分类,与发布状态
    let cate_id = $('[name=cate_id]').val();
    let state = $('[name=state]').val();

    data.q.cate_id = cate_id;
    data.q.state = state;
    initTable();

  })


  // 渲染分页区域(当表格渲染完成之后[initTable], 获取总的数据记录数,)
  function renderPage(total) {
    // 分页模块文档 -
    //执行一个laypage实例
    laypage.render({
      elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
      count: total,//数据总数，从服务端得到
      limit: data.q.pagesize, // 每页显示的条数。
      curr: data.q.pagenum, // 默认显示哪一页
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip', 'refresh'], //自定义排版。
      limits: [2, 3, 5, 10], //每页条数的选择项。
      jump: function (obj, first) {

        // 把最新的页码值,赋值到 q 这个查询参数对象中
        data.q.pagesize = obj.limit;
        data.q.pagenum = obj.curr;

        //首次不执行
        if (!first) {
          initTable();
        }
      }
    });
  }

  // 删除文章分类------------------
  // 为编辑按钮绑定点击事件
  $('tbody').on('click', '.btn-delete', function () {

    // 获取当前页删除按钮的个数
    // let len = $('.btn-delete').length

    // 获取id值
    let id = $(this).attr('data-id');
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {

      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layui.layer.msg(res.message);
          }
          layui.layer.msg(res.message);
          layer.close(index);


          // 判断删除完成后，当前页是否还有剩余的数据，根据当前页删除按钮的个数进行判断
          // 如果没有则让页码值减一
          if (data.art_length === 1) {
            // 页码之最小必须是 1
            data.q.pagenum = data.q.pagenum === 1 ? 1 : data.q.pagenum - 1;
          }


          initTable();
        }
      })
    });
  })


})