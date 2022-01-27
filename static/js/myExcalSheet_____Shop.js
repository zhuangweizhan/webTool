/* 庄伟展 EXCAL导出 */

var _file = document.getElementById('file');
var _grid = document.getElementById('grid');

var shop_onsheet = function (json, sheetnames, select_sheet_cb) {
  /* show grid */
  _grid.style.display = 'block';
  /* set up table headers */
  var L = 0;
  json.forEach(function (r) {
    if (L < r.length) L = r.length;
  });
  console.log(L);
  for (var i = json[0].length; i < L; ++i) {
    json[0][i] = '';
  }
  /* load data */
  var list = [];
  for (var i = 0; i < json.length; i++) {
    //json.length   i是第几列
    var cList = [];
    for (var j = 0; j < L; j++) {
      cList[j] = json[i][j];
    }
    list[i] = cList;
  }

  $("#result").html(JSON.stringify(list));

  /*
    var resultMap = {"list":list, "total":list.length };
    var uData = { jsonData: JSON.stringify(resultMap), name: pathName };
    uPost( "/systemUtil/uploadJsonFile",uData,function(){
        uTip("上传完毕。。。。");
    })
	*/
};


myExcalSheet({
  file: _file,
  on: {
    sheet: shop_onsheet,
    foo: 'bar',
  },
});
