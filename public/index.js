// getKakao();

var geocoder = new kakao.maps.services.Geocoder();
let dataAddress = [
  "광주광역시 북구 무등로111번길 30",
  "광주광역시 북구 용봉로 48-1",
  "광주광역시 북구 용봉로 48",
  "광주광역시 북구 설죽로214번길 27",
  "광주광역시 북구 서하로183번길 45-6",
  "광주광역시 북구 설죽로 251번길 26-7",
  "광주광역시 북구 서하로183번길 53",
  "광주광역시 북구 연양로67번길 27",
  "광주광역시 북구 연양로67번길 29",
  "광주광역시 북구 양산택지로37번길 57",
  "광주광역시 북구 양산택지로37번길 55",
  "광주광역시 북구 중가로3번길 25",
  "광주광역시 북구 무등로262번길 60",
  "광주광역시 북구 양산택지로37번길 51",
  "광주광역시 북구 서암대로315번길 20-7",
  "광주광역시 북구 경양로 104-11",
  "광주광역시 북구 하서로 384",
  "광주광역시 북구 무등로 115",
  "광주광역시 북구 경열로 240",
];
getKakao(dataAddress, geocoder);

async function getKakao(dataAddress, geocoder) {
  let dataDong = await getDong(dataAddress, geocoder);
  for (const k of dataDong) {
    console.log(k);
  }
  getCSV(dataAddress, dataDong);
}

async function getDong(data, geocoder) {
  let dong = [];
  for (let v of data) {
    geocoder.addressSearch(v, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const res = result[0].address.region_3depth_name;
        dong.push(res);
        console.log(res);
      }
    });
  }
  return dong;
}

function getCSV(dataAddress, dataDong) {
  const filename = "dongData.csv";
  let csv = [];
  let row = [];

  console.log(dataAddress);
  console.log(dataDong);

  for (let i of dataDong) console.log(i);

  row.push("주소", "행정동");
  csv.push(row.join(","));

  var newData = [];
  for (var i = 0; i < dataAddress.length; i++) {
    var data = [dataAddress[i], dataDong[i]];
    newData.push(data);
    // console.log(dataDong);
  }
  for (data of [dataAddress, dataDong]) {
    row = [];
    // console.log("data: ", data);
    for (v of data) {
      // console.log("value: ", v);
      row.push(data);
    }
    csv.push(row.join(","));
  }

  downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;

  //?���? 처리�? ?��주기 ?��?�� BOM 추�???���?
  const BOM = "\uFEFF";
  csv = BOM + csv;

  csvFile = new Blob([csv], { type: "text/csv" });
  downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
}
