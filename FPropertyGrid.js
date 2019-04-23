class FPropertyGrid {
    constructor(id, parent, config)  {
        this._id = id;
        this.parentElement = parent;
        this.object = null;
        this.event = {
            afterValueChange: config ? config.afterValueChange : undefined,
            beforeValueChange: config ? config.beforeValueChange : undefined,
        };
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
            var propG = this;
            var inpVal = document.createElement("input");
            inpVal.setAttribute("type","input");
            inpVal.id = "txt"+prop;
            inpVal.setAttribute("value",obj[prop]);
            inpVal.onchange = function() {
                if(propG.event.beforeValueChange && typeof propG.event.beforeValueChange === "function") propG.event.beforeValueChange(obj, prop,this.value);
                obj[prop] = this.value;
                if(propG.event.afterValueChange && typeof propG.event.afterValueChange === "function") propG.event.afterValueChange(obj, prop,this.value);
            }

            tdVal.appendChild(inpVal);
        }
    }
}