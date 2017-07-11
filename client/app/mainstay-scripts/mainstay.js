import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

function mainstay () {
	console.log('Mainstay is here!');
	$( "#hpeQuestion1" ).change(function() {
	  console.log( "Handler for .change() called from mainstay." );
	});
}
export default mainstay;

// function mainstay () {
// 	/*************************************************************************************************/
// 	// UTIL Object
// 	// Desc: Contains useful utility functions.
// 	/*************************************************************************************************/
// 	var microTool = {}; 
// 	microTool.util = {
// 	    init: function (){
// 	        if (microTool.util.IsInIframe()) {
// 	            var message = "IFrame Detected: Due to security risks, the web calculator is not permitted to run inside of an IFrame html element.";
// 	            microTool.util.SendToErrorPage(message);
// 	        }

// 	        var pageType = $('#pageType'),
// 	            timestamp = microTool.config.production ? new Date().getTime() : "1";;

// 	        if (pageType.length > 0 && pageType.val() == 'register') {
// 	            microTool.page = 'register';
// 	        }
// 	        else {
// 	            microTool.page = 'inputs';
// 	        }


// 	        // the user just uploaded a zip of this project...
// 	        // if we added or deleted any db-entities, this will rebuild the text object that we need for the deliverable doc
// 	        if (window.location.href.indexOf('buildjson=1') != -1) {
// 	            var strBuildJson = microTool.util.buildJSON();
// 	            var urlTarget = microTool.util.determineUrl() + '/api.aspx/ProcessJsonForMicroTool';

// 	            $.ajax({
// 	                url: urlTarget,
// 	                type: "POST",
// 	                dataType: "json",
// 	                data: '{ "jsonStr": ' + JSON.stringify(strBuildJson) + ', "toolId": ' + JSON.stringify(microTool.config.analysisId) + '}',
// 	                async: true,
// 	                cache: false,
// 	                contentType: "application/json; charset=utf-8",
// 	                success: function (data) {
// 	                    var tempsuccess = data.d;
// 	                },
// 	                error: function (xhr, textStatus, errorThrown) {
// 	                    var temperror = '';
// 	                }
// 	            });
// 	        }

// 	        /*Load Values from Cookie*/
// 	        if (microTool.page === 'register') {
// 	            if (microTool.util.cookie.get()) {
// 	                if (microTool.util.getQueryString('reg') || microTool.util.getQueryString('email')) {
// 	                    var email = microTool.util.getQueryString('email');

// 	                    microTool.values.calc.Email = email;
// 	                    microTool.values.registered = true;
// 	                    microTool.values.calc.SendEmailReport = false;
// 	                    microTool.util.cookie.set();

// 	                    if (microTool.config.resultsPage !== '') {
// 	                        window.location.href = microTool.config.resultsPage;
// 	                    }
// 	                    else {
// 	                        window.location.href = microTool.config.inputsPage;
// 	                    }
// 	                }
// 	                else {
// 	                    /*Invalid Reg Link send back*/
// 	                    if (microTool.config.registerBeforeResults || microTool.config.registerForDeliverable) {
// 	                        window.location.href = microTool.config.inputsPage;
// 	                    }
// 	                    else {
// 	                        window.location.href = microTool.config.resultsPage;
// 	                    }
// 	                }
// 	            }
// 	            else {
// 	                window.location.href = microTool.config.inputsPage;
// 	            }
// 	        }
// 	        else {
// 	            if (microTool.util.cookie.get()) {
// 	                /*Cookie Exists and is already setup, lets use it in the inputs*/
// 	                microTool.values.loadData[microTool.page](false);
// 	            }
// 	            else {
// 	                /*Cookie does not Exists*/
// 	                // set uniqueId
// 	                microTool.values.calc.uniqueId = microTool.util.getDateNow();
// 	                microTool.documents.word.microToolReport.uniqueId = microTool.values.calc.uniqueId;

// 	                microTool.values.loadData[microTool.page](true);
// 	            }

// 	            $('.checkboxLabel').bind('click.microTool', function (evnt) {
// 	                evnt.preventDefault();
// 	                $(this).prev().click();
// 	            });

// 	            $('input, select, checkbox').on('change', function () {
// 	                /*Check Currency*/
// 	                if (!$(this).hasClass('CurrencyDropdown') && !$(this).hasClass('ExchangeRate') && ($(this).hasClass('regInput') || $(this).hasClass('checkboxInput') || $(this).hasClass('radioInput'))) {
// 	                    if (microTool.page) {
// 	                        if (microTool.page === 'inputs') {
// 	                            if (microTool.values.loadData[microTool.page](true) === true) {
// 	                                if (microTool.util.checkModelDriven()) {
// 	                                    var bSkipModelRecalc = false

// 	                                    if ((typeof (microTool.config.bSkipModelRecalc) != 'undefined' || microTool.config.bSkipModelRecalc != null) && microTool.config.bSkipModelRecalc == true) {
// 	                                        bSkipModelRecalc = true;
// 	                                    }

// 	                                    microTool.values.runModel(microTool.values.present[microTool.page], $(this).attr('data-dbentity'), $(this).val(), bSkipModelRecalc);
// 	                                }
// 	                            }
// 	                        } else {
// 	                            if (microTool.values.loadData[microTool.page](true) === true) {
// 	                                //microTool.values.run(microTool.values.present[microTool.page]);
// 	                            }
// 	                        }
// 	                    }
// 	                }
// 	            });

// 	            $('.ratingInputContainer span').click(function () {
// 	                microTool.util.processRatingInput($(this), true);
// 	            });

// 	            // used in Jam tool
// 	            $('.slider-track').mouseup(function () {
// 	                var hiddenDivBeforeSlider = $(this).parent().prev();

// 	                /*Check Currency*/
// 	                if (!hiddenDivBeforeSlider.hasClass('CurrencyDropdown') && !hiddenDivBeforeSlider.hasClass('ExchangeRate') && (hiddenDivBeforeSlider.hasClass('regInput') || hiddenDivBaforeSlider.hasClass('checkboxInput') || hiddenDivBaforeSlider.hasClass('radioInput'))) {
// 	                    if (microTool.page) {
// 	                        if (microTool.page === 'inputs') {
// 	                            if (microTool.values.loadData[microTool.page](true) === true) {
// 	                                //microTool.values.run(microTool.values.present[microTool.page]);
// 	                            }
// 	                        } else {
// 	                            if (microTool.values.loadData[microTool.page](true) === true) {
// 	                                //microTool.values.run(microTool.values.present[microTool.page]);
// 	                            }
// 	                        }
// 	                    }
// 	                }
// 	            });

// 	            $('.microToolRecalcForResultsButton').click(function () {
// 	                /*Buttons coming from main index.html page.*/
// 	                if (microTool.values.loadData[microTool.page](true) === true) {
// 	                    if (microTool.util.checkModelDriven()) {
// 	                        microTool.values.runModel(microTool.values.present[microTool.page], "recalc", '', false);
// 	                    }
// 	                }
// 	            });

// 	            $('#microToolRegForReportBlock, #microToolResultsButton, #microToolRegisterButton').click(function () {
// 	                // decide if we are going to tack on a parameter to the registration page..
// 	                var param = "";
// 	                if (microTool.config.sendPathParamToRegistrationPage) {
// 	                    // pass link:  ftp://193.222.23.234/path/2014121522333-deliverable.pdf or ".DOC" look at config...
// 	                    var ftpPath = microTool.config.ftpuri
// 	                    var uniqueId = microTool.values.calc.uniqueId;
// 	                    var wordDoc = microTool.config.wordDoc;

// 	                    //cut off the file extention
// 	                    parts = wordDoc.split(".");
// 	                    var filename = parts[0];
// 	                    var extention = parts[1]; // its either a doc or a docx file extention...

// 	                    // get the correct filename extention: pdf, doc or docx
// 	                    if (microTool.config.deliverablePdf) {
// 	                        extention = "pdf";
// 	                    }

// 	                    param = "?path=" + ftpPath + uniqueId + "-" + filename + "." + extention;
// 	                }

// 	                /*Buttons coming from main index.html page.*/
// 	                if (microTool.values.loadData[microTool.page](true) === true) {
// 	                    if (microTool.util.checkModelDriven()) {
// 	                        var bSkipModelRecalc = false

// 	                        if ((typeof (microTool.config.bSkipModelRecalc) != 'undefined' || microTool.config.bSkipModelRecalc != null) && microTool.config.bSkipModelRecalc == true) {
// 	                            bSkipModelRecalc = true;
// 	                        }

// 	                        microTool.values.runModel(microTool.values.present[microTool.page], "recalc", '', bSkipModelRecalc);
// 	                    } else {
// 	                        microTool.values.run(microTool.values.present[microTool.page]);
// 	                    }
// 	                }

// 	                if (microTool.config.production && microTool.config.registerBeforeResults && microTool.page !== 'results') {
// 	                    window.location.href = microTool.config.registrationPage + param;
// 	                }
// 	                else if (microTool.config.production && microTool.config.registerForDeliverable && microTool.page === 'results') {
// 	                    window.location.href = microTool.config.registrationPage + param;
// 	                }
// 	                else {
// 	                    window.location.href = microTool.config.resultsPage;
// 	                }
// 	                return false;
// 	            });

// 	            /*Back to inputs*/
// 	            $('#microToolInputsButton').click(function () {
// 	                window.location.href = microTool.config.inputsPage;
// 	                return false;
// 	            });

// 	            /*user clicked the register button on normans reg form */
// 	            $('.registerBtn').click(function () {
// 	                // need to save the email they just entered in the reg form, that we use as the customer analysis name.
// 	                // save the customer analysis record, to reflect the fact that this microtool user has registered
// 	                // generate the deliverable now that they have successfully registered, but dont send it to the end users browser

// 	                if (microTool.config.thirdPartyRegistration) {
// 	                }
// 	                else {
// 	                    /*only set if staying local or true ajax*/
// 	                    microTool.values.registered = true;
// 	                }

// 	                microTool.analysis.save(microTool.analysis.generateDeliverable);

// 	                // in the first save, upon success, we get a customer analysis id.. and build the direct link and save it to the json object..
// 	                // so we need to save again, to actually save this direct link in the db.
// 	                microTool.analysis.save();
// 	            });

// 	            /*user clicked the results (gotoregister) button on the last page of inputs */
// 	            $('.gotoRegisterBtn').click(function () {
// 	                // need to save so that we can build the direct url and pass to the reg form
// 	                microTool.analysis.save();
// 	            });

// 	            // grab the email from the reg form
// 	            $('[data-dbentity="email"]').change(function () {
// 	                microTool.values.calc.Email = $('[data-dbentity="email"]').val().replace(/'/g, '');
// 	            });
// 	            $('[data-dbentity="Email"]').change(function () {
// 	                microTool.values.calc.Email = $('[data-dbentity="Email"]').val().replace(/'/g, '');
// 	            });

// 	            //Check Configuration for Registration
// 	            microTool.util.processRegistrationSettings();

// 	            $('#microToolDownloadButton, .microToolDownloadButton, .microToolDownloadLink').bind('click', function () {
// 	                //If they can download they are registered
// 	                microTool.values.registered = true;

// 	                if (microTool.config.deliverablePrint) {
// 	                    window.print();
// 	                }
// 	                else {
// 	                    microTool.analysis.save(microTool.analysis.download);
// 	                }
// 	            });

// 	            $('#microToolEmailUserButton, .contactUsBtn').click(function () {
// 	                //If they can email they are registered
// 	                microTool.values.registered = true;

// 	                microTool.analysis.save(function () {
// 	                    var directUrl = (microTool.util.determineUrl() + "/default.aspx?atid=" + microTool.config.analysisId + "&c=" + microTool.documents.word.microToolReport.userAnalysisId + "&t=" + microTool.config.brand),
// 	                        customerName = microTool.config.customerAnalysisName,
// 	                        customerEmail = microTool.values.calc.Email;

