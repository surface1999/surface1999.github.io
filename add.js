//add form
let add = (e) => {
    e.preventDefault();
    let name = document.querySelector('.form-group input[type="text"]').value;
    let job = document.querySelector('.form-group input[type="text"]').value;
    console.log(name + "-" + job);
    let newItem = {
        first_name: name,
        last_name: job,
        "email": "tracey.ramos@reqres.in",
        "avatar": "https://reqres.in/img/faces/6-image.jpg"
    }
    let store = window.localStorage;
    let rs = JSON.parse(store.getItem("data"));
    let id = rs.data.length == 0 ? 1 : rs.data[rs.data.length - 1].id + 1;
    newItem.id = id;
    rs.data.push(newItem);
    store.setItem("data", JSON.stringify(rs));
    location.replace("index.html");
}

let btn_add = document.getElementById("btn-add");
btn_add.addEventListener("click", (e) => add(e));