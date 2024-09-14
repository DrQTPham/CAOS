function calculate() {
    var inputNumber = document.getElementById("inputNumber").value;

    var number = parseFloat(inputNumber);
    var d = Number.isInteger(number) && number > 0;
    if (isNaN(number) || !d) {
        document.getElementById("result").style.color = "Red";
        if (isNaN(number))
            document.getElementById("result").textContent = "BẠN NHẬP KHÔNG PHẢI LÀ MỘT SỐ";
        else
            document.getElementById("result").textContent = "BẠN PHẢI NHẬP SỐ TỰ NHIÊN";
    } else {
        document.getElementById("result").textContent = addInputFields(number);
    }
}
function addInputFields(count) {
    var container = document.querySelector(".container");
    container.innerHTML = "";
    var h2 = document.createElement("h2");
    h2.innerHTML = "Nhập thông tin các thể tích điều trị: ";
    h2.innerHTML += "<br> (Thể tích: V; Tọa độ: x,y,z)";
    container.appendChild(h2);
    function truc_x(c) {
        var radians = c * Math.PI / 180;
        return [
            [Math.cos(radians), 0, Math.sin(radians)],
            [0, 1, 0],
            [-Math.sin(radians), 0, Math.cos(radians)]
        ];
    }

    function truc_y(t) {
        var radians = t * Math.PI / 180;
        return [
            [Math.cos(radians), 0, Math.sin(radians)],
            [0, 1, 0],
            [-Math.sin(radians), 0, Math.cos(radians)]
        ];
    }

    function truc_z(g) {
        var radians = g * Math.PI / 180;
        return [
            [Math.cos(radians), -Math.sin(radians), 0],
            [Math.sin(radians), Math.cos(radians), 0],
            [0, 0, 1]
        ];
    }
    for (var i = 0; i < count; i++) {
        var inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");

        var inputVolume = document.createElement("input");
        inputVolume.type = "number";
        inputVolume.placeholder = "V_PTV " + (i + 1);
        inputContainer.appendChild(inputVolume);

        var inputAxis = document.createElement("input");
        inputAxis.type = "number";
        inputAxis.placeholder = "x_PTV " + (i + 1);
        inputContainer.appendChild(inputAxis);

        inputAxis = document.createElement("input");
        inputAxis.type = "number";
        inputAxis.placeholder = "y_PTV " + (i + 1);
        inputContainer.appendChild(inputAxis);

        inputAxis = document.createElement("input");
        inputAxis.type = "number";
        inputAxis.placeholder = "z_PTV " + (i + 1);
        inputContainer.appendChild(inputAxis);

        container.appendChild(inputContainer);
    }

    var button = document.createElement("button");
    button.textContent = "Planning Treatment Volume";
    var max1 = -999999;
    var min1 = 99999;
    var max2 = -999999;
    var min2 = 99999;
    var max3 = -999999;
    var min3 = 99999;
    button.onclick = function () {
        var inputContainers = document.querySelectorAll(".input-container");
        inputContainers.forEach(function (container) {
            var inputVolumes = container.querySelectorAll("input[type='number']");
            var inputVolume = inputVolumes[0];
            var V = parseFloat(inputVolume.value);
            var r = ((3 * V) / (4 * Math.PI)) ** (1 / 3);
            var r2, r3, r4;
            if (inputVolumes.length >= 3) {
                var inputVolume2 = inputVolumes[1];
                r2 = parseFloat(inputVolume2.value);
                if (max1 < r2) {
                    max1 = r2;
                };
                if (min1 > r2) {
                    min1 = r2;
                };
                var inputVolume3 = inputVolumes[2];
                r3 = parseFloat(inputVolume3.value);
                if (max2 < r3) {
                    max2 = r3;
                };
                if (min2 > r3) {
                    min2 = r3;
                };
                var inputVolume4 = inputVolumes[3];
                r4 = parseFloat(inputVolume4.value);
                if (max3 < r4) {
                    max3 = r4;
                };
                if (min3 > r4) {
                    min3 = r4;
                };
            }
            var resultDisplay = document.createElement("div");
            resultDisplay.textContent = "Bán kính = " + r.toFixed(2) + " (cm)";
            if (inputVolumes.length >= 3) {
                resultDisplay.textContent += ", Trục x = " + r2.toFixed(2) + " (cm), Trục y = " + r3.toFixed(2) + " (cm), Trục z = " + r4.toFixed(2) + " (cm)";
            }
            container.appendChild(resultDisplay);
        });
        var xiso = 0;
        var yiso = 0;
        var ziso = 0;
        var Display1 = document.createElement("div");
        Display1.classList.add("classIsocenter");
        Display1.textContent = "Tọa độ của ISOCENTER ";
        container.appendChild(Display1);
        var Display = document.createElement("div");
        Display.classList.add("classIsocenter2");
        if ((max1 == min1) != 0) {
            xiso = max1;
        };
        if (max1 > 0 && min1 > 0) {
            xiso = (max1 - min1) / 2 + min1;
        };
        if (max1 < 0 && min1 < 0) {
            xiso = (min1 - max1) / 2 + max1;
        };
        if (min1 <= 0 && max1 >= 0) {
            xiso = (max1 + min1) / 2;
        };

        if ((max2 == min2) != 0) {
            yiso = max2;
        };
        if (max2 > 0 && min2 > 0) {
            yiso = (max2 - min2) / 2 + min2;
        };
        if (max2 < 0 && min2 < 0) {
            yiso = (min2 - max2) / 2 + max2;
        };
        if (min2 <= 0 && max2 >= 0) {
            yiso = (max2 + min2) / 2;
        };

        if ((max3 == min3) != 0) {
            ziso = max3;
        };
        if (max3 > 0 && min3 > 0) {
            ziso = (max3 - min3) / 2 + min3;
        };
        if (max3 < 0 && min3 < 0) {
            ziso = (min3 - max3) / 2 + max3;
        };
        if (min3 <= 0 && max3 >= 0) {
            ziso = (max3 + min3) / 2;
        };
        Display.innerHTML = "Trục x(Isocenter) là: " + xiso.toFixed(2) + " (cm)" + "<br>Trục y(Isocenter) là: " + yiso.toFixed(2) + " (cm)" + "<br>Trục z(Isocenter) là: " + ziso.toFixed(2) + " (cm)";
        container.appendChild(Display);
        var button2 = document.createElement("button");
        button2.textContent = "Optimization of SRS";
        button2.classList.add("twoToneButton");
        button2.onclick = function () {
            //Optima Collimator
        
            function table(t) {
                var a = -99999999999999;
                var n1 = 0;
                for (var c = 0; c < 181; c++) {
                    var s = 0;
                    var R4 = 0;
                    var R5 = 0;
                    var R6 = 0;
                    for (var g = 0; g < 361; g++) {
                        var b2 = [];
                        inputContainers.forEach(function (container2) {
                            var inputVolumes2 = container2.querySelectorAll("input[type='number']");
                            var trucxPTV = inputVolumes2[1];
                            var trucxPTV1 = parseFloat(trucxPTV.value);
                            var trucyPTV = inputVolumes2[2];
                            var trucyPTV1 = parseFloat(trucyPTV.value);
                            var truczPTV = inputVolumes2[3];
                            var truczPTV1 = parseFloat(truczPTV.value);
                            var toadoV = [trucxPTV1, trucyPTV1, truczPTV1];
                            var R1 = math.multiply(truc_z(g), truc_x(c));
                            var R2 = math.multiply(R1, truc_y(t));
                            var R3 = math.multiply(R2, toadoV);
                            var R33 = new Array(R3);

                            var Volume = inputVolumes2[0];
                            var V2 = parseFloat(Volume.value);
                            var bankinhr = ((3 * V2) / (4 * Math.PI)) ** (1 / 3);

                            R4 = R33[0][0] - bankinhr;
                            R5 = R33[0][2] + bankinhr;
                            R6 = R33[0][2] - bankinhr;
                            var R4n = Math.round(R4);
                            var R5n = Math.round(R5);
                            var R6n = Math.round(R6); 
                            for (var k = R6n; k <= R5n; k++) {
                                var temp2 = [];
                                for (var m = 0; m < 2; m++) {
                                    var h = (m === 0) ? R4n : k;
                                    temp2.push(h);
                                }
                                b2.push(temp2);
                            }
                        });
                       
                        var n2 = b2.length;
                        var b3 = [];

                        for (var o = -15; o < 15; o++) {
                            for (var q = -15; q < 15; q++) {
                                b3.push([q, o]);
                                var shouldBreak = false;
                                for (var v = 0; v < n2; v++) {
                                    if (o === b2[v][1] && q >= b2[v][0]) {
                                        shouldBreak = true;
                                        break;
                                    }
                                }
                                if (shouldBreak) {
                                    break;
                                }
                            }
                        }
                      
                        var sodiem = b3;
                        var so = sodiem.length;
                        s += so;
                    }
                    if (s >= a) {
                        a = s;
                        n1 = c;
                    } 
                } 
                return n1;
            }

            var Display2 = document.createElement("div");
            Display2.classList.add("collimator");
            t = 0;
            Display2.innerHTML = 'Góc giường: C = 0 , Góc Gantry: 0 CW 179, Góc Collimator tối ưu: ' + table(0) + '°';
            t = 335;
            Display2.innerHTML += '<br> Góc giường: C = 335 , Góc Gantry: 179 CCW 0, Góc Collimator tối ưu: ' + table(335) + '°';
            t = 310;
            Display2.innerHTML += '<br>Góc giường: C = 310 , Góc Gantry: 0 CW 179, Góc Collimator tối ưu: ' + table(310) + '°';
            t = 285;
            Display2.innerHTML += '<br>Góc giường: C = 285 , Góc Gantry: 179 CCW 0, Góc Collimator tối ưu: ' + table(285) + '°';
            t = 0;
            Display2.innerHTML += '<br>Góc giường: C = 0 , Góc Gantry: 0 CCW 181, Góc Collimator tối ưu: ' + table(0) + '°';
            t = 25;
            Display2.innerHTML += '<br>Góc giường: C = 25 , Góc Gantry: 181 CW 0, Góc Collimator tối ưu: ' + table(25) + '°';
            t = 50;
            Display2.innerHTML += '<br>Góc giường: C = 50 , Góc Gantry: 0 CCW 181, Góc Collimator tối ưu: ' + table(50) + '°';
            t = 75;
            Display2.innerHTML += '<br>Góc giường: C = 75 , Góc Gantry: 181 CW 0, Góc Collimator tối ưu: ' + table(75) + '°';
            container.appendChild(Display2);
        };
        container.appendChild(button2);
    };
    container.appendChild(button);
};



document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;

    body.style.backgroundColor = "lightblue";
});

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
    if (event.keyCode == 123) {
        event.preventDefault();
    }
});
document.addEventListener('contextmenu', event => event.preventDefault());

  