// 	                    microTool.analysis.email(microTool.values.calc.Email, microTool.config.emailBody, true /*open confirmation panel*/, true /*include attachment*/);
// 	                    microTool.analysis.email(microTool.config.emailAlias, customerName + " (" + customerEmail + ") " + microTool.config.emailBodyForAlias + directUrl, false/*open confirmation panel*/, false /*include attachment*/);
// 	                });
// 	            });

// 	            if (window.location.href.indexOf('reg=1') != -1) {
// 	                microTool.registration.load();
// 	            }

// 	            $('#microToolHeaderHome, .microToolHeaderHome').click(function () {
// 	                microTool.util.cookie.reset();
// 	                window.location.href = microTool.config.inputsPage;
// 	                return false;
// 	            });

// 	            $('.microToolUpdateInputs').click(function () {
// 	                microTool.values.loadData['inputs'](false);
// 	            });

// 	            $('#microToolInformationLink').click(function () {
// 	                microTool.util.openPanel('pnlInformation', 600);
// 	            });

// 	            $('#microToolAssumptionCloseButton, #microToolAnswerErrorCloseButton, #microEmailSendCloseButton, .closeModalButton').click(function () {
// 	                $.modal.close();
// 	            });

// 	            $('#microToolLeftArrow, .lowerNavContainer .navBtn.navLeft').click(function () {
// 	                microTool.util.processPanelClick(false, $(this));
// 	            });

// 	            $('#microToolRightArrow, .microToolButton.startBtn, .lowerNavContainer .navBtn.navRight').click(function () {
// 	                microTool.util.processPanelClick(true, $(this));
// 	            });

// 	            $('.resultCircle').click(function () {
// 	                var ctrl = $(this);
// 	                var name = ctrl.attr('name');
// 	                var lastSelected = ctrl.parent().find('.ResultsSelected');
// 	                var lastSelectedName = lastSelected.attr('name');

// 	                if (name != lastSelectedName) {
// 	                    var rightDiv = ctrl.parent().next();
// 	                    var otherPlacement = $('.OtherPlacements');
// 	                    var yourPlacement = $('.YourPlacement');

// 	                    lastSelected.removeClass('ResultsSelected', 200, function () {
// 	                        ctrl.addClass('ResultsSelected', 200, function () {
// 	                            rightDiv.fadeOut(200, function () {
// 	                                //Update class
// 	                                rightDiv.removeClass(lastSelected.attr('name') + 'Data', 200).addClass(name + 'Data', function () {
// 	                                    if (name == microTool.values.calc.ToolData.Rating.Category) {
// 	                                        yourPlacement.show();
// 	                                        otherPlacement.hide();
// 	                                    }
// 	                                    else {
// 	                                        yourPlacement.hide();
// 	                                        otherPlacement.show();
// 	                                        $("[id$='Placement']", otherPlacement).hide();
// 	                                        $('#' + name + 'Placement').fadeIn();
// 	                                    }

// 	                                    //fade back in
// 	                                    rightDiv.fadeIn(200);
// 	                                });
// 	                            });
// 	                        });
// 	                    });
// 	                }
// 	            });

// 	            $('.circle').click(function () {
// 	                if (!microTool.util.PanelProcessRunning) {
// 	                    microTool.util.PanelProcessRunning = true;
// 	                    var ctrl = $(this);

// 	                    if (ctrl.hasClass('visited_circle')) {
// 	                        if (microTool.util.checkPanelInputs()) {
// 	                            var panel = ctrl.attr('name');
// 	                            var index = microTool.config.toolPanels.indexOf(panel);

// 	                            //hide this panel
// 	                            if (index == microTool.config.toolPanels.length - 1) {
// 	                                $('#microToolRightArrow').fadeOut();
// 	                                $('.lowerNavContainer .navBtn.navRight').fadeOut();
// 	                            }
// 	                            else if (index == 0) {
// 	                                $('#microToolLeftArrow').fadeOut();
// 	                                $('.lowerNavContainer .navBtn.navLeft').fadeOut();
// 	                            }
// 	                            else {
// 	                                $('#microToolLeftArrow').show();
// 	                                $('.lowerNavContainer .navBtn.navLeft').show();
// 	                                $('#microToolRightArrow').show();
// 	                                $('.lowerNavContainer .navBtn.navRight').show();
// 	                            }

// 	                            $("[data-panelname='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").fadeOut(400, function () {
// 	                                $("[name='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").addClass('visited_circle', 200).removeClass('selected_circle', 200);

// 	                                microTool.util.CurrentPanel = index;
// 	                                $("[data-panelname='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").show("slide", { direction: "right" }, 800, function () {
// 	                                    $("[name='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").addClass('selected_circle', 500);
// 	                                    microTool.util.PanelProcessRunning = false;
// 	                                });
// 	                            });
// 	                        }
// 	                        else {
// 	                            microTool.util.PanelProcessRunning = false;
// 	                        }
// 	                    }
// 	                    else {
// 	                        microTool.util.PanelProcessRunning = false;
// 	                    }
// 	                }
// 	            });

// 	            if (microTool.values.registered) {
// 	                // call normans function that does the following:
// 	                //   hideSheets(null,"Register");
// 	                //   clickSheetsUnhide(null,"BenefitDetails,CostDetails");
// 	                //   clickSheet(null,"Results");
// 	                //   hideButton(null,"gotoRegisterBtn")};
// 	                if (typeof registrationReturnCustom === 'function') {
// 	                    registrationReturnCustom();
// 	                }
// 	            }
// 	        }

// 	        // are we using our google tracking? or is it turned off
// 	        if ((typeof (microTool.config.excludeGaTracking) != 'undefined' || microTool.config.excludeGaTracking != null) && microTool.config.excludeGaTracking == true) {
// 	            var x = 1;
// 	            // dont include it
// 	        }
// 	        else {

// 	            // microTool.config.excludeGaTracking could be undefined.. or it could be set to false.. either way, in this case we will use this GA tracking code.

// 	            //.......................................................................
// 	            // need to add tracking code at end of doc.ready for forrester microtools
// 	            (function (i, s, o, g, r, a, m) {
// 	                i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
// 	                    (i[r].q = i[r].q || []).push(arguments)
// 	                }, i[r].l = 1 * new Date(); a = s.createElement(o),
// 	                m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
// 	            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

// 	            ga('create', 'UA-3572260-1', 'auto');
// 	            ga('create', 'UA-3572260-4', 'auto', 'teiTracker');
// 	            ga('create', 'UA-3572260-5', 'auto', 'mitTracker');
// 	            ga('create', 'UA-3572260-6', 'auto', 'mainstayadvisor2');

// 	            ga('send', 'pageview');
// 	            ga('teiTracker.send', 'pageview');
// 	            ga('mitTracker.send', 'pageview');
// 	            ga('mainstayadvisor2.send', 'pageview');

// 	        }
// 	    },
// 	    buildJSON: function () {
// 	        //Creates text objects from dbEntity items:
// 	        var text = {},
// 	        inc = 0;

// 	        $('.microToolInput').each(function () {
// 	            var textObj = null;

// 	            $this = $(this);

// 	            if ($this.is("select")) {
// 	                textObj = { bookmark: { 0: '' }, dbEntity: '', 'data': 0, 'unformattedData': 0, 'bIsInput': 1, 'isHtml': 'false', 'include': 'true', 'bAnalytics': 1, 'possibleAnswers': '', 'listMappingField': '' };
// 	            }
// 	            else {
// 	                textObj = { bookmark: { 0: '' }, dbEntity: '', 'data': 0, 'unformattedData': 0, 'bIsInput': 1, 'isHtml': 'false', 'include': 'true', 'bAnalytics': 1 };
// 	            }

// 	            if (typeof ($this.data('dbentity')) != 'undefined') {
// 	                textObj.bookmark[0] = $this.data('dbentity');
// 	                textObj.dbEntity = $this.data('dbentity');

// 	                text[inc] = textObj;
// 	                inc += 1;
// 	            }
// 	        });

// 	        $('.microToolOutput').each(function () {
// 	            var textObj = null;

// 	            $this = $(this);
// 	            textObj = { bookmark: { 0: '' }, dbEntity: '', 'data': 0, 'unformattedData': 0, 'bIsInput': 0, 'isHtml': 'false', 'include': 'true', 'bAnalytics': 1 };

// 	            if (typeof ($this.data('dbentity')) != 'undefined') {
// 	                textObj.bookmark[0] = $this.data('dbentity');
// 	                textObj.dbEntity = $this.data('dbentity');

// 	                text[inc] = textObj;
// 	                inc += 1;
// 	            }
// 	        });

// 	        $('.microToolInclude').each(function () {
// 	            var textObj = null;

// 	            $this = $(this);
// 	            textObj = { bookmark: { 0: '' }, dbEntity: '', 'data': '', 'unformattedData': 0, 'bIsInput': 0, 'isHtml': 'false', 'include': 'true', 'bAnalytics': 0 };

// 	            if (typeof ($this.data('dbentity')) != 'undefined') {
// 	                textObj.bookmark[0] = $this.data('dbentity');
// 	                textObj.dbEntity = $this.data('dbentity');

// 	                text[inc] = textObj;
// 	                inc += 1;
// 	            }
// 	        });

// 	        console.log(JSON.stringify(text));

// 	        return JSON.stringify(text);
// 	    },
// 	    checkModelDriven: function () {
// 	        if ((typeof (microTool.config.modelDriven) != 'undefined' || microTool.config.modelDriven != null) && microTool.config.modelDriven == true) {
// 	            return true;
// 	        } else {
// 	            return false;
// 	        }
// 	    },
// 	    IsInIframe: function () {
// 	        try {
// 	            var isInIframe = false;

// 	            // dont worry about the Error page, or else we will get in a infinite loop because we send them to the Error page
// 	            if (window.location.href.indexOf("Error.aspx") == -1) {

// 	                if (window.self !== window.top) {
// 	                    isInIframe = true;
// 	                }
// 	                else {
// 	                    isInIframe = false;
// 	                }
// 	            } // end if ( window.location.href.indexOf("Error.aspx") > -1) {

// 	            return isInIframe;

// 	        } catch (e) {
// 	            return true;
// 	        }
// 	    },
// 	    SendToErrorPage: function (message) {
// 	        var datetime = new Date().getTime();
// 	        window.console.log(message + ': ' + datetime);
// 	        //alert(message);
// 	        window.location.href = "/Error.aspx?msgType=2"; // 1: Advisor; 2: Microtools
// 	    },
// 	    updateFrontendFromModel: function (obj) {
// 	        var inputsAndOutputs = obj.content.text;

// 	        // SMW TODO:get the exchange rate and convert here?

// 	        for (var i in inputsAndOutputs) {
// 	            //$('attribute=dbentity' + obj[i]).val(obj[i].data);

// 	            var dbEntity = inputsAndOutputs[i].dbEntity;
// 	            var modelvalue = inputsAndOutputs[i].data;

// 	            if (inputsAndOutputs[i].bIsInput == "1") {

// 	                // INPUTS:
// 	                var format = $('[data-dbentity="' + dbEntity + '"]').data("format");
// 	                var roundto = $('[data-dbentity="' + dbEntity + '"]').data("roundto");

// 	                // make sure its defined
// 	                if ((typeof format == "undefined") || (format == null)) {
// 	                    format = "7"; // string
// 	                }
// 	                else {
// 	                    format = format.toString();
// 	                }

// 	                // make sure its defined
// 	                if ((typeof roundto == "undefined") || (roundto == null)) {
// 	                    roundto = 0; // number
// 	                }
// 	                else {
// 	                    roundto = roundto;
// 	                }

// 	                if ((inputsAndOutputs[i].possibleAnswers != null) && (inputsAndOutputs[i].possibleAnswers != "")) {

// 	                    // this is "|" pipe delimited list of strings
// 	                    var possibleAnswers = inputsAndOutputs[i].possibleAnswers;

// 	                    if (possibleAnswers != "") {
// 	                        var arrAnswers = possibleAnswers.split("|");
// 	                        var html = '';

// 	                        for (var j = 0, len = arrAnswers.length; j < len; ++j) {

// 	                            // skip the first one that is blank.. cause the string starts out with a pipe
// 	                            if (arrAnswers[j] != "") {

