class FPropertyGrid {
    constructor(id, parent)  {
        this._id = id;
        this.parentElement = parent;
        this.object = null;
    }
    
    get id(){
        return this._id;
    }

    setObject(obj){
        // reset
        this.object = obj;
        this.parentElement.innerHTML = "";
        // redraw
        this.drawObject(this.object, this.parentElement);
    }

    drawObject(obj, parent){
        if(obj && typeof obj === 'object'){
            var tabla = document.createElement("table");
            tabla.setAttribute("class","FPropGridTable");

            for(var p in obj) {
                this.drawPropertie(obj,p,tabla);
            }
            parent.appendChild(tabla);
        }
    }

    drawPropertie(obj, prop, table) {
        var tr = document.createElement("tr");
        var tdExpand = document.createElement("td");
        var tdName = document.createElement("td");
        var tdVal = document.createElement("td");

        tr.appendChild(tdExpand);
        tr.appendChild(tdName);
        tr.appendChild(tdVal);
        table.appendChild(tr);
        tdExpand.classList = "FPropGridTable-expandcell";

        tdName.innerText = prop;

        if(typeof obj[prop] === 'object'){
            tr.className = "FPropGridTable-exp";

            var i = document.createElement("i");
            i.className = "plus icon";
            tdExpand.appendChild(i);
            tdExpand.width="10";

            tdVal.innerText = obj.toString();

            var trEd = document.createElement("tr");
            var tdEd = document.createElement("td");

            tdEd.colSpan = 3;
            trEd.appendChild(tdEd);
            trEd.style = "display:none;";
            
            table.appendChild(trEd);
            
            tdExpand.onclick = function() { 
                $(trEd).toggle(); 
                if($(trEd).is(":visible")){
                    i.className = "minus icon";
                } else {
                    i.className = "plus icon";
                }
            };               

            this.drawObject(obj[prop],tdEd);
        } else {
            var inpVal = document.createElement("input");
            inpVal.setAttribute("type","input");
            inpVal.id = "txt"+prop;
            inpVal.setAttribute("value",obj[prop]);
            inpVal.onchange = function() {
                obj[prop] = this.value;
            }

            tdVal.appendChild(inpVal);
        }
    }
}