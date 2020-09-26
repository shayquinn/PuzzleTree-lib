    /*jshint esversion: 6 */
    let old_index = 0, static_old_index, dragItem;
    let currentX, currentY, initialX, initialY;
    let ulArray, ulArrayStatic, ulArrayTemp,  positions, boundArray;
    let ulArrayArray = [], ulArrayStaticArray = [], boundArrayArray = [], positionsArray = [];
    let ulIds = [], spanIds = [];
    let active = false, mousedown = true;
    let puzzelNumber;

    let el1, el2, dif1x, dif2x , dif1y, dif2y;

    let divisionXArray = [];
    let dimentionWH = [];
    let dimentionOrignalWH = [];
    let posArray = [];
    let urls = [];
    let orignalIds = [];
    let scaleFactor = [];

    var container = document.getElementsByTagName("BODY")[0];

    onImagesLoaded(container, function() {
        //alert("All the images have loaded");
         getImageDetalas();
         populate();
         setEventListener();
    });

    function onImagesLoaded(container, event) {
      //https://stackoverflow.com/questions/48987395/check-if-all-the-images-in-the-page-are-loaded
      var images = container.getElementsByTagName("img");
      var loaded = images.length;
      for (var i = 0; i < images.length; i++) {
          if (images[i].complete) {
              loaded--;
          }
          else {
              images[i].addEventListener("load", function() {
                  loaded--;
                  if (loaded == 0) {
                      event();
                  }
              });
          }
          if (loaded == 0) {
              event();
          }
      }
  }

  function setEventListener(){
    window.addEventListener("touchstart", dragStart, false);
    window.addEventListener("touchend", dragEnd, false);
    window.addEventListener("touchmove", drag, false);
    window.addEventListener("mousedown", dragStart, false);
    window.addEventListener("mouseup", dragEnd, false);
    window.addEventListener("mousemove", drag, false);
  }//end setEventListener

  function getImageDetalas(){
    let getimg = document.getElementsByClassName('puzzleTree');
    for(let i=0;i<getimg.length;i++){
        let imgId = getimg[i].id;
        let url = getimg[i].src;
        let imgX = getimg[i].offsetLeft, imgY = getimg[i].offsetTop;
        let imgW = getimg[i].width, imgH = getimg[i].height;
        let urlW = getimg[i].naturalWidth, urlH = getimg[i].naturalHeight;
        let factorX = imgW/urlW, factorY = imgH/urlH;
        if(getimg[i].getAttribute("row") == null || getimg[i].getAttribute("row") == 0 || getimg[i].getAttribute("row") == 1){
            console.error("Error row tag must be present and the value must be grater then one!");
          	return;
        }
        if(getimg[i].getAttribute("col") == null || getimg[i].getAttribute("col") == 0 || getimg[i].getAttribute("col") == 1){
            console.error("Error col tag must be present and the value must be grater then one!");
            return;
        }
        let row = getimg[i].getAttribute("row"), col = getimg[i].getAttribute("col");

        orignalIds.push(imgId);
        divisionXArray.push([row, col]);
        dimentionOrignalWH.push([urlW, urlH]);
        scaleFactor.push([factorX, factorY]);
        dimentionWH.push([imgW, imgH]);
        posArray.push([imgX, imgY]);
        urls.push(url);
        getimg[i].style.opacity = "0";
    }
  }//end getImageDetalas


    function populate(){
      for(let l=0;l<urls.length;l++){
        let row = divisionXArray[l][0], col=divisionXArray[l][1];   
        let iw = dimentionOrignalWH[l][0], ih = dimentionOrignalWH[l][1];
        let liW = Math.floor(iw/row), liH = Math.floor(ih/col);
        let px = posArray[l][0], py = posArray[l][1];
        let body = document.getElementById("body");
        let con = document.createElement('div');
        con.id = "con"+l;

        con.style.width = liW*row+"px";
        con.style.height = liH*col+"px";
        con.style.position = "absolute";
        con.style.backgroundColor = "blue";
        con.style.left = px+"px";
        con.style.top = py+"px";
        body.appendChild(con);
        let tx = document.createTextNode("Puzzle Complete! :)");
        let span = document.createElement('span');
        span.style.position = "absolute";
        span.id = "s1"+l;
        spanIds.push("s1"+l);
        span.style.zIndex = "150";
        span.style.color = "lightgray";
        span.style.fontSize = "40px";
        span.style.fontWeight = "bold";
        span.style.display = "inline-block";
        span.style.lineHeight = "0px";
        span.style.userDrag = "none";
        span.style.userSelect = "none";
        span.style.pointerEvents = "none";

        span.style.textShadow = "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000";
        span.style.opacity = "0";

        span.appendChild(tx);
        span.style.top = (posArray[l][1]+50)+"px";
        span.style.left = (posArray[l][0]+(iw / 2)) - 150 + "px";
        let ul1 = document.createElement('ul');
        ul1.style.width = liW*row+"px";
        ul1.style.height = liH*col+"px";
        ul1.style.position = "absolute";
        ul1.style.backgroundColor = "black";
        ul1.style.left = px+"px";
        ul1.style.top = py+"px";
        ul1.style.boxShadow = "5px 10px 18px #000";
        ul1.id = "ul1"+l;
        ulIds.push("ul1"+l);

         ulArray = [];
         ulArrayStatic = [];
         boundArray = [];
         positions = [];

      for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
          let li = document.createElement('li');
          li.setAttribute('draggable', "false");
          li.style.position = "absolute";
          li.style.width = liW+"px";
          li.style.height = liH+"px";
          li.style.background = "url("+urls[l]+") "+(((liW*row)-liW)*i)+"px "+(((liH*col)-liH)*j)+"px";

          li.style.transform = "translate3d(" + (liW*i) + "px, " + (liH*j) + "px, 0)";
          positions.push([liW*i, liH*j]);
          li.style.zIndex = 5;
          li.id = "l"+l+((col*i)+j);
          li.className = "liel";
          li.style.userDrag = "none";
          li.style.userSelect = "none";
          ulArrayStatic.push("l"+l+((col*i)+j));
          ulArray.push("l"+l+((col*i)+j));
          ul1.appendChild(li);
        }
        let body = document.getElementById("body");
          body.appendChild(ul1);
          body.appendChild(span);
      }//end of loop

        for(let i=0;i<ulArray.length;i++){
            boundArray.push(document.getElementById(ulArray[i]).getBoundingClientRect());
        }

        boundArrayArray.push(boundArray);
        positionsArray.push(positions);
        ulArrayStaticArray.push(ulArrayStatic);
        ulArrayArray.push(chop(ulArray, positions));
      }

      for(let i=0;i<dimentionOrignalWH.length;i++){
        document.getElementById(ulIds[i]).style.transformOrigin = "top left";
        document.getElementById(ulIds[i]).style.transform = "scale("+scaleFactor[i][0]+","+scaleFactor[i][1]+")";
      }
    }//end populate

    function dragStart(e) {
      for(let i=0;i<ulIds.length;i++){
        if(isDescendant(document.getElementById(ulIds[i]), document.getElementById(e.target.id))){
          puzzelNumber=i;
        }
      }
        if (mousedown) {
            if (!active) {
                if (e.target.nodeName == "LI") {
                    dragItem = document.getElementById(e.target.id);
                    dragItem.style.zIndex = 10;
                    dragItem.style.boxShadow = "5px 10px 18px #000";
                    el1 = dragItem.parentElement.getBoundingClientRect();
                    el2 = dragItem.getBoundingClientRect();
                    dif1x = ((e.clientX + window.pageXOffset) - el2.x);
                    dif2x = el2.width - dif1x;
                    dif1y = ((e.clientY + window.pageYOffset) - el2.y);
                    dif2y = el2.height - dif1y;
                    for (let i = 0; i < ulArrayArray[puzzelNumber].length; i++) {
                        if (check(boundArrayArray[puzzelNumber][i], e.clientX + window.pageXOffset, e.clientY + window.pageYOffset)) {
                            old_index = i;
                            static_old_index = i;
                        }
                    }
                    for (let i = 0; i < ulArrayArray[puzzelNumber].length; i++) {
                        if (ulArrayArray[puzzelNumber][i] != e.target.id) {
                            document.getElementById(ulArrayArray[puzzelNumber][i]).setAttribute('zIndex', 0);
                            document.getElementById(ulArrayArray[puzzelNumber][i]).style.zIndex = 0;
                            document.getElementById(ulArrayArray[puzzelNumber][i]).style.boxShadow = "0px 0px 0px #000";
                        }
                    }
                    if (e.type === "touchstart") {
                        initialX = e.touches[0].clientX + window.pageXOffset;
                        initialY = e.touches[0].clientY + window.pageYOffset;
                    } else {
                        initialX = e.clientX + window.pageXOffset;
                        initialY = e.clientY + window.pageYOffset;
                    }
                    if (e.target === dragItem) {
                        active = true;
                    }
                }
            }
        }
        mousedown = false;
    } //end dragStart

    function dragEnd(e) {
        active = false;
        mousedown = true;
        for (let i = 0; i < ulArrayArray[puzzelNumber].length; i++) {
            setTranslate(positionsArray[puzzelNumber][i][0], positionsArray[puzzelNumber][i][1], document.getElementById(ulArrayArray[puzzelNumber][i]), true);
            document.getElementById(ulArrayArray[puzzelNumber][i]).style.zIndex = 0;
            document.getElementById(ulArrayArray[puzzelNumber][i]).style.boxShadow = "0px 0px 0px #000";
        }
        for (let i = 0; i < ulArrayArray[puzzelNumber].length; i++) {
            if (check(boundArrayArray[puzzelNumber][i], e.clientX + window.pageXOffset, e.clientY + window.pageYOffset)) {
                old_index = i;
                static_old_index = i;
            }
        }
        if (compareArray(ulArrayStaticArray[puzzelNumber], ulArrayArray[puzzelNumber])) {
            document.getElementById(spanIds[puzzelNumber]).style.opacity = "1.0";
        }else{
            document.getElementById(spanIds[puzzelNumber]).style.opacity = "0";
        }
    } //end dragEnd

    function drag(e) {
        if (active) {
            e.preventDefault();
            let mx = e.clientX + window.pageXOffset,
                my = e.clientY + window.pageYOffset;
            let tx, ty;
            if (e.type === "touchmove") {
                tx = (e.touches[0].clientX - initialX) + (positionsArray[puzzelNumber][static_old_index][0] + window.pageXOffset);
                ty = (e.touches[0].clientY - initialY) + (positionsArray[puzzelNumber][static_old_index][1] + window.pageYOffset);
            } else {
                tx = (e.clientX - initialX) + (positionsArray[puzzelNumber][static_old_index][0] + window.pageXOffset);
                ty = (e.clientY - initialY) + (positionsArray[puzzelNumber][static_old_index][1] + window.pageYOffset);
            }

            if ((tx + dif1x) < dif1x) {
                currentX = 0;
                mx = (el1.left + 1);
            } else if ((tx + dif2x) > (el1.width - dif1x)) {
                currentX = el1.width - el2.width;
                mx = (el1.right - 1);
            } else {
                if (e.type === "touchmove") {
                    currentX = tx;
                } else {
                    currentX = tx;
                }
            }

            if ((ty + dif1y) < dif1y) {
                currentY = 0;
                my = (el1.top + 1);
            } else if ((ty + dif2y) > (el1.height - dif1y)) {
                currentY = el1.height - el2.height;
                my = (el1.bottom - 1);
            } else {
                if (e.type === "touchmove") {
                    currentY = ty;
                } else {
                    currentY = ty;
                }
            }
            refit(e, mx, my);
        }
    } //end drag

    function refit(e, mx, my) {
        for (let i = 0; i < ulArrayArray[puzzelNumber].length; i++) {
            if (check(boundArrayArray[puzzelNumber][i], mx, my)) {
                if (i != old_index) {
                    ulArrayArray[puzzelNumber] = swap(ulArrayArray[puzzelNumber], i, old_index);
                    ulArrayTemp = ulArrayArray[puzzelNumber];
                    old_index = i;
                }
            }
        }
        for (let i = 0; i < ulArrayArray[puzzelNumber].length; i++) {
            if (i == old_index) {
                setTranslate(
                    currentX,
                    currentY,
                    document.getElementById(ulArrayArray[puzzelNumber][i]),
                    false
                );
            } else {
                setTranslate(
                    positionsArray[puzzelNumber][i][0],
                    positionsArray[puzzelNumber][i][1],
                    document.getElementById(ulArrayArray[puzzelNumber][i]),
                    true
                );
            }
        }
    } //end refit

    function chop(array, pos) {
        let ret = shuffle(array);
        ulArrayTemp = ret;
        for (let i = 0; i < ret.length; i++) {
            setTranslate(
                pos[i][0],
                pos[i][1],
                document.getElementById(ret[i]),
                false
            );
        }
        return ret;
    } //end chop

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    } //end shuffle


    function setTranslate(xPos, yPos, el, bull) {
      if(bull){
        el.style.transitionDuration = "0.25s";
      }else{
        el.style.transitionDuration = "0s";
      }
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }//end setTranslate


    function check(bb, x, y){
        this.x = bb.x;
        this.width = bb.width;
        this.y = bb.y;
        this.height = bb.height;
        return  this.x <= x && x <= this.x + this.width &&
                this.y <= y && y <= this.y + this.height;
    }//end check

    function swap(array, s1, s2){
      var b = array[s1];
      array[s1] = array[s2];
      array[s2] = b;
      return array;
    }//end swap

    function compareArray(arr1, arr2) {
        let result = true;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                result = false;
            }
        }
        return result;
    } //end compareArray

    function isDescendant(parent, child) {
         var node = child.parentNode;
         while (node != null) {
             if (node == parent) {
                 return true;
             }
             node = node.parentNode;
         }
         return false;
    }//end isDescendant