// 	                                // is this the selected on?
// 	                                if (inputsAndOutputs[i].data == arrAnswers[j]) {
// 	                                    html = html + '<option selected="selected" value="' + arrAnswers[j] + '">' + arrAnswers[j] + '</option>';
// 	                                }
// 	                                else {
// 	                                    html = html + '<option value="' + arrAnswers[j] + '">' + arrAnswers[j] + '</option>';
// 	                                }
// 	                            }
// 	                        }

// 	                        // clear out the old options
// 	                        $('[data-dbentity="' + dbEntity + '"]').empty();

// 	                        // add the new options
// 	                        $('[data-dbentity="' + dbEntity + '"]').append(html);
// 	                        $('[data-dbentity="' + dbEntity + '"]').val(inputsAndOutputs[i].data);

// 	                    }
// 	                }
// 	                else {
// 	                    // format the percentage.. comes back from model as 0.34..
// 	                    if (format == "2") {
// 	                        var rawData = inputsAndOutputs[i].data;

// 	                        if (rawData.indexOf('%') > -1) {
// 	                            /*Already Formatted take unformatted data value*/
// 	                            rawData = inputsAndOutputs[i].unformattedData;
// 	                        }

// 	                        modelvalue = rawData * 100;
// 	                    }

// 	                    // update the input
// 	                    var nativeFormat = microTool.currency.convertToNativeNumberFromEnUs(modelvalue, format, roundto);
// 	                    $('[data-dbentity="' + dbEntity + '"]').val(nativeFormat);
// 	                }
// 	            }
// 	            else {
// 	                // OUTPUTS:

// 	                var format = $('[data-dbentity="' + dbEntity + '"]').data("format");
// 	                var roundto = $('[data-dbentity="' + dbEntity + '"]').data("roundto");

// 	                // make sure its defined
// 	                if ((typeof format == "undefined") || (format == null)) {
// 	                    format = "7"; // string
// 	                }
// 	                else {
// 	                    format = format.toString();
// 	                }

// 	                // make sure its defined
// 	                if ((typeof roundto == "undefined") || (roundto == null)) {
// 	                    roundto = 0; // number
// 	                }
// 	                else {
// 	                    roundto = roundto;
// 	                }

// 	                // format the percentage.. comes back from model as 0.34..
// 	                //if (format == "2") {
// 	                //    modelvalue = modelvalue * 100;
// 	                //}

// 	                //var val = modelvalue;

// 	                var val = microTool.util.formatDataType(format, modelvalue, roundto);

// 	                var nativeFormat = microTool.currency.convertToNativeNumberFromEnUs(val, format);
// 	                // these are <span> or <div> elements
// 	                $('[data-dbentity="' + dbEntity + '"]').val(nativeFormat);
// 	                $('[data-dbentity="' + dbEntity + '"]').html(nativeFormat); // if this is a <html> input
// 	            }
// 	        }
// 	    },
// 	    getDateNow: function () {
// 	        now = new Date();

// 	        year = "" + now.getFullYear();
// 	        month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
// 	        day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }

// 	        hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
// 	        minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
// 	        second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }

// 	        millisecond = "" + now.getMilliseconds();
// 	        if (millisecond.length == 1) { millisecond = "00" + millisecond; }
// 	        if (millisecond.length == 2) { millisecond = "0" + millisecond; }

// 	        return year + "" + month + "" + day + "" + hour + "" + minute + "" + second + "" + millisecond;
// 	    },
// 	    simulateClick: function (id) {
// 	        var anchorObj = document.getElementById(id);

// 	        if (anchorObj.click) {
// 	            anchorObj.click()
// 	        } else if (document.createEvent) {
// 	            if (event.target !== anchorObj) {
// 	                var evt = document.createEvent("MouseEvents");
// 	                evt.initMouseEvent("click", true, true, window,
// 	                    0, 0, 0, 0, 0, false, false, false, false, 0, null);
// 	                var allowDefault = anchorObj.dispatchEvent(evt);
// 	                // you can check allowDefault for false to see if
// 	                // any handler called evt.preventDefault().
// 	                // Firefox will *not* redirect to anchorObj.href
// 	                // for you. However every other browser will.
// 	            }
// 	        }
// 	    },
// 	    checkIos: function (setMeta) {
// 	        if ((navigator.userAgent.match(/iPhone/i))     //Lines split for easy reading only
// 	            || (navigator.userAgent.match(/iPod/i))) {
// 	            if (setMeta) {
// 	                $('meta[name=apple-mobile-web-app-capable]').remove();
// 	                $('meta[name=viewport]').remove();
// 	                $('head').append('');
// 	            }

// 	            return true;
// 	        }
// 	        else if ((navigator.userAgent.match(/iPad/i))) {
// 	            return true;
// 	        }
// 	        else {
// 	            return false;
// 	        }
// 	    },
// 	    'CurrentPanel': 0,
// 	    'PanelProcessRunning': false,
// 	    determineUrl: function () {
// 	        var serverPath = '';

// 	        if (microTool.config.production) {
// 	            if (window.location.href.indexOf(microTool.config.productionServer) !== -1) {
// 	                serverPath = microTool.config.productionServer;
// 	            } else {
// 	                serverPath = microTool.config.productionServerNonWWW;
// 	            }
// 	        } else {
// 	            serverPath = microTool.config.localServer;
// 	        }

// 	        return serverPath;
// 	    },
// 	    checkPanelInputs: function () {
// 	        var updatePanels = false;

// 	        if (microTool.config.toolPanelsRequireAnswers[microTool.util.CurrentPanel]) {
// 	            var panel = microTool.config.toolPanels[microTool.util.CurrentPanel];
// 	            var numInputs = microTool.config.toolPanelsNumInputs[microTool.util.CurrentPanel];
// 	            var allAnswered = false;
// 	            var answeredCount = 0;

// 	            /*Check all inputs for section answered*/
// 	            $("[data-panelname='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "'] :input").each(function () {
// 	                var $ele = $(this);
// 	                var id = $ele.data('dbentity');

// 	                if (!$ele.hasClass('notRequired')) {
// 	                    if ($ele.hasClass('regInput') || $ele.hasClass('radioInput') || $ele.hasClass('checkboxInput') || $ele.hasClass('ratingInput')) {
// 	                        if ($ele.hasClass('regInput') || $ele.hasClass('radioInput') || $ele.hasClass('checkboxInput')) {
// 	                            if ($ele.val() != '') {
// 	                                answeredCount += 1;
// 	                            }
// 	                        }
// 	                        else {
// 	                            var selected = $ele.parent().find(".ratingInputSelected");
// 	                            if (selected.length) {
// 	                                if (parseInt(selected.text()) > 0) {
// 	                                    answeredCount += 1;
// 	                                }
// 	                            }
// 	                        }
// 	                    }
// 	                } else {
// 	                    answeredCount += 1;
// 	                }
// 	            });

// 	            /*Check final count*/
// 	            if (answeredCount >= numInputs) {
// 	                allAnswered = true;
// 	            }

// 	            if (allAnswered) {
// 	                updatePanels = true;
// 	            }
// 	            else {
// 	                microTool.util.PanelProcessRunning = false;
// 	                microTool.util.openPanel('pnlInputError');
// 	            }
// 	        }
// 	        else {
// 	            updatePanels = true;
// 	        }

// 	        return updatePanels;
// 	    },
// 	    processPanelClick: function (bRight, ctrl) {
// 	        if (!microTool.util.PanelProcessRunning) {
// 	            microTool.util.PanelProcessRunning = true;

// 	            if (bRight) {
// 	                $('.microTool_content_top').show();

// 	                if (microTool.util.checkPanelInputs()) {
// 	                    var isResults = false;

// 	                    if (microTool.config.registerPanel == microTool.config.toolPanels[microTool.util.CurrentPanel] || microTool.values.registered) {
// 	                        microTool.values.registered = true;
// 	                        microTool.util.processRegistrationSettings();
// 	                    }

// 	                    if (microTool.util.CurrentPanel == microTool.config.toolPanels.length - 2) {
// 	                        ctrl.fadeOut();

// 	                        $('#microToolRightArrow').fadeOut();
// 	                        $('.lowerNavContainer .navBtn.navRight').hide();

// 	                        //Craig W: 1/13/2014, added save to final slide initialize:
// 	                        microTool.analysis.save(function () { });
// 	                        isResults = true;
// 	                    }
// 	                    else {
// 	                        $('.lowerNavContainer .navBtn.navRight').show();

// 	                        $('#microToolLeftArrow').show();
// 	                        $('.lowerNavContainer .navBtn.navLeft').show();
// 	                    }

// 	                    $("[data-panelname='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").fadeOut(400, function () {
// 	                        $("[name='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").addClass('visited_circle', 200).removeClass('selected_circle', 200);

// 	                        microTool.util.CurrentPanel += 1;

// 	                        $("[data-panelname='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").show("slide", { direction: "right" }, 800, function () {
// 	                            if (isResults)
// 	                            { $("[name='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").addClass('visited_circle', 0); }

// 	                            $("[name='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").addClass('selected_circle', 500);
// 	                            microTool.values.present.results();
// 	                            microTool.util.PanelProcessRunning = false;
// 	                        });
// 	                    });
// 	                }
// 	            }
// 	            else {
// 	                if (microTool.util.CurrentPanel == 1) {
// 	                    $('.microTool_content_top').hide();
// 	                    $('#microToolLeftArrow').hide();
// 	                    $('.lowerNavContainer .navBtn.navLeft').hide();

// 	                    $('.lowerNavContainer .navBtn.navRight').hide();
// 	                }
// 	                else {
// 	                    $('.microTool_content_top').show();

// 	                    $('#microToolLeftArrow').show();
// 	                    $('.lowerNavContainer .navBtn.navLeft').show();

// 	                    $('#microToolRightArrow').show();
// 	                    $('.lowerNavContainer .navBtn.navRight').show();
// 	                }

// 	                $("[data-panelname='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").fadeOut(400, function () {
// 	                    $("[name='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").removeClass('selected_circle', 200);
// 	                    microTool.util.CurrentPanel -= 1;
// 	                    $("[data-panelname='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").show("slide", { direction: "left" }, 800, function () {
// 	                        $("[name='" + microTool.config.toolPanels[microTool.util.CurrentPanel] + "']").addClass('selected_circle', 500);
// 	                        microTool.util.PanelProcessRunning = false;
// 	                    });
// 	                });
// 	            }
// 	        }
// 	    },
// 	    stripNumber: function (str, format) {
// 	        if (typeof (str) != 'undefined' && str != null) {
// 	            if (str.indexOf('%') !== -1 || (typeof (format) != 'undefined' && format != null && format == '2')) {
// 	                return parseFloat(str.replaceAll('%', '').replaceAll(' ', '')) / 100;
// 	            } else {
// 	                var parseValue = null;
// 	                // this is to handle currency conversion in a forrester tool
// 	                if ($('[data-dbentity=varCurrencySymbol]').html() != undefined) {
// 	                    parseValue = parseFloat(str.replaceAll('$', '').replaceAll($('[data-dbentity=varCurrencySymbol]').html(), '').replaceAll(',', '').replaceAll(' ', ''));
// 	                }
// 	                else {
// 	                    parseValue = parseFloat(str.replaceAll('$', '').replaceAll(',', '').replaceAll(' ', ''));
// 	                }

// 	                if (isNaN(parseValue)) {
// 	                    parseValue = str;
// 	                }

// 	                return parseValue;
// 	            }
// 	        }
// 	        return '';
// 	    },
// 	    commaFormatted: function (amount, noMoneySign) {
// 	        noMoneySign = typeof noMoneySign !== 'undefined' ? noMoneySign : false;
// 	        var delimiter = ',',
// 			    i = parseInt(amount),
// 				origi = i,
// 				minus = '',
// 				n = new String(i),
// 				a = [],
// 				nn;

// 	        if (isNaN(i)) { return ''; }
// 	        i = Math.abs(i);

// 	        if (origi < 0) { minus = '-'; } // sign based on original

