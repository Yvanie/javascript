let nom = document.getElementById("nom")
let postnom = document.getElementById("postnom")
let prenom = document.getElementById("prenom")
let pays = document.getElementById("pays")
let genre = document.getElementById("genre")
let github = document.getElementById("github")
let tablebody = document.querySelector("table tbody")
let submitBtn = document.getElementById('btnsubmit')
let editMode = false;
let editionList = null
let form = document.getElementById("form")

editModeEnable(editMode);
let apprennents =[
    {
        'nom': "Yvanie",
        'postnom' : "yva",
        'prenom' : "Noelle",
        'pays' : "comeroun",
        'github': "github/yva",
        'genre': "female",
        'isdone': false
    },
    {
        'nom': "Jean",
        'postnom' : "Coach",
        'prenom' : "Claude",
        'pays' : "congo",
        'github': "github/christ",
        'genre': "male",
        'isdone': false
    }
]
function loadapprennetInTable(){
    tablebody.innerHTML = ''
    
    for (const list of apprennents) {
        let temp = `<tr>
    <td> ${list.nom}</td>
    <td> ${list.postnom}</td>
    <td> ${list.prenom}</td>
    <td> ${list.pays}</td>
    <td> ${list.genre}</td>
    <td> ${list.github}</td>

    <td>
    <button class="btn btn-success" data-nom="${list.nom}" data-postnom="${list.postnom}" data-prenom="${list.prenom}" 
    data-pays="${list.pays}" data-genre="${list.genre}" data-github="${list.github}" 
    onclick= "editApprennent(this)"><i class="fas fa-edit"></i></button>
    <button class="btn btn-danger" onclick="confirmation(this, ${apprennents.indexOf(list)})"> 
    <i class="fa fa-trash" aria-hidden="true"></i>
   </button>
    </td>
    </tr>
    `
    tablebody.innerHTML += temp
    }
}
loadapprennetInTable()
form.addEventListener('submit', function(e){
    e.preventDefault();
    let nomvalue = nom.value
    let postnomvalue = postnom.value
    let prenomvalue = prenom.value
    let paysvalue = pays.value
    let genrevalue = genre.value
    let githubvalue = github.value
    //console.log(nomvalue)

    if(editMode){
        updateList(nomvalue, postnomvalue, prenomvalue, paysvalue, genrevalue, githubvalue)
    }else{
        addApprennant(nomvalue, postnomvalue, prenomvalue, paysvalue, genrevalue, githubvalue);
    }
    
    
})


function updateList(){
    editionList.nom =nom.value,
    editionList.postnom = postnom.value,
    editionList.prenom = prenom.value,
    editionList.pays = pays.value,
    editionList.genre = genre.value,
    editionList.github = github.value;

    //actualiser le table
    apprennents.find((t) => t.nom == editionList.nom)
    //console.log(apprennents)
    loadapprennetInTable()
    editModeEnable(false)
}

function addApprennant(){
    let newApprennent={
        'nom': nom.value,
        'postnom' : postnom.value,
        'prenom' : prenom.value,
        'pays' : pays.value,
        'genre' : genre.value,
        'github':  github.value,
        'isdone': false
    }

    apprennents.push(newApprennent)
    console.log(apprennents);
    loadapprennetInTable()
        nom.value = ''
        postnom.value = ''
        prenom.value = ''
        pays.value = ''
        genre.value = ''
        github.value = ''
}

function deleteApprennent(e, index){
    apprennents.splice(index, 1)
    loadapprennetInTable()
}

function confirmation(e, index){
    let result = confirm("Are you sure you want to delete?");
    if(result == true){
        deleteApprennent(e, index);
    }
    console.log(result);
}
function editApprennent(e, list){
    //console.log (e.dataset.nom, e.dataset.postnom, e.dataset.prenom, e.dataset.pays, e.dataset.genre, e.dataset.github )
    editModeEnable(true)
    nom.value = e.dataset.nom
    postnom.value=e.dataset.postnom
    prenom.value=e.dataset.prenom
    pays.value=e.dataset.pays
    genre.value=e.dataset.genre
    github.value=e.dataset.github 
    editionList = apprennents.find((t) => t.nom == e.dataset.nom)
    //console.log(editionList)
}
function editModeEnable(enabled){
    if(enabled){
        editMode=true
        submitBtn.innerText ="Modifier"
    }else{
        editMode=false
        submitBtn.innerText ="Ajouter"
        editionList = null
        nom.value = ''
        postnom.value = ''
        prenom.value = ''
        pays.value = ''
        genre.value = ''
        github.value = ''
    
    }
}