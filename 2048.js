var arr, TAILLE, newcell = false, remplis = false; var score = 0; var niveau;var scores;;
function OnLoad() {
    GenerTab(document.getElementById("Select_Level").selectedIndex);
    niveau = document.getElementById("Select_Level").selectedIndex;
    GenerScores(document.getElementById("Select_Level").selectedIndex);
}
function OnChangeLevel()
{
    document.getElementById("MyTable").innerHTML = "";
    GenerTab(document.getElementById("Select_Level").selectedIndex);
    niveau = document.getElementById("Select_Level").selectedIndex;
    GenerScores(document.getElementById("Select_Level").selectedIndex);
}
function GenerTab(niveau)
{
    TAILLE = getSize(niveau);
     arr = new Array(TAILLE);
    var table = document.getElementById("MyTable");
    var row,cell;
    for (var i=0;i<TAILLE;i++)
    {
        arr[i] = new Array(TAILLE);
        row = table.insertRow(-1);
        for (var j = 0; j <TAILLE; j++) {
            cell = row.insertCell(-1);
            cell.id = i.toString() + "_" + j.toString();
            arr[i][j] = 0;
        }
    }
    // 2 valeurs de depart
    NewCell()
    NewCell()
}
function getSize(niveau) {
    if (niveau == 0) {
        return 3;
    }
    if (niveau == 1) {
        return 4;
    }
    if (niveau == 2) {
        return 5;
    }
    if (niveau == 3) {
        return 8;
    }
}
function RandomCell(SnakeTable) {
    var val = []; var tab;
        do {
            val[0] = Math.floor((Math.random() * SnakeTable));
            val[1] = Math.floor((Math.random() * SnakeTable));
            tab = arr[val[0]][val[1]];
        }
        while (tab != 0);
        return val;
    }
function KeyPress(x) {
    var Key = KeyMap(x);
    if (Key == 37)//Gauche
    {
        MoveLeft();
    }
    if (Key == 38)//haut
    {
        MoveTop();
    }
    if (Key == 39)//Droite
    {
        MoveRight();
    }
    if (Key == 40)//Bas
    {
        MoveBot();
    }
}
function MoveLeft()
{
    for (var i = 0; i < TAILLE; i++)//ligne
    {
        var tabligne = new Array();
        for (var j = 0; j < TAILLE; j++)//coll
        {
            if (arr[i][j] != 0) {
                tabligne.push(arr[i][j]);
            }
        }
        //Decale tout � gauche
        while (tabligne.length < TAILLE) {
            tabligne[tabligne.length] = 0;
        }
        //Met des 0 � droite
        Adding(tabligne, false);
        //Renvois le truc avec "fusions"
        for (var l = 0; l < tabligne.length; l++) {
            arr[i][l] = tabligne[l];
        }
        tabligne = null;
    }
    Update()
}
function MoveTop() {
    for (var i = 0; i < TAILLE; i++)//coll
    {
        var tabligne = new Array();
        for (var j = 0; j < TAILLE; j++)//ligne
        {
            if (arr[j][i] != 0) {
                tabligne.push(arr[j][i]);
            }
        }
        //Decale tout � gauche
        while (tabligne.length < TAILLE) {
            tabligne[tabligne.length] = 0;
        }
        Adding(tabligne, false);
        for (var l = 0; l < tabligne.length; l++) {
            arr[l][i] = tabligne[l];
        }
        tabligne = null;
    }
    Update()
}
function MoveRight() {
    for (var i = 0; i < TAILLE; i++)//ligne
    {
        var tabligne = new Array();
        for (var j = 0; j < TAILLE; j++)//coll
        {
            if (arr[i][j] != 0) {
                tabligne.push(arr[i][j]);
            }
        }
        //met des 0 � droite
        while (tabligne.length < TAILLE) {
            tabligne.unshift(0);
        }
        //Met des 0 � droite
        Adding(tabligne, true);
        //Renvois le truc avec "fusions"
        for (var l = 0; l < tabligne.length; l++) {
            arr[i][l] = tabligne[l];
        }
        tabligne = null;
    }
    Update()
}
function MoveBot() {
    for (var i = 0; i < TAILLE; i++)//coll
    {
        var tabligne = new Array();
        for (var j = 0; j < TAILLE; j++)//ligne
        {
            if (arr[j][i] != 0) {
                tabligne.push(arr[j][i]);
            }
        }
        //met des 0 � droite
        while (tabligne.length < TAILLE) {
            tabligne.unshift(0);
        }
        Adding(tabligne, true);
        for (var l = 0; l < tabligne.length; l++) {
            arr[l][i] = tabligne[l];
        }
        tabligne = null;
    }
    Update()
}
function NewCell() {
    var random = RandomCell(TAILLE); var ligne = random[0]; var col = random[1];
    arr[ligne][col] = 2;
    document.getElementById(ligne.toString() + "_" + col.toString()).innerHTML = arr[ligne][col];
}
function Adding(tab,reverse)
{
    newcell = false;
    if (reverse == false) {
        if (tab != null) {
            for (k = 0; k < TAILLE - 1; k++) {
                if (tab[k] === tab[k + 1] && tab[k] != 0 && tab[k + 1] != 0) {
                    tab[k] = tab[k] * 2;
                    tab.splice(k + 1, 1);
                    tab.push(0);
                    k = 0;
                }
            }
        }
    }
    else {
        if (tab != null) {
            for (k = TAILLE - 1; k >0; k--) {
                if (tab[k] === tab[k -1] && tab[k] != 0 && tab[k -1] != 0) {
                    tab[k] = tab[k] * 2;
                    tab.splice(k - 1, 1);
                    tab.unshift(0);
                    k = 0;
                }
            }
        }
    }
}
function KeyMap(x)
{
    var key = x.which || x.keyCode;
    if (key == 37||key==81)//Gauche
    {
        return 37;
    }
    if (key == 38 || key == 90)//haut
    {
        return 38;
    }
    if (key == 39 || key == 68)//Droite
    {
        return 39;
    }
    if (key == 40 || key == 83)//Bas
    {
        return 40;
    }
}

function Update() {
    testNewCell()
    document.getElementById("lblScore").innerText = score;
    for (var i=0;i<TAILLE;i++)
    {
        for (var j = 0; j < TAILLE; j++) {
            document.getElementById(i.toString() + "_" + j.toString()).innerHTML = '';
        }
    }
    for (var i = 0; i < TAILLE; i++) {
        for (var j = 0; j < TAILLE; j++) {
            if (arr[i][j] != 0) {
                document.getElementById(i.toString() + "_" + j.toString()).innerHTML = arr[i][j];
            }
        }
    }
    if (newcell == true) {
        NewCell();
    }
    if (newcell==false && remplis==true){
        document.getElementById("SendScore").style.display = 'block';
        document.getElementById("MyTable").innerHTML = "";
        GenerTab(document.getElementById("Select_Level").selectedIndex);
    }
}
function testNewCell() {
    newcell = false;
    remplis = true;
    score = 2;
    for (var i = 0; i < TAILLE; i++) {
            for (var j = 0; j < TAILLE; j++) {
                if (document.getElementById(i.toString() + "_" + j.toString()).innerHTML != arr[i][j]) {
                    newcell = true;
                }
                if (document.getElementById(i.toString() + "_" + j.toString()).innerHTML == 0) {
                    remplis = false;
                }
                else {
                    score += parseInt(document.getElementById(i.toString() + "_" + j.toString()).innerHTML);
                }
            }
        }
}