// 	        while (n.length > 3) {
// 	            nn = n.substr(n.length - 3);
// 	            a.unshift(nn);
// 	            n = n.substr(0, n.length - 3);
// 	        }
// 	        if (n.length > 0) { a.unshift(n); }
// 	        n = a.join(delimiter);
// 	        amount = minus + n;
// 	        if (noMoneySign) {
// 	            return amount;
// 	        } else {
// 	            // this is to handle currency conversion in a forrester tool
// 	            if ($('[data-dbentity=varCurrencySymbol]').html() != undefined) {
// 	                return $('[data-dbentity=varCurrencySymbol]').html() + amount;
// 	            }
// 	            else {
// 	                return '$' + amount;
// 	            }
// 	        }
// 	    },
// 	    toMoney: function (number, currencyInfo, roundTo) {
// 	        var formatedNum = number;

// 	        if (currencyInfo != undefined) {
// 	            var currency = currencyInfo.symbol,
// 	                 currencyOrientation = currencyInfo.orientation,
// 	                 decimalValues = '';
// 	            if (number.toString().indexOf('.') > -1) {
// 	                decimalValues = number.toString().substr(number.toString().indexOf('.'), number.toString().length);
// 	                decimalValues = parseFloat(decimalValues).toFixed(roundTo);
// 	                if (decimalValues > 0 && decimalValues < 1) {
// 	                    decimalValues = decimalValues.toString();
// 	                } else {
// 	                    decimalValues = '';
// 	                }
// 	            }
// 	            var c = roundTo,
// 	               d = '.',
// 	               t = ',',
// 	               sign = (number < 0) ? '-' : '',
// 	               intValues = parseInt(number = Math.abs(number).toFixed(c)),
// 	               i = intValues + '',
// 	               j = ((j = i.length) > 3) ? j % 3 : 0;

// 	            decimalValues = intValues > 0 ? decimalValues.substr(1) : decimalValues;

// 	            formatedNum = sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + decimalValues;

// 	            // if there are two leading zeros now.. strip one of them
// 	            // this happens when a number such as "0.017" goes through the last statement
// 	            if (formatedNum.substr(0, 2) == "00") {
// 	                formatedNum = formatedNum.substr(1, formatedNum.length);
// 	            }

// 	            if (currency) {
// 	                if (currencyOrientation === "Left") {
// 	                    formatedNum = currency + formatedNum;
// 	                } else if (currencyOrientation === "Right") {
// 	                    formatedNum = formatedNum + currency;
// 	                }
// 	            }
// 	        }

// 	        return formatedNum;
// 	    },
// 	    toPercent: function (number, round) {
// 	        var num = (number * 100).toFixed(round);

// 	        return num + '%';
// 	    },
// 	    formatDataType: function (format, value, roundTo) {
// 	        switch (format) {
// 	            case '1': //numeric:
// 	                return microTool.util.toMoney(value, { orientation: '', symbol: '' }, roundTo);
// 	            case '2': //percent:
// 	                return microTool.util.toPercent(value, roundTo);
// 	            case '3': //monetary:
// 	                return microTool.util.toMoney(value, microTool.CurrencyOptions[microTool.values.calc.Country], roundTo);
// 	            case '4': //year:
// 	                return value;
// 	            case '5': //minutes:
// 	                return value;
// 	            case '6': //currency:
// 	                return '';
// 	            case '7':
// 	                return value;
// 	        }
// 	    },
// 	    isFunction: function (functionToCheck) {
// 	        var getType = {};
// 	        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
// 	    },
// 	    cookie: {
// 	        checkCookieV2: function () {
// 	            if (typeof Cookies == 'undefined') {
// 	                //Load js files if needed:
// 	                $('head').append('<script type="text/javascript" src="' + microTool.util.determineUrl() + '/go/mainstay/js.cookie.js' + '?seed=' + timestamp + '" ></script>');
// 	            }

// 	            if ((typeof (microTool.config.cookieV2) != 'undefined' || microTool.config.cookieV2 != null) && microTool.config.cookieV2 == true) {
// 	                return true;
// 	            } else {
// 	                return false;
// 	            }
// 	        },
// 	        set: function () {
// 	            var cookieData = {
// 	                'data-inputs': microTool.values.inputs,
// 	                'data-inputFormats': microTool.values.inputFormats,
// 	                'data-registered': microTool.values.registered,
// 	                'data-email': microTool.values.calc.Email,
// 	                'data-userAnalysid': microTool.documents.word.microToolReport.userAnalysisId
// 	            };
// 	            if (microTool.util.cookie.checkCookieV2()) {
// 	                Cookies.set('microTool-' + microTool.config.toolName, '', { path: '/' });
// 	                Cookies.set('microTool-' + microTool.config.toolName, JSON.stringify(cookieData), { expires: 1, path: '/' });
// 	            } else {
// 	                $.cookie('microTool-' + microTool.config.toolName, '', { path: '/' });
// 	                $.cookie('microTool-' + microTool.config.toolName, JSON.stringify(cookieData), { expires: 1, path: '/' });
// 	            }
// 	        },
// 	        get: function () {
// 	            var cookieData = '',
// 					jsonData;
// 	            if (microTool.util.cookie.checkCookieV2()) {
// 	                cookieData = Cookies.get('microTool-' + microTool.config.toolName);
// 	            } else {
// 	                cookieData = $.cookie('microTool-' + microTool.config.toolName);
// 	            }

// 	            if (typeof (cookieData) != 'undefined' && cookieData !== '' && cookieData !== null && $.evalJSON(cookieData) != null) {
// 	                jsonData = $.evalJSON(cookieData);
// 	                microTool.values.inputs = jsonData['data-inputs'];
// 	                microTool.values.inputFormats = jsonData['data-inputFormats'];
// 	                microTool.values.registered = jsonData['data-registered'];
// 	                microTool.values.calc.Email = jsonData['data-email'];
// 	                microTool.documents.word.microToolReport.userAnalysisId = jsonData['data-userAnalysid'];
// 	                return true;
// 	            } else {
// 	                return false;
// 	            }
// 	        },
// 	        reset: function () {
// 	            if (microTool.util.cookie.checkCookieV2()) {
// 	                Cookies.set('microTool-' + microTool.config.toolName, null, { path: '/' });
// 	            } else {
// 	                $.cookie('microTool-' + microTool.config.toolName, null, { path: '/' });
// 	            }

// 	            return true;
// 	        }
// 	    },
// 	    checkRange: function (x, n, m) {
// 	        if (x >= n && x <= m) {
// 	            return x;
// 	        } else {
// 	            return !x;
// 	        }
// 	    },
// 	    openPanel: function (id, heightOverride) {
// 	        var height = heightOverride !== undefined ? heightOverride : 360;
// 	        var width = 650;
// 	        var winWidth = $(window).width();

// 	        if (winWidth < 400) {
// 	            width = 300;
// 	        }
// 	        else if (winWidth <= 650) {
// 	            width = winWidth - 50;
// 	        }

// 	        $("#" + id).modal({
// 	            minHeight: height,
// 	            close: true,
// 	            minWidth: width,
// 	            containerCss: {
// 	                border: 0,
// 	                height: height,
// 	                padding: 0,
// 	                width: width
// 	            },
// 	            overlayClose: true,
// 	            overlayCss: {
// 	                backgroundColor: "#333"
// 	            }
// 	        });
// 	    },
// 	    getQueryString: function (name) {
// 	        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
// 	        var regexS = "[\\?&]" + name + "=([^&#]*)";
// 	        var regex = new RegExp(regexS);
// 	        var results = regex.exec(window.location.href);
// 	        if (results == null)
// 	            return "";
// 	        else
// 	            return decodeURIComponent(results[1].replace(/\+/g, " "));
// 	    },
// 	    getValue: function (dbEntity) {
// 	        return microTool.values.inputs[dbEntity];
// 	    },
// 	    processRatingInput: function (ctrl, update) {
// 	        ctrl.parent().find('span').removeClass('ratingInputSelected')
// 	        ctrl.addClass('ratingInputSelected');

// 	        var ele = ctrl.parent().parent().find(".ratingInput");

// 	        if (update) {
// 	            if (microTool.page) {
// 	                if (microTool.page === 'inputs') {
// 	                    if (microTool.values.loadData[microTool.page](true) === true) {
// 	                        if (microTool.util.checkModelDriven()) {
// 	                            microTool.values.runModel(microTool.values.present[microTool.page], ele.attr('data-dbentity'), ctrl.text());
// 	                        }
// 	                    }
// 	                } else {
// 	                    if (microTool.values.loadData[microTool.page](true) === true) {
// 	                        //microTool.values.run(microTool.values.present[microTool.page]);
// 	                    }
// 	                }
// 	            }
// 	        }
// 	    },
// 	    processRegistrationSettings: function () {
// 	        if (microTool.config.registerForDeliverable && !microTool.values.registered) {
// 	            /*not registered*/
// 	            $('#microToolRegisterButton').show();
// 	            $('#microToolDownloadButton').hide();
// 	            $('#microToolEmailUserButton').hide();
// 	        }
// 	        else if (microTool.config.registerForDeliverable && microTool.values.registered) {
// 	            /*registered*/
// 	            $('#microToolRegisterButton').hide();
// 	            $('#microToolDownloadButton').show();
// 	            $('#microToolEmailUserButton').show();
// 	            $('#registerLink').hide();
// 	            $('#divMoreInformation').hide();

// 	            if (microTool.values.calc.SendEmailReport) {
// 	                microTool.analysis.save(microTool.analysis.email);
// 	            }

// 	            if (microTool.config.deliverablePrint) {
// 	                $('#microToolDownloadButton').html('Print Results');
// 	            }
// 	        }
// 	        else {
// 	            /*No Registration required*/
// 	            $('#microToolRegisterButton').hide();
// 	            $('#microToolDownloadButton').show();
// 	            $('#microToolEmailUserButton').show();
// 	            $('#registerLink').hide();
// 	            $('#divMoreInformation').hide();

// 	            if (microTool.config.deliverablePrint) {
// 	                $('#microToolDownloadButton').html('Print Results');
// 	            }
// 	        }
// 	    }
// 	};
// 	/*************************************************************************************************/
// 	// CHART Object
// 	// Desc: Contains the Google chart draw functions.
// 	/*************************************************************************************************/
// 	microTool.chart = {
// 	};

// 	microTool.currency = {};

// 	microTool.currency.getBrowserLocale = function () {
// 	    var str,
// 	        tempJson = { 'thousands': ',', 'decimal': '.' };


// 	    //console.log('Accepted:  ' + window.acceptedlanguages.accepted);
// 	    //console.log('Alternate: ' + window.acceptedlanguages.alternate);
// 	    //console.log('Relevant:  ' + window.acceptedlanguages.relevant);

// 	    var preferredLang = window.acceptedlanguages.accepted[0];

// 	    var num = 1000.1;
// 	    var forcedLocaleString = num.toLocaleString(preferredLang);

// 	    console.log('local string:  ' + forcedLocaleString);

// 	    var thousands = forcedLocaleString.substr(1, 1);

// 	    if (thousands == "0")
// 	    {
// 	        // in safari, the toLocaleString doesnt return a thousands separator.. so it will substr a "0" here...
// 	        // so in that case, just set it to a ","
// 	        thousands = ",";
// 	    }

// 	    var decimal = forcedLocaleString.substr(forcedLocaleString.length - 2, 1);

// 	    if (typeof (microTool.values.static) == 'undefined') {
// 	        microTool.values.static = {
// 	            separators: {
// 	                thousands: ',',
// 	                decimal: '.'
// 	            }
// 	        };
// 	    }

// 	    microTool.values.static.separators.thousands = thousands;
// 	    microTool.values.static.separators.decimal = decimal;
// 	};

// 	---------------------------------------------------------------------------------------------------------------------------------------------------------
// 	** Type: Function
// 	** Name: convertFromNativeNumberToEnUs
// 	** Description: this takes numbers that the user typed in to a text box, and converts them to US number format so they are ready to be sent back to the server side code
// 	**         all server side c# code and the xls model is in US format
// 	**--------------------------------------------------------------------------------------------------------------------------------------------------------- 
// 	microTool.currency.convertFromNativeNumberToEnUs = function (nStr, dataFormat, noThousandsSeparator /*should almost always be false*/) {

