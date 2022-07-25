/* Author Yücel Sabah
 * GNU GPLv3 Licence
*/

import * as THREE from 'three';
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "/node_modules/three/examples/jsm/loaders/GLTFLoader.js";

var isLicenseCorrect = false;

$("#license-button").on("click", function() {
    let userInput = String($("#license-input").val());
    if (encryption(userInput) === 589) {
        isLicenseCorrect = true;
    } else {
        isLicenseCorrect = false;
        window.alert("Yanlış Lisans Anahtarı Girdiniz!");
    }
    if (isLicenseCorrect === true) {
        $("#license-panel").attr("style", "display: none !important;");
        $("#main-div").attr("style", "display: block !important;");
    

        $("#erkek-button").on("click", function() {
            $("#gender-selection-div").css("display", "none");
            $("#content-div").addClass("select-erkek");
        })

        $("#e-back-to-gender-selection-button").on("click", function() {
            $("#content-div").removeClass("select-erkek");
            $("#gender-selection-div").css("display", "initial");
        })

        $("#kadın-button").on("click", function() {
            $("#gender-selection-div").css("display", "none");
            $("#content-div").addClass("select-kadın");
        })

        $("#k-back-to-gender-selection-button").on("click", function() {
            $("#content-div").removeClass("select-kadın");
            $("#gender-selection-div").css("display", "initial");
        })

        var sizeTableActive = 0;

        var RegularTshirtSizes = { // constant values...
            s: [52, 70, "Marka A T-Shirt Regular - S"], // [en, boy]
            m: [54, 70, "Marka A T-Shirt Regular - M"],
            l: [56, 72, "Marka A T-Shirt Regular - L"],
            xl: [58, 72, "Marka A T-Shirt Regular - XL"],
            xxl: [60, 74, "Marka A T-Shirt Regular - XXL"],
            en: [60, 58, 56, 54, 52],
            boy: [74, 72, 70],
            metaS: ["Marka A", "T-Shirt", "Regular", "S"],
            metaM: ["Marka A", "T-Shirt", "Regular", "M"],
            metaL: ["Marka A", "T-Shirt", "Regular", "L"],
            metaXL: ["Marka A", "T-Shirt", "Regular", "XL"],
            metaXXL: ["Marka A", "T-Shirt", "Regular", "XXL"]
        };

        var findSuitableWidth = {
            gogus: 0,
            bel: 0,
            basen: 0,
            passGogus: false,
            passBel: false,
            passBasen: false,
            allPass: false
        }

        var productDefaultData = {
            marka: $("#2d-marka-p").text(),
            kiyafet: $("#2d-kıyafet-p").text(),
            beden: $("#2d-beden-p").text(),
            tur: $("#2d-tur-p").text()
        };

        var selectedProduct = {
            marka: "",
            kiyafet: "",
            bedenLetter: "",
            bedenNumber: "",
            checkActiveSizeTable: -1,
            tur: ""
        };

        var user2dDefaultText = {
            boy: $("#2d-boy-p").text(),
            gogus: $("#2d-gogus-p").text(),
            bel: $("#2d-bel-p").text(),
            basen: $("#2d-basen-p").text(),
            ic_boy: $("#2d-bacak-p").text()
        }

        var userErkek = {
            boy: 0,
            gogus: 0,
            bel: 0,
            basen: 0,
            ic_boy: 0
        };

        $("#statistics-button").prop("disabled", true);
        $("#e-calculate-button").prop("disabled", true);
        $("#k-calculate-button").prop("disabled", true);

        var markaStatButtonControl = 0;
        var kıyafetStatButtonControl = 0;
        var bedenLetterStatButtonControl = 0;
        var bedenNumberStatButtonControl = 0;
        var turStatButtonControl = 0;
        var isStatButtonActive = false;

        var modelBoyCalcButtonControl = 0;
        var modelGogusCalcButtonControl = 0;
        var modelBelCalcButtonControl = 0;
        var modelBasenCalcButtonControl = 0;
        var modelIcBoyCalcButtonControl = 0;
        var isUserInput = false;

        $("#e-marka-select").on("change", function() {
            let selectedOptionText = $("#e-marka-select option:selected").text();

            if (selectedOptionText != "" && selectedOptionText != "Marka Seçiniz") {
                markaStatButtonControl = 1;
            } else {
                markaStatButtonControl = 0;
            }

            if (markaStatButtonControl === 1 && kıyafetStatButtonControl === 1 && turStatButtonControl === 1) {
                if (bedenLetterStatButtonControl === 1 || bedenNumberStatButtonControl === 1) {
                    if (isUserInput === true) {
                        $("#statistics-button").prop("disabled", false);
                        isStatButtonActive = true;
                    } else {
                        $("#statistics-button").prop("disabled", true);
                        isStatButtonActive = false;
                    }
                } else {
                    $("#statistics-button").prop("disabled", true);
                    isStatButtonActive = false;
                }
            } else {
                $("#statistics-button").prop("disabled", true);
                isStatButtonActive = false;
            }

            if (isUserInput === true && isStatButtonActive === true && findSuitableWidth.allPass === true) {
                $("#e-calculate-button").prop("disabled", false);
                $("#k-calculate-button").prop("disabled", false);
            } else {
                $("#e-calculate-button").prop("disabled", true);
                $("#k-calculate-button").prop("disabled", true);
            }
        })

        $("#e-kiyafet-select").on("change", function() {
            let selectedOptionText = $("#e-kiyafet-select option:selected").text();

            if (selectedOptionText != "" && selectedOptionText != "Kıyafet Seçiniz") {
                kıyafetStatButtonControl = 1;
            } else {
                kıyafetStatButtonControl = 0;
            }

            if (markaStatButtonControl === 1 && kıyafetStatButtonControl === 1 && turStatButtonControl === 1) {
                if (bedenLetterStatButtonControl === 1 || bedenNumberStatButtonControl === 1) {
                    if (isUserInput === true) {
                        $("#statistics-button").prop("disabled", false);
                        isStatButtonActive = true;
                    } else {
                        $("#statistics-button").prop("disabled", true);
                        isStatButtonActive = false;
                    }
                } else {
                    $("#statistics-button").prop("disabled", true);
                    isStatButtonActive = false;
                }
            } else {
                $("#statistics-button").prop("disabled", true);
                isStatButtonActive = false;
            }

            if (isUserInput === true && isStatButtonActive === true && findSuitableWidth.allPass === true) {
                $("#e-calculate-button").prop("disabled", false);
                $("#k-calculate-button").prop("disabled", false);
            } else {
                $("#e-calculate-button").prop("disabled", true);
                $("#k-calculate-button").prop("disabled", true);
            }
        })

        $("#e-letter-size-select").on("change", function() {
            let selectedOptionText = $("#e-letter-size-select option:selected").text();

            if (selectedOptionText != "" && selectedOptionText != "Beden Seçiniz") {
                bedenLetterStatButtonControl = 1;
            } else {
                bedenLetterStatButtonControl = 0;
            }

            if (markaStatButtonControl === 1 && kıyafetStatButtonControl === 1 && turStatButtonControl === 1) {
                if (bedenLetterStatButtonControl === 1 || bedenNumberStatButtonControl === 1) {
                    if (isUserInput === true) {
                        $("#statistics-button").prop("disabled", false);
                        isStatButtonActive = true;
                    } else {
                        $("#statistics-button").prop("disabled", true);
                        isStatButtonActive = false;
                    }
                } else {
                    $("#statistics-button").prop("disabled", true);
                    isStatButtonActive = false;
                }
            } else {
                $("#statistics-button").prop("disabled", true);
                isStatButtonActive = false;
            }

            if (isUserInput === true && isStatButtonActive === true && findSuitableWidth.allPass === true) {
                $("#e-calculate-button").prop("disabled", false);
                $("#k-calculate-button").prop("disabled", false);
            } else {
                $("#e-calculate-button").prop("disabled", true);
                $("#k-calculate-button").prop("disabled", true);
            }
        })

        $("#e-number-size-select").on("change", function() {
            let selectedOptionText = $("#e-number-size-select option:selected").text();

            if (selectedOptionText != "" && selectedOptionText != "Beden Seçiniz") {
                bedenNumberStatButtonControl = 1;
            } else {
                bedenNumberStatButtonControl = 0;
            }

            if (markaStatButtonControl === 1 && kıyafetStatButtonControl === 1 && turStatButtonControl === 1) {
                if (bedenLetterStatButtonControl === 1 || bedenNumberStatButtonControl === 1) {
                    if (isUserInput === true) {
                        $("#statistics-button").prop("disabled", false);
                        isStatButtonActive = true;
                    } else {
                        $("#statistics-button").prop("disabled", true);
                        isStatButtonActive = false;
                    }
                } else {
                    $("#statistics-button").prop("disabled", true);
                    isStatButtonActive = false;
                }
            } else {
                $("#statistics-button").prop("disabled", true);
                isStatButtonActive = false;
            }

            if (isUserInput === true && isStatButtonActive === true && findSuitableWidth.allPass === true) {
                $("#e-calculate-button").prop("disabled", false);
                $("#k-calculate-button").prop("disabled", false);
            } else {
                $("#e-calculate-button").prop("disabled", true);
                $("#k-calculate-button").prop("disabled", true);
            }
        })

        $("#e-kiyafet-tur-select").on("change", function() {
            let selectedOptionText = $("#e-kiyafet-tur-select option:selected").text();

            if (selectedOptionText != "" && selectedOptionText != "Tür Seçiniz") {
                turStatButtonControl = 1;
            } else {
                turStatButtonControl = 0;
            }

            if (markaStatButtonControl === 1 && kıyafetStatButtonControl === 1 && turStatButtonControl === 1) {
                if (bedenLetterStatButtonControl === 1 || bedenNumberStatButtonControl === 1) {
                    if (isUserInput === true) {
                        $("#statistics-button").prop("disabled", false);
                        isStatButtonActive = true;
                    } else {
                        $("#statistics-button").prop("disabled", true);
                        isStatButtonActive = false;
                    }
                } else {
                    $("#statistics-button").prop("disabled", true);
                    isStatButtonActive = false;
                }
            } else {
                $("#statistics-button").prop("disabled", true);
                isStatButtonActive = false;
            }

            if (isUserInput === true && isStatButtonActive === true && findSuitableWidth.allPass === true) {
                $("#e-calculate-button").prop("disabled", false);
                $("#k-calculate-button").prop("disabled", false);
            } else {
                $("#e-calculate-button").prop("disabled", true);
                $("#k-calculate-button").prop("disabled", true);
            }
        })

        $("#e-marka-select").click(function() {
            $("#e-marka-select").click(function() {
                selectedProduct.marka = $("#e-marka-select option:selected").text();
            })
        })

        $("#e-kiyafet-select").click(function() {
            $("#e-kiyafet-select").click(function() { // second click
            let kiyafetValue = $("#e-kiyafet-select option:selected").val();

            selectedProduct.kiyafet = $("#e-kiyafet-select option:selected").text();

            $(this).data("clicked", true);
            if ($("#e-kiyafet-select").data("clicked")) {
                if(kiyafetValue === "e-tshirt" || kiyafetValue === "e-gomlek" || kiyafetValue === "e-triko") {
                    $("#number-size-table").css("display", "none");
                    $("#letter-size-table").css("display", "inherit");
                    sizeTableActive = 1;
                } else {
                    $("#letter-size-table").css("display", "none");
                    $("#number-size-table").css("display", "inherit");
                    sizeTableActive = 1;
                }
            }
        })
        })

        $("#e-kiyafet-tur-select").click(function() {
            $("#e-kiyafet-tur-select").click(function() {
                selectedProduct.tur = $("#e-kiyafet-tur-select option:selected").text();
            })
        })

        $("#e-letter-size-select").click(function() {
            $("#e-letter-size-select").click(function() {
                selectedProduct.bedenLetter = $("#letter-size-table option:selected").text();
                selectedProduct.checkActiveSizeTable = 0;
            })
        })

        $("#e-number-size-select").click(function() {
            $("#e-number-size-select").click(function() {
                selectedProduct.bedenNumber = $("#number-size-table option:selected").text();
                selectedProduct.checkActiveSizeTable = 1;
            })
        })


        $("#e-model-height").on("keyup", function() {
            userErkek.boy = $(this).val();

            if ($(this).val() !== "" && $(this).val() > 0) { // if you want to block user to input less than a value, change here...
                modelBoyCalcButtonControl = 1;
            } else {
                modelBoyCalcButtonControl = 0;
            }

            if (modelBoyCalcButtonControl === 1 && modelBelCalcButtonControl === 1 && modelGogusCalcButtonControl === 1 && modelBasenCalcButtonControl === 1 && modelIcBoyCalcButtonControl === 1) {
                isUserInput = true;
            } else {
                isUserInput = false;
            }

            if (markaStatButtonControl === 1 && kıyafetStatButtonControl === 1) {
                if (bedenLetterStatButtonControl === 1 || bedenNumberStatButtonControl === 1) {
                    if (isUserInput === true) {
                        $("#statistics-button").prop("disabled", false);
                        isStatButtonActive = true;
                    } else {
                        $("#statistics-button").prop("disabled", true);
                        isStatButtonActive = false;
                    }
                } else {
                    $("#statistics-button").prop("disabled", true);
                    isStatButtonActive = false;
                }
            } else {
                $("#statistics-button").prop("disabled", true);
                isStatButtonActive = false;
            }

            if (isUserInput === true && isStatButtonActive === true && findSuitableWidth.allPass === true) {
                $("#e-calculate-button").prop("disabled", false);
                $("#k-calculate-button").prop("disabled", false);
            } else {
                $("#e-calculate-button").prop("disabled", true);
                $("#k-calculate-button").prop("disabled", true);
            }
        })

        $("#e-model-gogus").on("keyup", function() {
            userErkek.gogus = $(this).val();

            if ($(this).val() !== "" && $(this).val() > 0) { // if you want to block user to input less than a value, change here...
                modelGogusCalcButtonControl = 1;
            } else {
                modelGogusCalcButtonControl = 0;
            }

            if (modelBoyCalcButtonControl === 1 && modelBelCalcButtonControl === 1 && modelGogusCalcButtonControl === 1 && modelBasenCalcButtonControl === 1 && modelIcBoyCalcButtonControl === 1) {
                isUserInput = true;
            } else {
                isUserInput = false;
            }

            if (markaStatButtonControl === 1 && kıyafetStatButtonControl === 1) {
                if (bedenLetterStatButtonControl === 1 || bedenNumberStatButtonControl === 1) {
                    if (isUserInput === true) {
                        $("#statistics-button").prop("disabled", false);
                        isStatButtonActive = true;
                    } else {
                        $("#statistics-button").prop("disabled", true);
                        isStatButtonActive = false;
                    }
                } else {
                    $("#statistics-button").prop("disabled", true);
                    isStatButtonActive = false;
                }
            } else {
                $("#statistics-button").prop("disabled", true);
                isStatButtonActive = false;
            }

            calcRegularTShirtGogus();
            if (userErkek.gogus <= findSuitableWidth.gogus) {
                findSuitableWidth.passGogus = true;
            } else {
                findSuitableWidth.passGogus = false;
            }
            if (findSuitableWidth.passGogus === true && findSuitableWidth.passBel === true && findSuitableWidth.passBasen === true) {
                findSuitableWidth.allPass = true;
            } else {
                findSuitableWidth.allPass = false;
            }

            if (isUserInput === true && isStatButtonActive === true && findSuitableWidth.allPass === true) {
                $("#e-calculate-button").prop("disabled", false);
                $("#k-calculate-button").prop("disabled", false);
            } else {
                $("#e-calculate-button").prop("disabled", true);
                $("#k-calculate-button").prop("disabled", true);
            }
        })

        $("#e-model-bel").on("keyup", function() {
            userErkek.bel = $(this).val();

            if ($(this).val() !== "" && $(this).val() > 0) { // if you want to block user to input less than a value, change here...
                modelBelCalcButtonControl = 1;
            } else {
                modelBelCalcButtonControl = 0;
            }

            if (modelBoyCalcButtonControl === 1 && modelBelCalcButtonControl === 1 && modelGogusCalcButtonControl === 1 && modelBasenCalcButtonControl === 1 && modelIcBoyCalcButtonControl === 1) {
                isUserInput = true;
            } else {
                isUserInput = false;
            }

            if (markaStatButtonControl === 1 && kıyafetStatButtonControl === 1) {
                if (bedenLetterStatButtonControl === 1 || bedenNumberStatButtonControl === 1) {
                    if (isUserInput === true) {
                        $("#statistics-button").prop("disabled", false);
                        isStatButtonActive = true;
                    } else {
                        $("#statistics-button").prop("disabled", true);
                        isStatButtonActive = false;
                    }
                } else {
                    $("#statistics-button").prop("disabled", true);
                    isStatButtonActive = false;
                }
            } else {
                $("#statistics-button").prop("disabled", true);
                isStatButtonActive = false;
            }

            calcRegularTShirt(userErkek.bel);
            if (findSuitableWidth.bel <= 54) {
                findSuitableWidth.passBel = true;
            } else {
                findSuitableWidth.passBel = false;
            }
            if (findSuitableWidth.passGogus === true && findSuitableWidth.passBel === true && findSuitableWidth.passBasen === true) {
                findSuitableWidth.allPass = true;
            } else {
                findSuitableWidth.allPass = false;
            }

            if (isUserInput === true && isStatButtonActive === true && findSuitableWidth.allPass === true) {
                $("#e-calculate-button").prop("disabled", false);
                $("#k-calculate-button").prop("disabled", false);
            } else {
                $("#e-calculate-button").prop("disabled", true);
                $("#k-calculate-button").prop("disabled", true);
            }
        })

        $("#e-model-basen").on("keyup", function() {
            userErkek.basen = $(this).val();

            if ($(this).val() !== "" && $(this).val() > 0) { // if you want to block user to input less than a value, change here...
                modelBasenCalcButtonControl = 1;
            } else {
                modelBasenCalcButtonControl = 0;
            }

            if (modelBoyCalcButtonControl === 1 && modelBelCalcButtonControl === 1 && modelGogusCalcButtonControl === 1 && modelBasenCalcButtonControl === 1 && modelIcBoyCalcButtonControl === 1) {
                isUserInput = true;
            } else {
                isUserInput = false;
            }

            if (markaStatButtonControl === 1 && kıyafetStatButtonControl === 1) {
                if (bedenLetterStatButtonControl === 1 || bedenNumberStatButtonControl === 1) {
                    if (isUserInput === true) {
                        $("#statistics-button").prop("disabled", false);
                        isStatButtonActive = true;
                    } else {
                        $("#statistics-button").prop("disabled", true);
                        isStatButtonActive = false;
                    }
                } else {
                    $("#statistics-button").prop("disabled", true);
                    isStatButtonActive = false;
                }
            } else {
                $("#statistics-button").prop("disabled", true);
                isStatButtonActive = false;
            }

            calcRegularTShirtBasen(userErkek.basen);
            if (findSuitableWidth.basen <= 54) {
                findSuitableWidth.passBasen = true;
            } else {
                findSuitableWidth.passBasen = false;
            }
            if (findSuitableWidth.passGogus === true && findSuitableWidth.passBel === true && findSuitableWidth.passBasen === true) {
                findSuitableWidth.allPass = true;
            } else {
                findSuitableWidth.allPass = false;
            }

            if (isUserInput === true && isStatButtonActive === true && findSuitableWidth.allPass === true) {
                $("#e-calculate-button").prop("disabled", false);
                $("#k-calculate-button").prop("disabled", false);
            } else {
                $("#e-calculate-button").prop("disabled", true);
                $("#k-calculate-button").prop("disabled", true);
            }
        })

        $("#e-model-icboy").on("keyup", function() {
            userErkek.ic_boy = $(this).val();

            if ($(this).val() !== "" && $(this).val() > 0) { // if you want to block user to input less than a value, change here...
                modelIcBoyCalcButtonControl = 1;
            } else {
                modelIcBoyCalcButtonControl = 0;
            }

            if (modelBoyCalcButtonControl === 1 && modelBelCalcButtonControl === 1 && modelGogusCalcButtonControl === 1 && modelBasenCalcButtonControl === 1 && modelIcBoyCalcButtonControl === 1) {
                isUserInput = true;
            } else {
                isUserInput = false;
            }

            if (markaStatButtonControl === 1 && kıyafetStatButtonControl === 1) {
                if (bedenLetterStatButtonControl === 1 || bedenNumberStatButtonControl === 1) {
                    if (isUserInput === true) {
                        $("#statistics-button").prop("disabled", false);
                        isStatButtonActive = true;
                    } else {
                        $("#statistics-button").prop("disabled", true);
                        isStatButtonActive = false;
                    }
                } else {
                    $("#statistics-button").prop("disabled", true);
                    isStatButtonActive = false;
                }
            } else {
                $("#statistics-button").prop("disabled", true);
                isStatButtonActive = false;
            }

            if (isUserInput === true && isStatButtonActive === true && findSuitableWidth.allPass === true) {
                $("#e-calculate-button").prop("disabled", false);
                $("#k-calculate-button").prop("disabled", false);
            } else {
                $("#e-calculate-button").prop("disabled", true);
                $("#k-calculate-button").prop("disabled", true);
            }
        })

        $("#wardrobe-button").click(function() {
            $("#main-div").css("display", "none");
            $("#wardrobe-gender-selection-div").css("display", "block");
        })

        $("#wardrobe-erkek-button").click(function() {
            $("#wardrobe-gender-selection-div").css("display", "none");
            $("#main-wardrobe-div").css("display", "block");
        })

        $("#wardrobe-kadın-button").click(function() {
            $("#wardrobe-gender-selection-div").css("display", "none");
            $("#main-wardrobe-div").css("display", "block");
        })

        $("#back-to-main-div").click(function() {
            $("#main-wardrobe-div").css("display", "none");
            $("#main-div").css("display", "block");
        })

        // Wardrobe Top Menu Tab Selection

        function changeTab(clickedTab) {
            let selectedTabArray = [];
            let checkpointIndexes = [];
            let keyword;

            let buttonGetId;
            let divGetId;

            let activeSelectedTabArray = [];
            let activeCheckpointIndexes = [];
            let activeKeyword;
            let activeButtonId;

            if ($("#wardrobe-top-menu").find("button").hasClass("tab-selected") == true) {
                buttonGetId = ("#" + $(".tab-selected").attr("id"));

                for (let i = 0; i < buttonGetId.length; i++) {
                    selectedTabArray.push(buttonGetId[i]);
                }
                
                for (let i= 0; i < selectedTabArray.length; i++) {
                    if (selectedTabArray[i] === "-") {
                        checkpointIndexes.push(selectedTabArray.indexOf(selectedTabArray[i]));
                        selectedTabArray.splice(i, 1);
                    } else if (selectedTabArray[i] === "-") {
                        checkpointIndexes.push(selectedTabArray.indexOf(selectedTabArray[i]));
                    }
                }

                keyword = selectedTabArray.slice(checkpointIndexes[0], checkpointIndexes[1]).join("");
                
                $(buttonGetId).removeClass("tab-selected");
                $(clickedTab).addClass("tab-selected");
            }
            
            if ($("#wardrobe-content-div").find("div").hasClass("active-tab") == true) {
                divGetId = ("#" + $(".active-tab").attr("id"));
                $(divGetId).css("display", "none");

                activeButtonId = $(clickedTab).attr("id");

                for (let i = 0; i < activeButtonId.length; i++) {
                    activeSelectedTabArray.push(activeButtonId[i]);
                }

                for (let i= 0; i < activeSelectedTabArray.length; i++) {
                    if (activeSelectedTabArray[i] === "-") {
                        activeCheckpointIndexes.push(activeSelectedTabArray.indexOf(activeSelectedTabArray[i]));
                        activeSelectedTabArray.splice(i, 1);
                    } else if (activeSelectedTabArray[i] === "-") {
                        activeCheckpointIndexes.push(activeSelectedTabArray.indexOf(activeSelectedTabArray[i]));
                    }
                }

                activeKeyword = activeSelectedTabArray.slice(activeCheckpointIndexes[0], activeCheckpointIndexes[1]).join("");

                $(divGetId).removeClass("active-tab");
                $("#wardrobe-"+ activeKeyword + "-content-div").addClass("active-tab");

                $("#wardrobe-"+ activeKeyword + "-content-div").css("display", "flex");

                $("#wardrobe-"+ keyword +"-button").attr("style", "background-color: initial !important; color: initial !important;");
                $(clickedTab).attr("style", "background-color: #2f4858 !important; color: white !important;")
            }
        }

        $("#wardrobe-tShirt-button").click(function() {
            changeTab(this);
        })

        $("#wardrobe-gomlek-button").click(function() {
            changeTab(this);
        })

        $("#wardrobe-triko-button").click(function() {
            changeTab(this);
        })

        $("#wardrobe-pantolon-button").click(function() {
            changeTab(this);
        })

        $("#wardrobe-kot-button").click(function() {
            changeTab(this);
        })

        $("#wardrobe-hepsi-button").click(function() {
            changeTab(this);
        })

        // M Size T-Shirt - START

        function calcRegularTShirtGogus() {
            const clothWidth = 54;
            let calcClothWidth = clothWidth * 2;
            findSuitableWidth.gogus = calcClothWidth;
        }

        function calcRegularTShirt(belCircumferance) {
            const circumferance = 87; // cm
            const clothWidth = 54; // cm

            let calcClothWidth = (belCircumferance  * clothWidth) / circumferance;
            findSuitableWidth.bel = calcClothWidth;
            
            let upperValue;
            let lowerValue;
            let differenceUpper;
            let differenceLower;
            for (let i = 0; i < RegularTshirtSizes.en.length; i++) {
                if (calcClothWidth < RegularTshirtSizes.en[i] && calcClothWidth > RegularTshirtSizes.en[i+1]) {
                    upperValue = RegularTshirtSizes.en[i];
                    lowerValue = RegularTshirtSizes.en[i+1];
                }
            }

            differenceUpper = upperValue - calcClothWidth;
            differenceLower = -1 * (lowerValue - calcClothWidth);

            if (differenceUpper > differenceLower) {
                for (let x in RegularTshirtSizes) {
                    if (RegularTshirtSizes[x][0] === lowerValue) {
                        return RegularTshirtSizes[x][2];
                    }
                }
            } else if (differenceUpper === differenceLower) {
                for (let x in RegularTshirtSizes) {
                    if (RegularTshirtSizes[x][0] === lowerValue) {
                        return RegularTshirtSizes[x][2];
                    }
                }
            } else if (differenceUpper < differenceLower) {
                for (let x in RegularTshirtSizes) {
                    if (RegularTshirtSizes[x][0] === upperValue) {
                        return RegularTshirtSizes[x][2];
                    }
                }
            } 
            
            if (calcClothWidth >= RegularTshirtSizes.s[0] && (upperValue === undefined || lowerValue === undefined)) {
                for (let x in RegularTshirtSizes) {
                    if (RegularTshirtSizes[x][0] === calcClothWidth) {
                        return RegularTshirtSizes[x][2];
                    }
                }
            } 
            
            if (calcClothWidth >= RegularTshirtSizes.xxl[0]) {
                return RegularTshirtSizes.xxl[2];
            } else if (calcClothWidth <= RegularTshirtSizes.s[0]) {
                return RegularTshirtSizes.s[2];
            }
        }

        function calcRegularTShirtBasen(basenCircumferance) {
            const circumferance = 91;
            const clothWidth = 54;
            let calcClothWidth = (basenCircumferance * clothWidth) / circumferance;
            findSuitableWidth.basen = calcClothWidth;
        }

        // M Size Tshirt - END

        $("#statistics-button").click(function() {
            $("#main-div").css("display", "none");
            $("#main-2d-div").css("display", "block");

            $("#2d-boy-p").text($("#2d-boy-p").text() + userErkek.boy);
            $("#2d-gogus-p").text($("#2d-gogus-p").text() + userErkek.gogus);
            $("#2d-bel-p").text($("#2d-bel-p").text() + userErkek.bel);
            $("#2d-basen-p").text($("#2d-basen-p").text() + userErkek.basen);
            $("#2d-bacak-p").text($("#2d-bacak-p").text() + userErkek.ic_boy);

            $("#2d-marka-p").text($("#2d-marka-p").text() + selectedProduct.marka);
            $("#2d-kıyafet-p").text($("#2d-kıyafet-p").text() + selectedProduct.kiyafet);
            $("#2d-tur-p").text($("#2d-tur-p").text() + selectedProduct.tur);

            $("#2d-recommend-p-result").text(calcRegularTShirt(userErkek.bel));

            if (selectedProduct.checkActiveSizeTable === 0) {
                $("#2d-beden-p").text($("#2d-beden-p").text() + selectedProduct.bedenLetter);
            } else if (selectedProduct.checkActiveSizeTable === 1) {
                $("#2d-beden-p").text($("#2d-beden-p").text() + selectedProduct.bedenNumber);
            }
        })

        $("#2d-back-to-main-button").click(function() {
            $("#main-2d-div").css("display", "none");
            $("#main-div").css("display", "block");

            $("#2d-marka-p").text(productDefaultData.marka);
            $("#2d-kıyafet-p").text(productDefaultData.kiyafet);
            $("#2d-beden-p").text(productDefaultData.beden);
            $("#2d-tur-p").text(productDefaultData.tur);

            $("#2d-boy-p").text(user2dDefaultText.boy);
            $("#2d-gogus-p").text(user2dDefaultText.gogus);
            $("#2d-bel-p").text(user2dDefaultText.bel);
            $("#2d-basen-p").text(user2dDefaultText.basen);
            $("#2d-bacak-p").text(user2dDefaultText.ic_boy);

            $("#e-marka-select").val("").change();
            $("#e-kiyafet-select").val("").change();
            $("#e-kiyafet-tur-select").val("").change();
            $("#e-letter-size-select").val("").change();
            $("#number-size-select").val("").change();
        })

        ///

        ////////////////////////////////////////////////////////////////////

        var check = [];

        var threeUnit = 100;

        var calcErkek = {
            boy: 0,
            gogus: 0,
            bel: 0,
            basen: 0,
            ic_boy: 0
        };

        function scaleYToThree(model) {
            /* For Synchronizing to Exported Model's Rx and Ry Values to Three.js */
            const scaleYConstant = 1.025;
            model.scene.scale.setY(scaleYConstant);
        }

        function scaleTrousersToThree(model) {
            const scaleTrousersConstant = 1.1;
            model.scene.scale.setX(scaleTrousersConstant);
        }

        function clothPositionToThree(model) {
            model.scene.rotateX(-1 * (Math.PI / 2));
            model.scene.rotateZ(-1 * (Math.PI / 2));

            let gap = userErkek.boy - 150;
            let a = (gap * 1) / 10;

            model.scene.position.setY((calcErkek.boy / 150) * (2.15 * a)); // normally model.scene.position.setY((calcErkek.boy / 150) * (3 * a));
        }

        function drawModel3D() {
            var canvasWidth = $("#3d-div").width();
            var canvasHeight = $("#3d-div").height();

            // Fundamentals
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(50, canvasWidth / canvasHeight, 0.1, 2000);
            var renderer = new THREE.WebGLRenderer({antialias: true});
            camera.position.z = 5;
            renderer.setClearColor("#ffffff");
            renderer.setSize(canvasWidth, canvasHeight);

            document.body.appendChild(renderer.domElement);
            ///

            // Axes Helper (OPTIONAL)
            //var axesHelper = new THREE.AxesHelper(5);
            //scene.add(axesHelper);
            ///

            // 360 degree user camera control with OrbitControls
            var controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener("change", renderer);
            ///

            // Responsive renderer and camera
            window.addEventListener("resize", () => {
                renderer.setSize(canvasWidth, canvasHeight);
                camera.aspect = canvasWidth / canvasHeight;
                camera.updateProjectionMatrix();
            })
            ///

            // Light
            var ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
            scene.add(ambientLight);
            
            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(0, 5, 0);
            scene.add(directionalLight);
            
            var light1 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
            light1.position.set(0, 0, -5);
            scene.add(light1);
            
            var light2 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
            light2.position.set(5, 0, 0);
            scene.add(light2);
            
            var light3 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
            light3.position.set(-5, 0, 0);
            scene.add(light3);
            
            var light4 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
            light4.position.set(0, 0, 5);
            scene.add(light4);
            
            var light5 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
            light5.position.set(0, -5, 0);
            scene.add(light5);
            ///

            // Load 3D Model with GLTF Loader
            var loader = new GLTFLoader();

            // Cloth

            function drawClothModel() {
                
                loader.load("http://127.0.0.1:5500/3D%20Models/Cloth%20Models/M_DirtyWhiteRoughness.glb", function(gltf) {
                    // ACTUAL POSITION AND SCALE SECTION !!!
                    clothPositionToThree(gltf);
                    scaleYToThree(gltf);
                    

                    // Presentation Section Start
                
                    //clothPositionToThree(gltf);
                    //scaleYToThree(gltf);
                    //gltf.scene.scale.setX(1.3);
                
                    // Presentation Section End
            
                    scene.add(gltf.scene);
            
                    let tShirtModelAnimate = function() {
                        renderer.render(scene, camera);
                        requestAnimationFrame(tShirtModelAnimate);
                    }
            
                    tShirtModelAnimate();
                })
                
                
                /*
                loader.load("http://127.0.0.1:5500/3D%20Models/Cloth%20Models/42.glb", function(gltf) {
                    //clothPositionToThree(gltf);
                    //scaleTrousersToThree(gltf);

                    gltf.scene.rotateX(-1 * (Math.PI / 2));
                    gltf.scene.rotateZ(-1 * (Math.PI / 2));

                    gltf.scene.scale.setX(1.005);
                    gltf.scene.scale.setY(1);

                    gltf.scene.position.setY(0.17);
            
                    scene.add(gltf.scene);
            
                    let tShirtModelAnimate = function() {
                        renderer.render(scene, camera);
                        requestAnimationFrame(tShirtModelAnimate);
                    }
            
                    tShirtModelAnimate();
                })
                */
                
            }
            
            ////
            
            loader.load("http://127.0.0.1:5500/3D%20Models/Human%20Models/Model_FovaneEditDecimated.glb", function(gltf) {

                // Vertex Manipulation
                for (let i = 0; i < gltf.scene.children.length; i++) {
                    gltf.scene.children[i].updateMatrixWorld();
                }

                var maleModel = gltf.scene.children[0].children[0];
                var maleModelPosition = maleModel.geometry.attributes.position;
                var maleModelVector = new THREE.Vector3();
                
                for (let i = 0; i < maleModelPosition.count; i++) {
                    maleModelVector.fromBufferAttribute(maleModelPosition, i).applyMatrix4(maleModel.matrixWorld);
                }

                var gogusVertexIndex = [];

                var belVertexIndex = [];

                var basenVertexIndex = [];

                var icBoyVertexIndex = [];

                var dizVertexIndex = [];

                eModelGogusAllVertices.forEach(function(element) {
                    for (let i = 0; i < maleModelPosition.count; i++) {
                        if (maleModelVector.fromBufferAttribute(maleModelPosition, i).x == element[0] && maleModelVector.fromBufferAttribute(maleModelPosition, i).y == element[1] && maleModelVector.fromBufferAttribute(maleModelPosition, i).z == element[2]) {
                            gogusVertexIndex.push([i]);
                        }
                    }
                })

                eModelBelAllVertices.forEach(function(element) {
                    for (let i = 0; i < maleModelPosition.count; i++) {
                        if (maleModelVector.fromBufferAttribute(maleModelPosition, i).x == element[0] && maleModelVector.fromBufferAttribute(maleModelPosition, i).y == element[1] && maleModelVector.fromBufferAttribute(maleModelPosition, i).z == element[2]) {
                            belVertexIndex.push([i]);
                        }
                    }
                })

                eModelBasenAllVertices.forEach(function(element) {
                    for (let i = 0; i < maleModelPosition.count; i++) {
                        if (maleModelVector.fromBufferAttribute(maleModelPosition, i).x == element[0] && maleModelVector.fromBufferAttribute(maleModelPosition, i).y == element[1] && maleModelVector.fromBufferAttribute(maleModelPosition, i).z == element[2]) {
                            basenVertexIndex.push([i]);
                        }
                    }
                })

                eModelIcBoyAllVertices.forEach(function(element) {
                    for (let i = 0; i < maleModelPosition.count; i++) {
                        if (maleModelVector.fromBufferAttribute(maleModelPosition, i).x == element[0] && maleModelVector.fromBufferAttribute(maleModelPosition, i).y == element[1] && maleModelVector.fromBufferAttribute(maleModelPosition, i).z == element[2]) {
                            icBoyVertexIndex.push([i]);
                        }
                    }
                })

                eModelDizAllVerticies.forEach(function(element) {
                    for (let i = 0; i < maleModelPosition.count; i++) {
                        if (maleModelVector.fromBufferAttribute(maleModelPosition, i).x == element[0] && maleModelVector.fromBufferAttribute(maleModelPosition, i).y == element[1] && maleModelVector.fromBufferAttribute(maleModelPosition, i).z == element[2]) {
                            dizVertexIndex.push([i]);
                        }
                    }
                })

                var gogusMedian;
                var gogusVerticiesX = [];
                var gogusVerticiesXRaw = [];
                
                var belMedian;
                var belVerticiesX = [];
                var belVerticiesXRaw = [];

                var basenMedian;
                var basenVerticiesX = [];
                var basenVerticiesXRaw = [];

                var icBoyVerticiesZRaw = [];

                var dizVerticiesZRaw = [];

                for (let i = 0; i < gogusVertexIndex.length; i++) {
                    gogusVerticiesX.push(maleModelPosition.getX(gogusVertexIndex[i]));
                    gogusVerticiesXRaw.push(maleModelPosition.getX(gogusVertexIndex[i]));
                }

                gogusVerticiesX.sort((a, b) => {
                    return b - a;
                })

                gogusMedian = (gogusVerticiesX[(gogusVerticiesX.length / 2) - 1] + gogusVerticiesX[gogusVerticiesX.length / 2]) / 2;

                for (let i = 0; i < belVertexIndex.length; i++) {
                    belVerticiesX.push(maleModelPosition.getX(belVertexIndex[i]));
                    belVerticiesXRaw.push(maleModelPosition.getX(belVertexIndex[i]));
                }

                belVerticiesX.sort((a, b) => {
                    return b - a;
                })

                belMedian = (belVerticiesX[Math.floor(belVerticiesX.length / 2)]) * 100;

                for (let i = 0; i < basenVertexIndex.length; i++) {
                    basenVerticiesX.push(maleModelPosition.getX(basenVertexIndex[i]));
                    basenVerticiesXRaw.push(maleModelPosition.getX(basenVertexIndex[i]));
                }

                basenVerticiesX.sort((a, b) => {
                    return b - a;
                })

                basenMedian = (basenVerticiesX[(basenVerticiesX.length / 2) - 1] + basenVerticiesX[basenVerticiesX.length / 2]) / 2;

                for (let i = 0; i < icBoyVertexIndex.length; i++) {
                    icBoyVerticiesZRaw.push(maleModelPosition.getZ(icBoyVertexIndex[i]));
                }

                for (let i = 0; i < dizVertexIndex.length; i++) {
                    dizVerticiesZRaw.push(maleModelPosition.getZ(dizVertexIndex[i]));
                }

                // NEW FORMULA
                var Rx = 33; // constant value for bel and basen, not for gogus.

                var aGogus = 40 / 2;

                var bGogus = (aGogus / (Math.sqrt(3)));

                var aBel = Rx / 2;

                var bBel = (aBel / (Math.sqrt(3)));

                var aBasen = Rx / 2;

                var bBasen = (aBasen / (Math.sqrt(3)));


                var maleModelGogusCircumferance = ( Math.PI * ( (bGogus * Math.sqrt(3)) + bGogus) ) * ( 1 + ((Math.pow( ((bGogus * Math.sqrt(3)) - bGogus), 2 )) / (Math.pow( ((bGogus * Math.sqrt(3)) + bGogus), 2 ))) );

                var maleModelBelCircumferance = ( ( Math.PI * ( (bBel * Math.sqrt(3)) + bBel) ) * ( 1 + ((Math.pow( ((bBel * Math.sqrt(3)) - bBel), 2 )) / (Math.pow( ((bBel * Math.sqrt(3)) + bBel), 2 ))) ) );

                var maleModelBasenCircumferance = ( Math.PI * ( (bBasen * Math.sqrt(3)) + bBasen) ) * ( 1 + ((Math.pow( ((bBasen * Math.sqrt(3)) - bBasen), 2 )) / (Math.pow( ((bBasen * Math.sqrt(3)) + bBasen), 2 ))) );


                var radiusGogus = ((gogusMedian * userErkek.gogus) / maleModelGogusCircumferance);

                var radiusBel = (((belMedian * userErkek.bel) / maleModelBelCircumferance)) / threeUnit;

                var radiusBasen = ((basenMedian * userErkek.basen) / maleModelBasenCircumferance);


                var solutionIcBoy = ((calcErkek.ic_boy - ((calcErkek.boy * 70) / 167)) * 150) / 100;

                var solutionDiz = solutionIcBoy * 0.5;

                ///

                gltf.scene.scale.z = userErkek.boy / 167; // 167 is base height.
                
                gltf.scene.rotateX(-1 * (Math.PI / 2));
                gltf.scene.rotateZ(-1 * (Math.PI / 2));

                scene.add(gltf.scene);
                
                var erkekModelAnimate = function() {

                    gogusVertexIndex.forEach(function(element, index) {
                        maleModelPosition.setX(element[0], gogusVerticiesXRaw[index] - (gogusMedian));
                        maleModelPosition.setX(element[0], maleModelPosition.getX(element[0]) + radiusGogus);
                    })
                    
                    belVertexIndex.forEach(function(element, index) {
                        maleModelPosition.setX(element[0], belVerticiesXRaw[index] - (belMedian / threeUnit));
                        maleModelPosition.setX(element[0], maleModelPosition.getX(element[0]) + radiusBel);
                    })

                    basenVertexIndex.forEach(function(element, index) {
                        maleModelPosition.setX(element[0], basenVerticiesXRaw[index] - (basenMedian));
                        maleModelPosition.setX(element[0], maleModelPosition.getX(element[0]) + radiusBasen);
                    })

                    icBoyVertexIndex.forEach(function(element, index) {
                        maleModelPosition.setZ(element[0], icBoyVerticiesZRaw[index] - solutionIcBoy);
                    })

                    dizVertexIndex.forEach(function(element, index) {
                        maleModelPosition.setZ(element[0], dizVerticiesZRaw[index] - solutionDiz);
                    })

                    maleModelPosition.needsUpdate = true;

                    renderer.render(scene, camera);
                    requestAnimationFrame(erkekModelAnimate);
                }

                erkekModelAnimate();
                
            })
            
            ///

            //  M Size Regular Tshirt Show on screen or not section - START

            if (selectedProduct.marka === RegularTshirtSizes.metaM[0] && selectedProduct.kiyafet === RegularTshirtSizes.metaM[1] && selectedProduct.tur === RegularTshirtSizes.metaM[2] && selectedProduct.bedenLetter === RegularTshirtSizes.metaM[3]) {
                if (findSuitableWidth.allPass === true) {
                    drawClothModel();
                }
            }

            // M Size Regular Tshirt Show on screen or not section - END

            // Move canvas to actual div
            $("canvas").detach().appendTo("#3d-div");
            ///
        }

        ///////////////////////////////////////////////7

        function getCmAndConvert() {
            check = [];
            
            userErkek.boy = parseInt($("#e-model-height").val());
            userErkek.gogus = parseInt($("#e-model-gogus").val());
            userErkek.bel = parseInt($("#e-model-bel").val());
            userErkek.basen = parseInt($("#e-model-basen").val());
            userErkek.ic_boy = parseInt($("#e-model-icboy").val());

            if (sizeTableActive == 0) {
                check.push("false");
                window.alert("Lütfen marka, kıyafet ve beden seçimi yapınız!")
            } else {
                if (Number.isNaN(userErkek.boy) == true && Number.isNaN(userErkek.gogus) == true && Number.isNaN(userErkek.bel) == true && Number.isNaN(userErkek.basen) == true && Number.isNaN(userErkek.ic_boy) == true) {
                    check.push("false");
                    window.alert("Lütfen beden ölçülerinizi giriniz!");
                } else {
                    if (userErkek.boy !== 0 && Number.isNaN(userErkek.boy) == false) {
                        check.push("true");
                        calcErkek.boy = userErkek.boy / threeUnit;
                    } else {
                        check.push("false");
                        window.alert("Lütfen boy ölçünüzü giriniz!");
                    }
            
                    if (userErkek.gogus !== 0 && Number.isNaN(userErkek.gogus) == false) {
                        check.push("true");
                        calcErkek.gogus = userErkek.gogus / threeUnit;
                    } else {
                        check.push("false");
                        window.alert("Lütfen göğüs ölçünüzü giriniz!");
                    }
            
                    if (userErkek.bel !== 0 && Number.isNaN(userErkek.bel) == false) {
                        check.push("true");
                        calcErkek.bel = userErkek.bel / threeUnit;
                    } else {
                        check.push("false");
                        window.alert("Lütfen bel ölçünüzü giriniz!");
                    }
            
                    if (userErkek.basen !== 0 && Number.isNaN(userErkek.basen) == false) {
                        check.push("true");
                        calcErkek.basen = userErkek.basen / threeUnit;
                    } else {
                        check.push("false");
                        window.alert("Lütfen basen ölçünüzü giriniz!");
                    }
            
                    if (userErkek.ic_boy !== 0 && Number.isNaN(userErkek.ic_boy) == false) {
                        check.push("true");
                        calcErkek.ic_boy = userErkek.ic_boy / threeUnit;
                    } else {
                        check.push("false");
                        window.alert("Lütfen iç boy ölçünüzü giriniz!");
                    }
                }
            }
        }

        function controlAndDraw() {
            var count = 0;
            for (var i = 0; i < check.length; i++) {
                if (check[i] === "true") {
                    count += 1;
                }
            }

            if (count === 5) { // total existed input tag
                $("canvas").remove(); // remove old canvas
                drawModel3D();
            }
        }

        $("#e-calculate-button").on("click", function() {
            getCmAndConvert();
            controlAndDraw();
        });

    }

});