jQuery.noConflict(); // prevent conflicts with prototype

render = (data) => {
    let html = data.map((item, index) => {
        return `<tr>
                <th scope="row">${item.id}</th>
                <td>${item.email }</td> 
                <td>${item.first_name}</td> 
                <td>${item.last_name}</td> 
                <td><img src="${item.avatar}" alt="Trulli" width="60" height="60"></td>
                <td>
                <span onClick=Detail(${item.id})><i class="fas fa-info-circle mr-2"></i></span>
                    <span onClick=Edit(${item.id})><i class="text-warning fas fa-edit mr-2"></i></span>
                    <span onClick=Delete(${item.id})><i class="text-danger fas fa-trash-alt"></i></span>
                </td>
             </tr>`;
    })
    document.getElementById("data").innerHTML = html.join(" ");

}

getDetail = (data) => {
    let html =
        `<div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${data.avatar}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${data.email }</h5>
                    <p class="card-text">${data.first_name} ${data.last_name}</p>
                    <a href="index.html" class="btn btn-primary">Back to list</a>
                </div>
                </div>`;
    document.getElementById("content").innerHTML = html;
}
load = () => {
    let data = {
        "page": 1,
        "per_page": 6,
        "total": 12,
        "total_pages": 2,
        "data": [{
                "id": 1,
                "email": "george.bluth@reqres.in",
                "first_name": "George",
                "last_name": "Bluth",
                "avatar": "https://reqres.in/img/faces/1-image.jpg"
            },
            {
                "id": 2,
                "email": "janet.weaver@reqres.in",
                "first_name": "Janet",
                "last_name": "Weaver",
                "avatar": "https://reqres.in/img/faces/2-image.jpg"
            },
            {
                "id": 3,
                "email": "emma.wong@reqres.in",
                "first_name": "Emma",
                "last_name": "Wong",
                "avatar": "https://reqres.in/img/faces/3-image.jpg"
            },
            {
                "id": 4,
                "email": "eve.holt@reqres.in",
                "first_name": "Eve",
                "last_name": "Holt",
                "avatar": "https://reqres.in/img/faces/4-image.jpg"
            },
            {
                "id": 5,
                "email": "charles.morris@reqres.in",
                "first_name": "Charles",
                "last_name": "Morris",
                "avatar": "https://reqres.in/img/faces/5-image.jpg"
            },
            {
                "id": 6,
                "email": "tracey.ramos@reqres.in",
                "first_name": "Tracey",
                "last_name": "Ramos",
                "avatar": "https://reqres.in/img/faces/6-image.jpg"
            }
        ],
        "support": {
            "url": "https://reqres.in/#support-heading",
            "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
    };
    window.localStorage.setItem("data", JSON.stringify(data));
};
loadAgain = () => {
    let store = window.localStorage;
    let rs = JSON.parse(store.getItem("data"));
    render(rs.data);
}
var detail = (method, url) => {
    //Khoi tao doi tuong
    var xhttp = new XMLHttpRequest() || ActiveXObject();
    //Bat su kien thay doi trang thai cuar request
    xhttp.onreadystatechange = function() {
            //Kiem tra neu nhu da gui request thanh cong
            if (this.readyState == 4 && this.status == 200) {
                //In ra data nhan duoc
                var data = JSON.parse(this.responseText);
                getDetail(data.data);
            }
        }
        //cau hinh request
    xhttp.open(method, url, true);
    //xhttp.open("GET", "https://reqres.in/api/users/2", true);
    //cau hinh header cho request
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //gui request
    xhttp.send('data=true');
}

function Detail(id) {
    console.log(id + " ahihi");

    detail("GET", `https://reqres.in/api/users/${id}`);
}

function Delete(id) {
    let store = window.localStorage;
    let rs = JSON.parse(store.getItem("data"));
    let index = rs.data.findIndex(item => {
        return item.id == id;
    });
    rs.data.splice(index, 1);
    store.setItem("data", JSON.stringify(rs));
    location.replace("index.html");
}
window.addEventListener("load", loadAgain());

search = (e) => {
    let target = e.target;
    let key = target.value;
    let rs = JSON.parse(window.localStorage.getItem("data"));
    let data = rs.data.filter(item => {
        return item.first_name.indexOf(key) != -1;
    })
    render(data);
}