// 	    // setup the symbolArray..
// 	    var symbolArray = [];

// 	    if (dataFormat != null) {

// 	        currObj = microTool.CurrencyOptions[microTool.values.inputs.currency];

// 	        if (dataFormat == '1') {
// 	            symbolArray[0] = 'Numeric';
// 	        }
// 	        else if (dataFormat == '2') {
// 	            symbolArray[0] = '%';
// 	            symbolArray[1] = currObj.orientation;
// 	        }
// 	        else if (dataFormat == '3') {
// 	            symbolArray[0] = currObj.symbol;
// 	            symbolArray[1] = currObj.orientation;
// 	        }
// 	        else {
// 	            symbolArray = null;
// 	        }
// 	    }
// 	    else {
// 	        symbolArray = null;
// 	    }


// 	    //..............
// 	    /*!!!!!Only Process when its numeric or currency!!!!!*/
// 	    if (symbolArray != null && (symbolArray.length > 1 || (symbolArray.length == 1 && symbolArray[0] == 'Numeric'))) {
// 	        // make sure this is not null or empty string... some ddl's could be null
// 	        if (!nStr || nStr.length === 0)
// 	            return nStr;

// 	        // trim any blank space around the string
// 	        nStr = nStr.trim();

// 	        // strip out the symbols and see if this is really a number..
// 	        unformatted_val = accounting.unformat(nStr);

// 	        // if the unformat command is performed on a non-number, it will return 0
// 	        // but if performed on a string like "0.0" it will also return zero, and this is actually a string we want to convert..
// 	        // so below that is what the following is doing: (unformatted_val != 0 || nStr == "0.0") &&
// 	        var nStrNoSymbol = nStr.replace(symbolArray[0], ""); // for the case of a currency symbol that contains a alpha char, we need to strip it.. to actually see if this is a alpha string of text

// 	        if (nStrNoSymbol.match(/[a-zA-Z]/i)) {
// 	            has_alpha = true;
// 	        }
// 	        else {
// 	            has_alpha = false;
// 	        }

// 	        // these are from the CurrentCulture of the server
// 	        //microTool.values.static.separators.thousands
// 	        //microTool.values.static.separators.decimal

// 	        // only modify numbers...
// 	        if ($.isNumeric(unformatted_val) &&
// 	            (unformatted_val != 0 || nStr == ("0" + microTool.values.static.separators.decimal + "0") || nStr == ("0" + microTool.values.static.separators.decimal + "00") || nStr == ("0" + microTool.values.static.separators.decimal + "000") || nStr == ("0" + microTool.values.static.separators.decimal + "0000")) &&
// 	            (has_alpha == false)
// 	            ) {

// 	            // only one situation is when we want to use noThousandsSeparator == true
// 	            // it is in AutoSymbolInsertion where we execute this function before trying the resulting number on:
// 	            //   if (!$.isNumeric(rawUSD)) {
// 	            //     jAlert('This input requires a numeric value, please update value.', 'Input Value Error');
// 	            if (noThousandsSeparator) {
// 	                thousandsSeparator = '';
// 	            }
// 	            else {
// 	                thousandsSeparator = ',';
// 	            }

// 	            if (symbolArray != null && symbolArray.length > 1) {
// 	                // this has a currency symbol
// 	                symbol = symbolArray[0]; // symbol
// 	                orientation = symbolArray[1]; // left or right of the number

// 	                // any symbol other than a percent sign is a currency symbol
// 	                if (symbol == '%') {
// 	                    //orientation = "Right";
// 	                    isMoney = false;
// 	                }
// 	                else {
// 	                    isMoney = true;
// 	                }

// 	            } else {
// 	                isMoney = false;
// 	            }

// 	            // figure out precision of this number
// 	            // split the number(string) into an array of substrings representing to the left and right of the decimal separator
// 	            // if the length of the resulting array from the split is greater than one, then we have something to the right of the decimal point..
// 	            x = nStr.split(microTool.values.static.separators.decimal);
// 	            if (x.length > 1) {
// 	                x[1] = x[1].replace('%', '');
// 	            }
// 	            cents = x.length > 1 ? x[1] : ''; // create a string like  "55" ..ie. to the right of the decimal
// 	            precision = cents.length;

// 	            // get a raw value..ie USD but with no thousands separator and/or no decimals if there is no decimals in the number
// 	            nStr_raw = accounting.unformat(nStr, microTool.values.static.separators.decimal /*decimal*/);

// 	            if (isMoney) {
// 	                nStr = accounting.formatMoney(nStr_raw, symbol, precision /*precision*/, thousandsSeparator /*thousands*/, "." /*decimal*/);
// 	            }
// 	            else {
// 	                nStr = accounting.formatNumber(nStr_raw, precision /*precision*/, thousandsSeparator /*thousands*/, "." /*decimal*/);
// 	            }

// 	            // now deal with the percentage use case..
// 	            // if the symbol is a percent sign, it was stripped off with unformat... put it back on in the proper orientation.
// 	            if (symbolArray != null && symbolArray.length > 1) {
// 	                if (symbol == '%') {
// 	                    return nStr + '%';

// 	                    //if (orientation == 'Left') {
// 	                    //    return '%' + nStr;
// 	                    //}
// 	                    //else if (orientation == 'Right') {
// 	                    //
// 	                    //}
// 	                }
// 	                else {
// 	                    // strip out the symbol.
// 	                    // the model will puke if you send in the symbol for certain currencies, such as Brazil
// 	                    nStr = nStr.replace(symbol, "");
// 	                }
// 	            }
// 	        }
// 	    }

// 	    return nStr;
// 	};

// 	/*---------------------------------------------------------------------------------------------------------------------------------------------------------
// 	** Type: Function
// 	** Name: convertToNativeNumberFromEnUs
// 	** Description: this function simply takes a "native" number format(what the users browser has set as a language) that we capture upon login with the CurrentCulture
// 	**      and converts it to en-US format..
// 	**      this is needed because all backend/server side code is in en-US format so that the xls Models will function as is
// 	**--------------------------------------------------------------------------------------------------------------------------------------------------------- */
// 	microTool.currency.convertToNativeNumberFromEnUs = function (nStr, dataFormat) {

// 	    // setup the symbolArray..
// 	    var symbolArray = [];

// 	    if (dataFormat != null) {

// 	        currObj = microTool.CurrencyOptions[microTool.values.inputs.currency];

// 	        if (dataFormat == '1') {
// 	            symbolArray[0] = 'Numeric';
// 	        }
// 	        else if (dataFormat == '2') {
// 	            symbolArray[0] = '%';
// 	            symbolArray[1] = currObj.orientation;
// 	        }
// 	        else if (dataFormat == '3') {
// 	            symbolArray[0] = currObj.symbol;
// 	            symbolArray[1] = currObj.orientation;
// 	        }
// 	        else {
// 	            symbolArray = null;
// 	        }
// 	    }
// 	    else {
// 	        symbolArray = null;
// 	    }


// 	    /*!!!!!Only Process when its numeric or currency!!!!!*/
// 	    if (symbolArray != null && (symbolArray.length > 1 || (symbolArray.length == 1 && symbolArray[0] == 'Numeric'))) {
// 	        /*Make sure its a string!*/
// 	        nStr = String(nStr);

// 	        // make sure this is not null or empty string... some ddl's could be null
// 	        if (!nStr || nStr.length === 0)
// 	            return nStr;

// 	        // trim any blank space around the string
// 	        nStr = nStr.trim();

// 	        // strip out the symbols and see if this is really a number..
// 	        unformatted_val = accounting.unformat(nStr);

// 	        // look for alpha chars
// 	        if (nStr.match(/[a-zA-Z]/i)) {
// 	            has_alpha = true;
// 	        }
// 	        else {
// 	            has_alpha = false;
// 	        }

// 	        // if the unformat command is performed on a non-number, it will return 0
// 	        // but if performed on a string like "0.0" it will also return zero, and this is actually a string we want to convert..
// 	        // so below that is what the following is doing: (unformatted_val != 0 || nStr == "0.0") &&

// 	        // only modify numbers...
// 	        if ($.isNumeric(unformatted_val) &&
// 	            (unformatted_val != 0 || nStr == "0.0" || nStr == "0.00" || nStr == "0.000" || nStr == "0.0000") &&
// 	            has_alpha == false) {

// 	            if (symbolArray != null && symbolArray.length > 1) {
// 	                // this has a currency symbol
// 	                symbol = symbolArray[0]; // symbol
// 	                orientation = symbolArray[1]; // left or right of the number

// 	                if (orientation == 'Left') {
// 	                    symbolOrientation = "%s%v";
// 	                }
// 	                else if (orientation == 'Right') {
// 	                    symbolOrientation = "%v%s";
// 	                }
// 	                else {
// 	                    symbolOrientation = "%s%v";
// 	                }

// 	                // any symbol other than a percent sign is a currency symbol
// 	                if (symbol == '%') {
// 	                    isMoney = false;
// 	                }
// 	                else {
// 	                    isMoney = true;
// 	                }
// 	            }
// 	            else {
// 	                isMoney = false;
// 	            }

// 	            // figure out precision of this number
// 	            // split the number(string) into an array of substrings representing to the left and right of the decimal separator
// 	            // if the length of the resulting array from the split is greater than one, then we have something to the right of the decimal point..
// 	            x = nStr.split('.');
// 	            if (x.length > 1) {
// 	                x[1] = x[1].replace('%', '');
// 	            }
// 	            cents = x.length > 1 ? x[1] : ''; // create a string like  "55" ..ie. to the right of the decimal
// 	            precision = cents.length;

// 	            // get a raw value..ie USD but with no thousands separator and/or no decimals if there is no decimals in the number
// 	            nStr_raw = accounting.unformat(nStr, "." /*decimal*/);

// 	            if (isMoney) {
// 	                nStr = accounting.formatMoney(nStr_raw, symbol, precision /*precision*/, microTool.values.static.separators.thousands /*thousands*/, microTool.values.static.separators.decimal /*decimal*/, symbolOrientation/*symbol orientation*/);
// 	            }
// 	            else {
// 	                nStr = accounting.formatNumber(nStr_raw, precision /*precision*/, microTool.values.static.separators.thousands /*thousands*/, microTool.values.static.separators.decimal /*decimal*/);
// 	            }

// 	            // now deal with the percentage use case..
// 	            // if the symbol is a percent sign, it was stripped off with unformat... put it back on in the proper orientation.
// 	            if (symbolArray != null && symbolArray.length > 1) {
// 	                if (symbol == '%') {
// 	                    /*
// 	                    if (orientation == 'Left') {
// 	                        return '%' + nStr;
// 	                    }
// 	                    else if (orientation == 'Right') {
// 	                        return nStr + '%';
// 	                    }
// 	                    */
// 	                    return nStr + '%';
// 	                }
// 	            }
// 	        }
// 	    }

// 	    return nStr;
// 	};

// 	/*---------------------------------------------------------------------------------------------------------------------------------------------------------
// 	** Type: Function
// 	** Name: convertToNativeNumberFromEnUs
// 	** Description: this is a aggregate function that rolls through all inputs on the page; this is for display purposes.. it runs on doc ready
// 	**---------------------------------------------------------------------------------------------------------------------------------------------------------
// 	** Change Type: <BUG>
// 	** Date: 2/26/2015
// 	** Name: SalireDev_Scott
// 	** ChangeLog: if there is a thousands or decimal separator in a DDL, and the browser is set to a language other than en-US, then things will be hosed..
// 	**     this code should eleviate that by converting the value to us before saving, and to the native format when displaying
// 	**--------------------------------------------------------------------------------------------------------------------------------------------------------- */
// 	microTool.currency.convertAllToNativeNumberFromEnUs = function () {


// 	    /*Loop all textboxes and find currency inputs*/
// 	    $('.microToolInput').each(function () {

// 	        var allData = $(this).data();

// 	        if ($(this).is('input:text')) { //if (allData.controltype == 'tbx') {
// 	            var tbx = $(this);
// 	            //var symbolArray = allData.symbol.split(':');

