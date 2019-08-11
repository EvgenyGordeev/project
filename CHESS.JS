let map = Array();
let inf = Array();

let move_color = "white";
let move_from_x;
let move_from_y;

let start_position_x = null;
let start_position_y = null;


function init_map()
{
    map = 
    [
["R", "P", " ", " ", " ", " ", "p", "r"],
["N", "P", " ", " ", " ", " ", "p", "n"],
["B", "P", " ", " ", " ", " ", "p", "b"],
["Q", "P", " ", " ", " ", " ", "p", "q"],
["K", "P", " ", " ", " ", " ", "p", "k"],
["B", "P", " ", " ", " ", " ", "p", "b"],
["N", "P", " ", " ", " ", " ", "p", "n"],
["R", "P", " ", " ", " ", " ", "p", "r"]
    ];
}

function init_inf()
{
    inf = 
    [
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " ", " "]
    ];
}

function can_move (sx, sy, dx, dy)
{
    if (!can_move_from (sx, sy))
    return false;
    if (!can_move_to (dx, dy))
    return false;
    if (!is_correct_move (sx, sy, dx, dy))
    return false;
    return true;
}

function is_correct_move (sx, sy, dx, dy)
{
    let figure = map [sx] [sy];
    if (is_king (figure))
    return is_corect_king_move (sx, sy, dx, dy);
    if (is_queen (figure))
    return is_corect_queen_move (sx, sy, dx, dy);
    if (is_bishop (figure))
    return is_corect_bishop_move (sx, sy, dx, dy);
    if (is_knight (figure))
    return is_corect_knight_move (sx, sy, dx, dy);
    if (is_rook (figure))
    return is_corect_rook_move (sx, sy, dx, dy);
    if (is_pawn (figure))
    return is_corect_pawn_move (sx, sy, dx, dy);
    return true;
}

function is_king (figure) {return figure.toUpperCase() == "K";}
function is_queen (figure) {return figure.toUpperCase() == "Q";}
function is_bishop (figure) {return figure.toUpperCase() == "B";}
function is_knight (figure) {return figure.toUpperCase() == "N";}
function is_rook (figure) {return figure.toUpperCase() == "R";}
function is_pawn (figure) {return figure.toUpperCase() == "P";}

function is_corect_king_move (sx, sy, dx, dy)
{

return true;
}

function is_corect_queen_move (sx, sy, dx, dy)
{
return true;
}

function is_corect_bishop_move (sx, sy, dx, dy)
{
return true;
}

function is_corect_knight_move (sx, sy, dx, dy)
{
return true;
}

function is_corect_rook_move (sx, sy, dx, dy)
{
return true;
}

function is_corect_pawn_move (sx, sy, dx, dy)
{
return true;
}

function mark_moves_from ()
{
    init_inf ();
    for (let sx = 0; sx <= 7; sx ++)
    for (let sy = 0; sy <= 7; sy ++)
    for (let dx = 0; dx <= 7; dx ++)
    for (let dy = 0; dy <= 7; dy ++)
    if (can_move (sx, sy, dx, dy))
    inf [sx] [sy] = 1;
}

function mark_moves_to ()
{
    init_inf ();
    for (let x = 0; x <= 7; x ++)
    for (let y = 0; y <= 7; y ++)
    if (can_move (move_from_x, move_from_y, x, y))
    inf [x] [y] = 2;
}

function can_move_from (x, y)
{
return get_color (x, y) == move_color;
}

function can_move_to (x, y)
{
    if (map [x] [y] == " ")
    return true;
return get_color (x, y) != move_color;
}

function get_color (x, y)
{
let figure = map [x] [y];
if (figure == " ")
return " ";
return (figure.toUpperCase() == figure) ? "white" : "black";
}

function click_box (x, y)
{
    if (start_position_x !== null && start_position_y !== null) {
        map[x][y] = map[start_position_x][start_position_y];
        map[start_position_x][start_position_y] = " ";

        start_position_x = null;
        start_position_y = null;

        show_map();
    } else {
        start_position_x = x;
        start_position_y = y;
    }
}

function click_box_from ()
{
move_from_x;
move_from_y;
mark_moves_to ();
show_map ();
}

function click_box_to (x, y)
{
map [x] [y] = map [move_from_x] [move_from_y];
map [move_from_x] [move_from_y] = " ";
turn_move();
mark_moves_from();
show_map ();
}

function turn_move ()
{
    move_color = move_color == "white" ? "black" : "white";
}

function figure_to_html (figure)
{
switch (figure)
{
    case "K" : return "&#9812"; case "k" : return "&#9818";
    case "Q" : return "&#9813"; case "q" : return "&#9819";
    case "R" : return "&#9814"; case "r" : return "&#9820";
    case "B" : return "&#9815"; case "b" : return "&#9821";
    case "N" : return "&#9816"; case "n" : return "&#9822";
    case "P" : return "&#9817"; case "p" : return "&#9823";
    default : return "&nbsp;";
}
}

function show_map ()
{
    html = "<table border='1' cellpading = '2' cellspasing = '0'>";

        for (let y = 7; y >= 0; y --)

        {
html += "<tr>";
html += "<td>&nbsp;" + y + "&nbsp;</td>";

for (let x = 0; x <= 7; x ++)
{
if (inf [x] [y] == " ")
color = (x + y) % 2 ? "#eeffee" : "#abcdef";
else
color = inf [x] [y] == "1" ? "#aaffaa" : "ffaaaa";  
html += "<td style = 'height: 50; width: 50; " + 
"background-color: " + color + "; " + 
"text-align: center; " +
"font-size: 40; " +
"' onclick = 'click_box (" + x + ", " + y + "); '>"; 
html += figure_to_html (map [x] [y]); 
html += "</td>";
}
html += "</tr>";
}  
        html += "<tr>";
html += "<td> &nbsp; </td>";
for (let x = 0; x <= 7; x ++)
html += "<td style = 'text-align: center'>" + x + "</td>";
        document.getElementById ("board").innerHTML = html;
}

function start ()
{ 
init_map ();
init_inf();
show_map ();
}

start ();