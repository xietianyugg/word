$(function () {

    var heroList = null;
  
    // 获取英雄列表的方法
    function getHeroList() {
      $.ajax({
        url: 'http://127.0.0.1:5001/getallhero',
        type: 'get',
        success: function (result) {
          console.log(result)
          var str = template('row', result)
          $('#tbd').html(str)
  
          heroList = result.data;
        }
      })
    }
  
    getHeroList()
  
    $('#add').on('click', function () {
      $('#addbox').modal('show')
    })
  
    // 初始化下拉框的样式
    $('.ui.dropdown').dropdown();
  
    $('#btnAdd').on('click', function () {
      $.ajax({
        url: 'http://127.0.0.1:5001/addhero',
        data: $('#addForm').serialize(),
        type: 'post',
        dataType: 'json',
        success: function (result) {
          if (result.status === 200) {
            getHeroList()
          }
        }
      })
    });
  
    // 实现删除功能
    $("#tbd").on("click", "#del", function () {
      // alert(1);
      var id = $(this).attr("data-id");
  
      $.ajax({
        url: "http://127.0.0.1:5001/datethero/" + id,
        success: function (res) {
          console.log(res);
          location.reload();
        }
      });
    });
  
    // 监听列表的编辑按钮, 点击编辑, 展示模态框
    $("#tbd").on("click", "#edit", function () {
      //  点击编辑, 展示模态框
      // 给模态框渲染当前英雄的数据
      var id = $(this).attr("data-id");
      // 根据id, 从所有英雄的数组中进行查找, 找到当前的英雄信息
      if (heroList) {
        for (var i = 0; i < heroList.length; i++) {
          // 要用==才可以
          if (heroList[i].id == id) {
            // 找到信息啦
            console.log(heroList[i]);
            // 使用模板引擎渲染模态框
            var html = template("editTpl", heroList[i]);
            $("#editbox").html(html);
  
            // 初始化下拉框的样式
            $('.ui.dropdown').dropdown();
  
            $('#editbox').modal('show');
            break;
          }
        }
      };
    });
  
    // 给弹框的编辑按钮加点击事件
    $("#editbox").on("click", "#btnEdit", function(){
      var id = $(this).attr("data-id");
  
      $.ajax({
        url:"http://127.0.0.1:5001/updatahero/" + id,
        type: "POST",
        data: $('#editForm').serialize(),
        success:function(res){
          console.log(res);
          location.reload();
        }
      });
  
    });
  
  })
  