// 	            // numeric, percent, or currency?
// 	            if ((allData.format == '1') || (allData.format == '2') || (allData.format == '3')) {
// 	                // this has a currency sybmol ...ie its money
// 	                nativeValue = microTool.currency.convertToNativeNumberFromEnUs(tbx.val(), allData.format);
// 	                tbx.val(nativeValue);
// 	            }
// 	        }
// 	        else if ($(this).is('select')) {
// 	            var ddl = $(this);
// 	            //ddlNative = microTool.currency.convertToDDLNativeNumberFromEnUs(ddl);
// 	            //ddl = ddlNative;
// 	        }
// 	    });

// 	};

// 	microTool.analysis = {
// 	    save: function (func) {
// 	        var dataObj = microTool.documents.word.createJson(),
// 				serverPath = microTool.util.determineUrl() + '/api.aspx/SaveUserAnalysis';
// 	        $.ajax({
// 	            url: serverPath,
// 	            type: 'POST',
// 	            data: '{ "jsonStr": ' + JSON.stringify(dataObj) + '}',
// 	            dataType: 'json',
// 	            cache: false,
// 	            async: false,
// 	            contentType: 'application/json; charset=utf-8',
// 	            success: jQuery.proxy(function (data) {
// 	                microTool.documents.word.microToolReport.userAnalysisId = data.d;

// 	                // set the direct link in the register form
// 	                var directUrl = (microTool.util.determineUrl() + "/default.aspx?atid=" + microTool.config.analysisId + "&c=" + microTool.documents.word.microToolReport.userAnalysisId + "&t=" + microTool.config.brand);
// 	                var directUrlClean = directUrl;

// 	                if ((typeof (microTool.config.directUrlRemoveDomain) != 'undefined' || microTool.config.directUrlRemoveDomain != null) && microTool.config.directUrlRemoveDomain == true) {
// 	                    directUrlClean = directUrl.replace(microTool.util.determineUrl() + '/default.aspx', '');
// 	                }

// 	                /*Set ctrl Directly with clean url, this will pass to lead gen if applicable*/
// 	                var $urlCtrl = $('.MicroToolUrl');
// 	                $urlCtrl.val(directUrlClean);
// 	                $urlCtrl.trigger("blur");

// 	                /*Set object with full url this should save to db*/
// 	                microTool.values.inputs[$urlCtrl.attr('data-dbentity')] = directUrl;

// 	                microTool.util.cookie.set();

// 	                //call function after calc if exists:
// 	                if (microTool.util.isFunction(func)) {
// 	                    func();
// 	                }
// 	            }, func),
// 	            error: function (xhr, ajaxOptions, thrownError) {
// 	                if (console) {
// 	                    console.log('Save analysis error.');
// 	                }
// 	            }
// 	        });
// 	    },
// 	    generateDeliverable: function () {
// 	        var timestamp = new Date().getTime();

// 	        var url = microTool.util.determineUrl() + '/api.aspx?' + $.param({
// 	            'jsonWordBit': 'true',
// 	            'userAnalysisId': microTool.documents.word.microToolReport.userAnalysisId,
// 	            'analysisId': microTool.config.analysisId,
// 	            'advisorInfo': microTool.config.brand,
// 	            'pdf': (microTool.util.checkIos(false) || microTool.config.deliverablePdf) ? 'true' : 'false',
// 	            'toolName': microTool.config.toolName,
// 	            'time': timestamp,
// 	            'proddb': microTool.config.productionDB,
// 	            'ftpuri': microTool.config.ftpuri,
// 	            'serviceId': microTool.config.serviceId,
// 	            'uniqueId': microTool.values.calc.uniqueId,
// 	            'suppressPdfOutputToBrowser': 'true'
// 	        });

// 	        $.ajax({
// 	            url: url,
// 	            type: "POST",
// 	            dataType: "json",
// 	            cache: false,
// 	            contentType: "application/json; charset=utf-8",
// 	            success: function (data) {
// 	            },
// 	            error: function (xhr, textStatus, errorThrown) {
// 	                var temperror = '';
// 	            }
// 	        });
// 	    },
// 	    download: function () {
// 	        var timestamp = new Date().getTime();
// 	        var url = microTool.util.determineUrl() + '/api.aspx?' + $.param({
// 	            'jsonWordBit': 'true',
// 	            'userAnalysisId': microTool.documents.word.microToolReport.userAnalysisId,
// 	            'analysisId': microTool.config.analysisId,
// 	            'advisorInfo': microTool.config.brand,
// 	            'proddb': microTool.config.productionDB,
// 	            'registered': microTool.values.registered,
// 	            'pdf': (microTool.util.checkIos(false) || microTool.config.deliverablePdf) ? 'true' : 'false',
// 	            'time': timestamp,
// 	            'ftpuri': microTool.config.ftpuri,
// 	            //'customerAnalysisName': $('[data-dbentity="email"]').val(),
// 	            'serviceId': microTool.config.serviceId,
// 	            'uniqueId': microTool.values.calc.uniqueId,
// 	            'toolName': microTool.config.toolName
// 	        });

// 	        if (microTool.util.checkIos(false)) {
// 	            //$('#downloadLnk').prop("href", url);
// 	            //microTool.util.simulateClick('downloadLnk');
// 	            window.location.href = url;
// 	        }
// 	        else {
// 	            $('body').append('<iframe style="display:none" id="iframeDownload"></iframe>')
// 	            .children('#iframeDownload')
// 	            .attr('src', url
// 	            );

// 	            setTimeout(function () {
// 	                $('#iframeDownload').remove();
// 	            }, 5000);
// 	        }
// 	    },
// 	    email: function (email, emailBody, openpanel, includeAttachment) {
// 	        if (openpanel) {
// 	            $('#emailSentTo').text(microTool.values.calc.Email);
// 	            microTool.util.openPanel('pnlEmailSend');
// 	        }

// 	        var timestamp = new Date().getTime();
// 	        var url = microTool.util.determineUrl() + '/api.aspx?' + $.param({
// 	            'pdf': (microTool.util.checkIos(false) || microTool.config.deliverablePdf) ? 'true' : 'false',
// 	            'toolName': microTool.config.toolName,
// 	            'jsonWordBit': 'true',
// 	            'proddb': microTool.config.productionDB,
// 	            'userAnalysisId': microTool.documents.word.microToolReport.userAnalysisId,
// 	            'analysisId': microTool.config.analysisId,
// 	            'advisorInfo': microTool.config.brand,
// 	            'time': timestamp,
// 	            'email': email,
// 	            'includeAttachment': includeAttachment,
// 	            'emailBody': emailBody,
// 	            'registered': microTool.values.registered,
// 	            'ftpuri': microTool.config.ftpuri,
// 	            'serviceId': microTool.config.serviceId,
// 	            'uniqueId': microTool.values.calc.uniqueId
// 	        });

// 	        $.ajax({
// 	            url: url,
// 	            type: "POST",
// 	            dataType: "json",
// 	            async: true,
// 	            cache: false,
// 	            contentType: "application/json; charset=utf-8",
// 	            success: function (data) {
// 	                var tempsuccess = data.d;
// 	            },
// 	            error: function (xhr, textStatus, errorThrown) {
// 	                var temperror = '';
// 	            }
// 	        });
// 	    }
// 	};

// 	/*************************************************************************************************/
// 	// VALUES Object
// 	// Desc: Contains the financial tools data, calculated data, results manipulation and the functions to produce the data.
// 	/*************************************************************************************************/
// 	microTool.values = {
// 	    loadData: {
// 	        inputFormats: function () {
// 	            $('.regInput').each(function () {
// 	                var $ele = $(this);
// 	                var format = $ele.data('format');

// 	                if (typeof (format) == 'undefined') {
// 	                    if (microTool.values.inputFormats[id] != undefined) {
// 	                        format = microTool.values.inputFormats[id];
// 	                    }
// 	                    else {
// 	                        format = '1';
// 	                    }
// 	                }

// 	                microTool.values.inputFormats[$ele.attr('data-dbentity')] = format;
// 	            });
// 	        },
// 	        inputs: function (UpdateData) {
// 	            var p = microTool.values.inputs,
// 	                key;

// 	            if (UpdateData) {
// 	                /*Grab latest input Data*/
// 	                $('.regInput').each(function () {
// 	                    var $ele = $(this)
// 	                    var id = $ele.data('dbentity');
// 	                    var format = $ele.data('format')

// 	                    if (typeof (format) == 'undefined') {
// 	                        if (microTool.values.inputFormats[id] != undefined) {
// 	                            format = microTool.values.inputFormats[id];
// 	                        }
// 	                        else {
// 	                            format = '1';
// 	                        }
// 	                    }
// 	                    else if (typeof (microTool.values.inputFormats[id]) == 'undefined') {
// 	                        microTool.values.inputFormats[id] = format;
// 	                    }

// 	                    if ($ele.val() != '') {
// 	                        if ($ele.is("label")) {
// 	                            microTool.values.inputs[$ele.attr('data-dbentity')] = microTool.util.stripNumber($ele.text()); /*strips symbol and divides percentages*/
// 	                        }
// 	                        else if ($ele.is("select")) {
// 	                            var val = microTool.util.stripNumber($ele.val());
// 	                            if (isNaN(val) || format == 7) {
// 	                                microTool.values.inputs[$ele.attr('data-dbentity')] = $ele.val();
// 	                            }
// 	                            else {
// 	                                microTool.values.inputs[$ele.attr('data-dbentity')] = val;
// 	                            }
// 	                        }
// 	                        else {
// 	                            if ($ele.val().indexOf('%') !== -1) {
// 	                                // set to format = 2 for percentage..
// 	                                microTool.values.inputFormats[$ele.attr('data-dbentity')] = '2';//
// 	                            }

// 	                            var val = microTool.util.stripNumber($ele.val(), microTool.values.inputFormats[$ele.attr('data-dbentity')]); /*strips symbol and divides percentages*/
// 	                            if (isNaN(val) || format == 7) {
// 	                                microTool.values.inputs[$ele.attr('data-dbentity')] = $ele.val();
// 	                            }
// 	                            else {
// 	                                microTool.values.inputs[$ele.attr('data-dbentity')] = val;
// 	                            }
// 	                        }
// 	                    }
// 	                });

// 	                $('.radioInput').each(function () {
// 	                    var $ele = $(this)

// 	                    if ($ele.is(':radio')) {
// 	                        if ($ele.is(':checked')) {
// 	                            microTool.values.inputs[$ele.attr('data-dbentity')] = parseInt($ele.val());

// 	                            /*Check For label*/
// 	                            var label = $("label[for='" + $ele.attr('id') + "']");

// 	                            if (label.length > 0) {
// 	                                microTool.values.inputs[$ele.attr('data-dbentity') + '_Text'] = label.text();
// 	                            }
// 	                        }
// 	                    }
// 	                });

// 	                $('.checkboxInput').each(function () {
// 	                    var $ele = $(this);
// 	                    var id = $ele.attr('data-dbentity')

// 	                    if ($ele.is(':checked')) {
// 	                        microTool.values.inputs[id] = 'on';
// 	                    }
// 	                    else {
// 	                        microTool.values.inputs[id] = '';
// 	                    }
// 	                });

// 	                $('.ratingInput').each(function () {
// 	                    var $ele = $(this);
// 	                    var id = $ele.data('dbentity'),
// 							selected = $ele.parent().find(".ratingInputSelected");

// 	                    if (selected.length) {
// 	                        microTool.values.inputs[id] = parseInt(selected.text());
// 	                    }
// 	                    else {
// 	                        microTool.values.inputs[id] = 0;
// 	                    }
// 	                });

// 	                microTool.util.cookie.set();
// 	            }
// 	            else {
// 	                // first do the currency so we dont double process values
// 	                curctrl = $('[data-dbentity="varCurrency"]');
// 	                curctrl.val(microTool.values.inputs['varCurrency']);
// 	                curctrl.trigger('change'); // this triggers the conversion on all inputs.. so we do it first so that when we insert the already convered values from the cookie they dont get double converted.
// 	                //changeCurrencyList(curctrl); // this is normans function to initialize the currency symbol in all the inputs. otherwise resetting from the cookie on a Euro currency will still have $ symbols in the inputs!

