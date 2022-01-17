$(function () {

  // 获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        let htmlStr = template('tpl-table', res);
        $('tbody').html(htmlStr);
      }
    })
  }

  initArtCateList();
  // 添加文章分类------------------
  // 预先保留弹出层索引
  let indexAdd = null;
  // 为添加类别按钮绑定点击事件
  $('#bthAddCate').on('click', function () {
    // 弹出层
    indexAdd = layui.layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: ['添加文章分类', 'font-size:18px;'],
      content: $('#dialog-add').html(),
    });
  })


  // 通过代理的方式，为弹出层  form-add 添加表单绑定  submit 事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg(res.message);
        // 根据索引值，关闭对应的弹出层
        layui.layer.close(indexAdd);
        initArtCateList();
      }
    })
  })


  // 更新文章分类------------------
  // 预先保留弹出层索引
  let indexEdit = null;
  // 为编辑按钮绑定点击事件
  $('tbody').on('click', '.btn-edit', function () {
    // 弹出层
    indexEdit = layui.layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: ['修改文章分类', 'font-size:18px;'],
      content: $('#dialog-edit').html(),
    });

    // 获取id值
    let id = $(this).attr('data-id');
    // console.log(id);
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        layui.form.val('form-edit', res.data);
      }
    })
  })


  // 通过代理的方式，为弹出层  form-edit 修改表单绑定  submit 事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg(res.message);
        // 根据索引值，关闭对应的弹出层
        layui.layer.close(indexEdit);
        initArtCateList();
      }
    })
  })


  // 删除文章分类------------------
  // 为编辑按钮绑定点击事件
  $('tbody').on('click', '.btn-delete', function () {

    // 获取id值
    let id = $(this).attr('data-id');
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {

      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layui.layer.msg(res.message);
          }
          layui.layer.msg(res.message);
          layer.close(index);
          initArtCateList();
        }
      })
    });
  })



})