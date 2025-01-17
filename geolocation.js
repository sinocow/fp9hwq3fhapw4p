// ボタンを押した時の処理
document.getElementById("btn").onclick = function () {
  // 位置情報を取得する
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

// 取得に成功した場合の処理
function successCallback(position) {
  // 緯度を取得し画面に表示
  var latitude = position.coords.latitude;
  document.getElementById("latitude").innerHTML = latitude;
  // 経度を取得し画面に表示
  var longitude = position.coords.longitude;
  document.getElementById("longitude").innerHTML = longitude;
  // 高度を取得し画面に表示
  var altitude = position.coords.altitude;
  document.getElementById("altitude").innerHTML = altitude;
  test2;
}

// 取得に失敗した場合の処理
function errorCallback(error) {
  alert("位置情報が取得できませんでした");
}

function test2(position) {

    //まず現在地の緯度経度を取得する
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    //国土地理院API用に有効桁数を合わせる。
    var adjustiveLat = lat + "00";
    var adjustiveLon = lon + "0";

    //文字列に変換
    var stringLat = String(adjustiveLat);
    var stringLon = String(adjustiveLon);

    //国土地理院APIに現在地の緯度経度を渡して、標高を取得する
    const url = 'http://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php?lon=' + stringLon + '&lat=' + stringLat + '&outtype=JSON';

    console.log(url);

    fetch(url).then(function(response) {
      return response.text();
    }).then(function(text) {
      console.log(text);
      
      //取得したjsonをパース
      var jsonAltitude = JSON.parse(text).elavation;
      console.log("標高：" + jsonAltitude.elevation + "m");

      //ポップアップ表示
      alert("現在地の標高は" + jsonAltitude.elevation + "mです。" +  "(" + "緯度：" + stringLat + "、経度：" + stringLon + ")")

    });

}