// 	                /*Set Input Answers*/
// 	                for (key in p) {
// 	                    if (p.hasOwnProperty(key)) {
// 	                        var id = key;
// 	                        var ctrl = $('[data-dbentity="' + id + '"]');
// 	                        var format = ctrl.data('format') + '';
// 	                        var roundTo = ctrl.data('roundto');

// 	                        if (format == 'undefined') {
// 	                            if (microTool.values.inputFormats[id] != undefined) {
// 	                                format = microTool.values.inputFormats[id];
// 	                            }
// 	                            else {
// 	                                format = '1';
// 	                            }
// 	                        }

// 	                        if (roundTo == undefined) {
// 	                            roundTo = 0;
// 	                        }

// 	                        // if this is a percentage, then make it have one decimal point
// 	                        if (format == '2') {
// 	                            roundTo = 1;
// 	                        }

// 	                        var currencySelection = '';

// 	                        if (ctrl.length > 0) {
// 	                            if (typeof (ctrl) == undefined) {
// 	                                if (ctrl.is("label")) {
// 	                                }
// 	                                else if (ctrl.is(':radio')) {
// 	                                }
// 	                                else if (ctrl.is("select")) {
// 	                                    ctrl.val(microTool.values.inputs[id]);
// 	                                    ctrl.trigger('blur');
// 	                                    ctrl.trigger('change');
// 	                                }
// 	                                else {
// 	                                    ctrl.val(microTool.util.formatDataType(format, microTool.values.inputs[id], roundTo));
// 	                                    ctrl.trigger('blur');
// 	                                }
// 	                            } else {
// 	                                if (ctrl.hasClass('regInput')) {
// 	                                    if (ctrl.is("select")) {
// 	                                        ctrl.val(microTool.values.inputs[id]);
// 	                                        ctrl.trigger('blur');
// 	                                        ctrl.trigger('change');
// 	                                    }
// 	                                    else {
// 	                                        var val = microTool.util.formatDataType(format, microTool.values.inputs[id], roundTo);

// 	                                        if (isNaN(val)) {
// 	                                            if (format == '2') {
// 	                                                ctrl.val(val);
// 	                                            }
// 	                                            else {
// 	                                                ctrl.val(microTool.values.inputs[id]);
// 	                                            }
// 	                                        }
// 	                                        else {
// 	                                            ctrl.val(val);
// 	                                        }

// 	                                        ctrl.trigger('blur');
// 	                                    }
// 	                                    /*
// 	                                    if (ctrl.data('format') == 2 || ctrl.hasClass('percent')) {
// 	                                        var updatedPercentVal = parseFloat(microTool.values.inputs[id] * 100).toFixed(2);
// 	                                        ctrl.val(updatedPercentVal);
// 	                                    }
// 	                                    else {
// 	                                        ctrl.val(microTool.values.inputs[id]);
// 	                                    }
// 	                                    ctrl.trigger('blur');
// 	                                    */
// 	                                }
// 	                                else if (ctrl.hasClass('radioInput')) {
// 	                                    var $radio = ctrl.filter('[value=' + microTool.values.inputs[id] + ']');

// 	                                    $radio.prop('checked', true);
// 	                                    $radio.change();
// 	                                }
// 	                                else if (ctrl.hasClass('checkboxInput')) {
// 	                                    var userValue = microTool.values.inputs[id]
// 	                                    if (userValue != '') {
// 	                                        ctrl.prop('checked', true).val(userValue);
// 	                                        ctrl.next().find('span.checkbox-span').css({ color: '#2C94DC' });
// 	                                    }
// 	                                    else {
// 	                                        ctrl.prop('checked', false).val(userValue);
// 	                                    }

// 	                                    ctrl.trigger('change');
// 	                                }
// 	                                else if (ctrl.hasClass('bcalc')) {
// 	                                    ctrl.val(microTool.util.formatDataType(format, microTool.values.inputs[id], roundTo));
// 	                                    ctrl.trigger('blur');
// 	                                }
// 	                                else {
// 	                                    /*rating*/
// 	                                    var userValue = microTool.values.inputs[id];
// 	                                    var nextSelected = $(":contains('" + userValue + "')", ctrl.parent())[1];

// 	                                    if (nextSelected !== undefined) {
// 	                                        microTool.util.processRatingInput($(nextSelected), false);
// 	                                    }
// 	                                }
// 	                            }
// 	                        }
// 	                    }
// 	                }
// 	            }

// 	            return true;
// 	        },
// 	        results: function () {
// 	            return true;
// 	        }
// 	    },
// 	    present: {
// 	        inputs: function () {
// 	            var toolData = microTool.values.calc.ToolData,
// 					i = 0,
// 					formatResult = microTool.values.present.formatResult;
// 	        },
// 	        results: function () {
// 	        },
// 	        formatResult: function (itemObj, dType) {
// 	            var result = '';
// 	            switch (dType) {
// 	                case 'hours':
// 	                    if (itemObj >= 1000) {
// 	                        result = microTool.util.commaFormatted(itemObj, true) + ' hours';
// 	                    } else if (itemObj < 1) {
// 	                        result = microTool.util.commaFormatted(Math.round(itemObj * 60), true) + ' minutes';
// 	                    } else {
// 	                        result = Math.round(microTool.values.calc.results[item][item2]) + ' hours';
// 	                    }
// 	                    break;
// 	                case 'hoursBase':
// 	                    result = microTool.util.commaFormatted(Math.round(itemObj), true) + ' hours';
// 	                    break;
// 	                case 'times':
// 	                    result = microTool.util.commaFormatted(Math.round(itemObj), true) + ' times';
// 	                    break;
// 	                case 'number':
// 	                    result = microTool.util.commaFormatted(Math.round(itemObj), true);
// 	                    break;
// 	                case 'percent':
// 	                    result = parseFloat(itemObj * 100).toFixed(2) + '%';
// 	                    //Math.round((itemObj * 100)) + ' %';
// 	                    break;
// 	                case 'minutes':
// 	                    result = microTool.util.commaFormatted(Math.round(itemObj * 60), true) + ' minutes';
// 	                    break;
// 	                case 'days':
// 	                    result = microTool.util.commaFormatted(Math.round(itemObj * 30), true) + ' days';
// 	                    break;
// 	                case 'daysBase':
// 	                    result = microTool.util.commaFormatted(Math.round(itemObj), true) + ' days';
// 	                    break;
// 	                case 'monetary':
// 	                    if (itemObj.toString().indexOf && itemObj.toString().indexOf('-') === -1) {
// 	                        result = microTool.util.commaFormatted(Math.round(itemObj));
// 	                    } else if (itemObj.toString().replace) {
// 	                        result = '(' + microTool.util.commaFormatted(Math.round(itemObj.toString().replace('-', ''))) + ')';
// 	                    } else {
// 	                        result = microTool.util.commaFormatted(Math.round(itemObj));
// 	                    }
// 	                    break;
// 	                default:
// 	                    result = microTool.util.commaFormatted(itemObj);
// 	                    break;
// 	            }

// 	            return result;
// 	        }
// 	    },
// 	    runModel: function (func, changedInput, changedInputAnswerText, bSkipRecalc) { //assumes all input is loaded into objects (default data is used if not):
// 	        /*Now pull input values into list*/
// 	        var inputs = microTool.values.inputs,
// 				statics = microTool.values['static'],
// 				toolData = microTool.values.calc.ToolData,
// 				baseline = microTool.values.calc.baseline,
// 				rain = microTool.values.calc.rain,
// 				results = microTool.values.calc.results,
// 				bBlockAfterInput = false;

// 	        if ((typeof (microTool.config.blockOnInputChage) != 'undefined' || microTool.config.blockOnInputChage != null) && microTool.config.blockOnInputChage == true) {
// 	            bBlockAfterInput = true;
// 	        }

// 	        // changedInputAnswerText is the input text.. it is in native format, so switch it to USD to get read to map to the model.
// 	        // it is only mapped to the model if the input that was changed is a parent..otherwise we map in the unformattedData one at a time from the json data that is already in USD format

// 	        // send the inputs to the model for recalculation...
// 	        var dataObj = microTool.documents.word.createJson(), // if we split out the inputs in
// 	           serverPath = microTool.util.determineUrl() + '/api.aspx/RecalculateMicrotoolModel';

// 	        if (typeof (bSkipRecalc) == 'undefined' || bSkipRecalc == null || bSkipRecalc == false) {
// 	            $.ajax({
// 	                url: serverPath,
// 	                type: 'POST',
// 	                data: '{ "jsonStr": ' + JSON.stringify(dataObj) + ', "changedInputNamedRange": ' + JSON.stringify(changedInput) + ', "changedInputAnswerText": ' + JSON.stringify(changedInputAnswerText) + '}',
// 	                dataType: 'json',
// 	                cache: false,
// 	                async: true,
// 	                contentType: 'application/json; charset=utf-8',
// 	                beforeSend: function () {
// 	                    if (bBlockAfterInput) {
// 	                        $.blockUI({
// 	                            message: microTool.config.blockMessage,
// 	                            baseZ: 2000
// 	                        });
// 	                    }
// 	                },
// 	                complete: function () {
// 	                    if (bBlockAfterInput) {
// 	                        $.unblockUI();
// 	                    }
// 	                },
// 	                success: $.proxy(function (data) {
// 	                    //.......................................................
// 	                    // we sent the inputs in.. now map the inputs and outputs to our object for display in the microtool
// 	                    //...............
// 	                    var inputsAndOutputs = "";

// 	                    try {
// 	                        inputsAndOutputs = JSON.parse(data.d);
// 	                    }
// 	                    catch (e) {
// 	                        if (console) {
// 	                            console.log('Recalculate model error:' + e + " Returned from server: " + data.d);
// 	                        }
// 	                    }

// 	                    if ((typeof inputsAndOutputs !== "undefined") && ((inputsAndOutputs !== ""))) {
// 	                        /*Email*/
// 	                        microTool.values.calc.Email = inputs['customerEmail'];

// 	                        // name
// 	                        microTool.config.customerAnalysisName = inputs['customerName'];
// 	                        microTool.documents.word.microToolReport.customerAnalysisName = microTool.config.customerAnalysisName;

// 	                        // roll through all the output vars, and update them with values from the model
// 	                        microTool.util.updateFrontendFromModel(inputsAndOutputs);
// 	                    }

// 	                    //call function after calc if exists:
// 	                    if (microTool.util.isFunction(this)) {
// 	                        this();
// 	                    }

// 	                }, func),
// 	                error: function (xhr, ajaxOptions, thrownError) {
// 	                    if (console) {
// 	                        console.log('Recalculate model error.');
// 	                    }
// 	                }
// 	            });
// 	        }
// 	        else {
// 	            // roll through all the output vars, and update them with values from the model
// 	            var inputsAndOutputs = "";

// 	            try {
// 	                inputsAndOutputs = JSON.parse(dataObj);
// 	            }
// 	            catch (e) {
// 	            }

// 	            if ((typeof inputsAndOutputs !== "undefined") && ((inputsAndOutputs !== ""))) {
// 	                microTool.util.updateFrontendFromModel(inputsAndOutputs);
// 	            }
// 	        }

// 	        microTool.documents.word.microToolReport.registered = microTool.values.registered;
// 	    },
// 	    run: function (func) { //assumes all input is loaded into objects (default data is used if not):
// 	        /*Now pull input values into list*/
// 	        var inputs = microTool.values.inputs,
// 				toolData = microTool.values.calc.ToolData;

