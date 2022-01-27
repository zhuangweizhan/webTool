(function () {
  if (!exports) var exports = window;
  var BARS = [
      212222, 222122, 222221, 121223, 121322, 131222, 122213, 122312, 132212, 221213, 221312, 231212, 112232, 122132, 122231, 113222, 123122, 123221, 223211, 221132, 221231, 213212, 223112, 312131, 311222, 321122, 321221, 312212, 322112, 322211, 212123, 212321, 232121, 111323, 131123, 131321, 112313, 132113, 132311, 211313, 231113, 231311, 112133, 112331, 132131, 113123, 113321, 133121, 313121, 211331, 231131, 213113, 213311, 213131, 311123, 311321, 331121, 312113, 312311, 332111, 314111,
      221411, 431111, 111224, 111422, 121124, 121421, 141122, 141221, 112214, 112412, 122114, 122411, 142112, 142211, 241211, 221114, 413111, 241112, 134111, 111242, 121142, 121241, 114212, 124112, 124211, 411212, 421112, 421211, 212141, 214121, 412121, 111143, 111341, 131141, 114113, 114311, 411113, 411311, 113141, 114131, 311141, 411131, 211412, 211214, 211232, 23311120,
    ],
    START_BASE = 38,
    STOP = 106;
  function codeBar(code, barcodeType) {
    if (arguments.length < 2) barcodeType = code128Detect(code);
    if (barcodeType == 'C' && code.length % 2 == 1) code = '0' + code;
    var a = parseBarcode(code, barcodeType);
    return bar2html(a.join('')); // + '<label>' + code + '</label>';
  }
  function bar2html(s) {
    for (var pos = 0, sb = []; pos < s.length; pos += 2) {
      sb.push('<div class="bar' + s.charAt(pos) + ' space' + s.charAt(pos + 1) + '"></div>');
    }
    return sb.join('');
  }
  function code128Detect(code) {
    if (/^[0-9]+$/.test(code)) return 'C';
    if (/[a-z]/.test(code)) return 'B';
    return 'A';
  }
  function parseBarcode(barcode, barcodeType) {
    var bars = [];
    bars.add = function (nr) {
      var nrCode = BARS[nr];
      this.check = this.length == 0 ? nr : this.check + nr * this.length;
      this.push(nrCode || 'UNDEFINED: ' + nr + '->' + nrCode);
    };
    bars.add(START_BASE + barcodeType.charCodeAt(0));
    for (var i = 0; i < barcode.length; i++) {
      var code = barcodeType == 'C' ? +barcode.substr(i++, 2) : barcode.charCodeAt(i);
      converted = fromType[barcodeType](code);
      if (isNaN(converted) || converted < 0 || converted > 106) throw new Error('Unrecognized character (' + code + ') at position ' + i + " in code '" + barcode + "'.");
      bars.add(converted);
    }
    bars.push(BARS[bars.check % 103], BARS[STOP]);
    return bars;
  }
  var fromType = {
    A: function (charCode) {
      if (charCode >= 0 && charCode < 32) return charCode + 64;
      if (charCode >= 32 && charCode < 96) return charCode - 32;
      return charCode;
    },
    B: function (charCode) {
      if (charCode >= 32 && charCode < 128) return charCode - 32;
      return charCode;
    },
    C: function (charCode) {
      return charCode;
    },
  };

  function codeQr(id, content) {
    $('#' + id).qrcode({
      render: 'table', //table方式
      width: 180, //宽度
      height: 180, //高度
      text: content, //任意内容
      correctLevel: 3,
    });
    html2canvas($('#' + id), {
      onrendered: function (canvas) {
        document.body.appendChild(canvas);
        $('#' + id).html(canvas);
      },
    });
  }

  function c_post(url, data, callback) {
    $.ajax({
      type: 'post',
      url: url,
      data: data,
      async: false,
      dataType: 'json',
      success: function (data) {
        callback(data);
      },
    });
  }

  function codeWxSmall(id, content, param) {
    // var data = { createCodeType: param.createCodeType , page: content };
    const inputArray = content.split('?');
    var page = inputArray[0]
    var scene = "";
    if( inputArray.length > 1 ){
        scene = inputArray[1]
    }
    var data = { createCodeType: param.createCodeType, scene: scene, page: page };
    c_post('/getWxCode', data, function (res) {
      if (res.result.status === 1 ) {
        const filePath = res.result.data.data.filePath;
        alert("生成成功");
        setWxSmall(filePath);
      } else {
        alert('生成小程序二维码异常,请检查路径');
      }
    });
  }

  function setWxSmall(filePath) {
    $('#code_content').html('<img src="https://cdn.youliao.com/' + filePath + '"  style="width: 500px;height: 500px;" />');
  }

  //--| Export
  exports.codeQr = codeQr; //二维码
  exports.codeBar = codeBar; //条形码
  exports.codeWxSmall = codeWxSmall; //小程序码
  exports.setWxSmall = setWxSmall; //小程序码
})();
/*
    type*：qr是二维码  bar是条形码 codeWxSmall是小程序码
    id* ： 放置二维码容器的ID
    content*：二维码的跳转链接
    data:当type=codeWxSmall必传，格式如下：
         {appid:"*****", secret:"****", codeType:"wx" };//codeType qr是方的 wx是圆
*/
function createCode(type, id, content, data) {
  if (type== 'bar') {
    var divElement = document.getElementById(id);
    divElement.innerHTML = codeBar(content, 'C');
    html2canvas($('#' + id), {
      onrendered: function (canvas) {
        document.body.appendChild(canvas);
        $('#' + id).html(canvas);
      },
    });
  } else if (type == 'qr') {
    codeQr(id, content);
  } else if (type == 'codeWxSmall') {
    codeWxSmall(id, content, data);
  } else {
    alert('暂无该二维码类型');
  }
}