// 	        //call function after calc if exists:
// 	        if (microTool.util.isFunction(func)) {
// 	            func();
// 	        }
// 	    },
// 	    'inputs': {
// 	    },
// 	    'inputFormats': {
// 	        'firstName': '7',
// 	        'FirstName': '7',
// 	        'lastName': '7',
// 	        'LastName': '7',
// 	        'jobTitle': '7',
// 	        'JobTitle': '7',
// 	        'company': '7',
// 	        'Company': '7',
// 	        'email': '7',
// 	        'Email': '7',
// 	        'phone': '7',
// 	        'Phone': '7',
// 	        'country': '7',
// 	        'Country': '7',
// 	        'state': '7',
// 	        'State': '7',
// 	        'varExchangeRate': '1',
// 	        'varCurrencySymbol': '4'
// 	    },
// 	    'registered': false,
// 	    'calc': {
// 	        'Email': '',
// 	        'ToolData': {},
// 	        'Country': 1,
// 	        'ExchangeRate': 1,
// 	        'SendEmailReport': false,
// 	        'Email': '',
// 	        'uniqueId': '',
// 	        'XMLSent': ''
// 	    },
// 	    'static': {
// 	        separators: {
// 	            decimal: '.',
// 	            thousands: ','
// 	        }
// 	    },
// 	    currentSlide: ''
// 	};

// 	microTool.tooltip = {
// 	    load: function (ele) {
// 	        var $ele = $(ele);
// 	        if ($ele.data('info') !== "") {
// 	            $ele.append(
// 					$('<div />',
// 						{ 'class': 'infoIconToolTip' }
// 					)
// 						.append($('<div />',
// 							{ 'class': 'arrowLeft' }
// 						))
// 						.append(
// 							$ele.data('info')
// 						)
// 				);
// 	        }
// 	    }
// 	};

// 	// removed word object..
// 	microTool.documents.word.createJson = function () {
// 	    var jsonStr = '';
// 	    microTool.documents.word.loadData();

// 	    jsonStr = JSON.stringify(microTool.documents.word.microToolReport);

// 	    return jsonStr;
// 	};

// 	microTool.documents.word.loadData = function () {
// 	    var text = microTool.documents.word.microToolReport.content.text,
// 	        toolData = microTool.values.calc.ToolData,
// 	        inputs = microTool.values.inputs,
// 	        formatResult = microTool.values.present.formatResult;

// 	    //........................................
// 	    // find the index of the currently selected currency in the dropdown
// 	    var currencyIndex = 1; // default to US Dollar

// 	    // is there a currency dropdown in this tool?
// 	    if ($('[data-dbentity=varCurrency]').val() !== undefined) {
// 	        // the the value of the currency dropdown
// 	        var clientDisplayName = $('[data-dbentity=varCurrency]').val(); // "US Dollar", "Euro", "UK Pound"

// 	        // roll through the currency options object, and look for this display name
// 	        for (var i = 0; i < Object.keys(microTool.CurrencyOptions).length; i++) {
// 	            // there is no index for 0 or 3 in the currency options object.. make sure it exists first
// 	            var obj = microTool.CurrencyOptions[i];
// 	            if (obj !== undefined) {
// 	                // make sure the clientDisplayName key exists
// 	                if (obj["clientDisplayName"] !== undefined) {
// 	                    // is this the clientDisplayName that is selected in the dropdown?
// 	                    if (obj["clientDisplayName"] == clientDisplayName) {
// 	                        // save the index of this currency, so we can send its format into XLS
// 	                        currencyIndex = i;
// 	                        break; // found it.. break out of the for loop
// 	                    }
// 	                }
// 	            }
// 	        }
// 	    }

// 	    //.............................................................
// 	    //Load data into text object, both microtool input and output
// 	    for (var i = 0; i < Object.keys(text).length; i += 1) {
// 	        var id = text[i].bookmark[0];
// 	        var answer = inputs[id];

// 	        var ctrl = $('[data-dbentity="' + id + '"]');
// 	        var format = ctrl.data('format') + ''; // this is assumed in other functions to be a string not a number, so we concatenate a empty string on the end to cast it as a string
// 	        var roundTo = ctrl.data('roundto');

// 	        if (format == 'undefined') {
// 	            if (microTool.values.inputFormats[id] != undefined) {
// 	                format = microTool.values.inputFormats[id];
// 	            }
// 	            else {
// 	                format = '1';
// 	            }
// 	        }

// 	        // default rounding to zero.. ie. no decimal points; its a whole number
// 	        if (roundTo == undefined) {
// 	            roundTo = 0;
// 	        }

// 	        // if this is a percentage, then make it have one decimal point
// 	        if (format == '2') {
// 	            roundTo = 0;
// 	        }

// 	        // the answer will be undefined for OUTPUT vars since we dont store these textObj item in the inputs array.. ie. above we do a var answer = inputs[id];
// 	        if (typeof answer === 'undefined' || ctrl.hasClass('microToolOutput')) {
// 	            var answer = '';

// 	            // do we include this text?
// 	            // this class is used on blocks of text that forrester may conditionally show or hide in the deliverable
// 	            if (ctrl.hasClass('microToolInclude')) {
// 	                // Only Care about setting the include of object
// 	                var include = '';
// 	                if (ctrl.prop("value") !== undefined && ctrl.val() !== undefined) {
// 	                    include = ctrl.val();
// 	                }
// 	                else if (ctrl.html() !== undefined) {
// 	                    include = ctrl.html();
// 	                }

// 	                // has it been set to be included?
// 	                if (include == 'TRUE' || include == '1' || include == 'true') {
// 	                    text[i].include = 'true';
// 	                }
// 	                else {
// 	                    text[i].include = 'false';
// 	                }
// 	            }
// 	            else {
// 	                // if this is a radio input or a checkbox input, then the value is stored in the Inputs object.
// 	                // trying to pull the value from below will have checkboxes always be 'on' and radio buttons always be value of 1
// 	                if (!ctrl.hasClass('radioInput') && !ctrl.hasClass('checkboxInput') && !ctrl.hasClass('ratingInput')) {
// 	                    // grab the value from the .val or .html of the ctrl
// 	                    //Test to see if value is undefined and then if its not is it empty but html is not emtpy.
// 	                    if ((ctrl.prop("value") !== undefined && ctrl.val() !== undefined)) {
// 	                        answer = ctrl.val();
// 	                    }

// 	                    /*See if answer is empty but html is not empty*/
// 	                    if(answer == '' && ctrl.html() !== undefined && ctrl.html() != '')
// 	                    {
// 	                        answer = ctrl.html();
// 	                    }
// 	                }
// 	            }
// 	        }
// 	        else {
// 	            // for percentages that we show in the deliverable, we need it to be 0-100 with a percent sign on the end
// 	            if ((format == 2) && !ctrl.hasClass('microToolInclude')) {

// 	                // the answer coming out of the inputs object is not a string, its a number
// 	                if (answer.toString().indexOf("%") == -1) {
// 	                    /*Pass with Percent Symbol*/
// 	                    answer = answer * 100; // this will result in 55.00000000001%

// 	                    // so doing a toFixed will round it appropriately
// 	                    answer = answer.toFixed(roundTo) + "%";



// 	                }
// 	            }

// 	            if ((format == 3 || format == 1) && !ctrl.hasClass('microToolInclude')) {
// 	                // if this is a radio input or a checkbox input, then the value is stored in the Inputs object.
// 	                // trying to pull the value from below will have checkboxes always be 'on' and radio buttons always be value of 1
// 	                if (!ctrl.hasClass('radioInput') && !ctrl.hasClass('checkboxInput') && !ctrl.hasClass('ratingInput')) {
// 	                    //Test to see if value is undefined and then if its not is it empty but html is not emtpy.
// 	                    if ((ctrl.prop("value") !== undefined && ctrl.val() !== undefined)) {
// 	                        answer = ctrl.val();
// 	                    }
// 	                    else if (ctrl.html() !== undefined) {
// 	                        answer = ctrl.html();
// 	                    }
// 	                }
// 	            }
// 	        }

// 	        // its possible on a registration form from norman, that if the user selects something other than United States, the State input gets hidden, and thus its a null here.
// 	        if (answer === null) {
// 	            answer = "";
// 	        }

// 	        // this is really just to hold numbers that we pass into the xls chart
// 	        var unformattedData = '';

// 	        if (answer.toString().indexOf("%") >= 0) {
// 	            /*Pass with Percent Symbol*/
// 	            unformattedData = microTool.util.stripNumber(answer);
// 	        }
// 	        else {
// 	            // if answer is a number, or if it contains a symbol, then unformat it.. otherwise use the answer
// 	            if ($.isNumeric(answer) || (answer.toString().indexOf(microTool.CurrencyOptions[currencyIndex].symbol) >= 0)) {
// 	                unformattedData = accounting.unformat(answer);
// 	            }
// 	            else {
// 	                // text strings flow through
// 	                unformattedData = answer;
// 	            }
// 	        }

// 	        // save the unformattedData..
// 	        text[i].unformattedData = unformattedData;

// 	        // finally put the answer in the data attribute
// 	        text[i].data = answer;

// 	        // in the IBM XGS tool, they send through ""&It;6months".. we need to catch that and html decode that back to a greater than sign
// 	        if ((answer.toString().toLowerCase().indexOf("&lt;") >= 0) || (answer.toString().toLowerCase().indexOf("&gt;") >= 0)) {
// 	            var decoded = $('<textarea />').html(answer).text();
// 	            text[i].data = decoded;
// 	        }

// 	    } // end if  for (var i = 0; i < Object.keys(text).length; i += 1) {

// 	    //.....................................
// 	    // Set the currency format of the charts.. this will make xls use the correct chartSymbol
// 	    // roll through all the charts in the object
// 	    for (var i = 0; i < Object.keys(microTool.documents.word.microToolReport.content.charts).length; i += 1) {
// 	        // grab each chart
// 	        var thisChart = microTool.documents.word.microToolReport.content.charts[i];

// 	        // if there is a chartSymbol attribute on it, then set it to the currency format that the user selected in the currency dropdown
// 	        if (thisChart.chartSymbol !== undefined) {
// 	            // format this chart so monetary values get the correct currency format and symbol
// 	            thisChart.chartSymbol = microTool.CurrencyOptions[currencyIndex].format;
// 	        }
// 	    }

// 	    /* email is the customer analysis name */
// 	    //if ($('[data-dbentity="email"]').val() != "") {
// 	    if (typeof(microTool.values.calc.Email) != 'undefined' && microTool.values.calc.Email != "") {
// 	        microTool.documents.word.microToolReport.customerAnalysisName = microTool.values.calc.Email;
// 	        microTool.config.customerAnalysisName = microTool.values.calc.Email;
// 	    }

// 	    // send over the IsRegistered bit to save on the customer analysis record.
// 	    // we may have saved the record before registering, so we use this bit to filter out the unregistered analysis in Advisor
// 	    microTool.documents.word.microToolReport.registered = microTool.values.registered;
// 	};

// 	microTool.registration = {
// 	    load: function () {
// 	        var email = microTool.util.getQueryString('email');

// 	        microTool.values.calc.Email = email;
// 	        microTool.values.registered = true;
// 	        microTool.analysis.save(microTool.analysis.download);
// 	    }
// 	};

// 	/*************************************************************************************************/
// 	// READY Events
// 	// Desc: Everything that needs to run on page startup.
// 	/*************************************************************************************************/
// 	$('document').ready(function () {
// 	    if ($('.isAngular')){
// 	        //dont run init allow angular to kick it off.
// 	    }
// 	    else{
// 	        microTool.util.init();
// 	    }
// 	});

// 	$(document).on("microToolUpdateInputs", function () {
// 	    //check if configuration set for angular project
// 	    microTool.values.loadData['inputs'](false);
// 	});

// 	if (!String.prototype.trim) {
// 	    String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ''); };
// 	}
// 	String.prototype.replaceAll = function (str1, str2, ignore) {
// 	    return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function (c) { return "\\" + c; }), "g" + (ignore ? "i" : "")), str2);
// 	};
// 	Object.size = function (obj) {
// 	    var size = 0,
// 			key;
// 	    for (key in obj) {
// 	        if (obj.hasOwnProperty(key)) {
// 	            size += 1;
// 	        }
// 	    }

// 	    return size;
// 	};
// 	if (!Array.prototype.indexOf) {
// 	    Array.prototype.indexOf = function (obj, start) {
// 	        for (var i = (start || 0), j = this.length; i < j; i++) {
// 	            if (this[i] === obj) { return i; }
// 	        }
// 	        return -1;
// 	    }
// 	}
// }
// export default mainstay