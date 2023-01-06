$("#stdRollNo").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getStdRollNoAsJsonObj() {
    var stdRollNo = $("stdRollNo").val();
    var jsonStr = {
        id: stdRollNo
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#stdName").val(record.stdName);
    $("#stdClass").val(record.stdClass);
    $("#dob").val(record.dob);
    $("#Address").val(record.Address);
    $("#ErDate").val(record.ErDate);
    $("#stdClass").val(record.stdClass);
    $("#stdClass").val(record.stdClass);
}

function resetData() {
    $("#stdRollNo").val("");
    $("#stdName").val("");
    $("#stdClass").val("");
    $("#dob").val("");
    $("#Address").val("");
    $("#ErDate").val("");
    $("#stdRollNo").prop("disabled", false);
    $("#Save").prop("disabled", true);
    $("#Change").prop("disabled", true);
    $("#Reset").prop("disabled", true);
    $("#stdRollNo").focus();
}

$("#stdRollNo").focus();
function validateAndGetFormData() {

    var rollNo,stdName,stdClass,dob,Address,ErDate;
    stdRollNo = $("#stdRollNo").val("");
    stdName = $("#stdName").val("");
    stdClass = $("#stdClass").val("");
    dob = $("#dob").val("");
    Address = $("#Address").val("");
    ErDate = $("#ErDate").val("");

    if (rollNo === "") {
        alert("Roll no required");
        $("#stdRollNo").focus();
        return "";
    }

    if (stdName === "") {
        alert("student Name is Required");
        $("#stdName").focus();
        return "";
    }
    
    if (stdClass === "") {
        alert("Class name is Required Value");
        $("#empEmail").focus();
        return "";
    }
    
    if (dob === "") {
        alert("DOB is Required");
        $("#dob").focus();
        return "";
    }
    
    if (Address === "") {
        alert("Address is Required");
        $("#Address").focus();
        return "";
    }
     
    if (ErDate === "") {
        alert("Enrollment date is Required");
        $("#ErDate").focus();
        return "";
    }
    var jsonStrObj = {
        stdRollNo: rollNo,
        stdName: stdName,
        stdClass: stdClass,
        dob: dob,
        Address: Address,
        ErDate: ErDate,

    };
    return JSON.stringify(jsonStrObj);
}
function getStd() {
    var stdRollNoJsonObj = getStdRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest("90938162|-31949273063764513|90955216",
        stdRollNoJsonObj, "SCHOOL-DB", "STUDENT-TABLE");
    alert(getRequest);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(getRequest,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    if (resultObj.status === 400) {
        $("#Save").prop("disabled", false);
        $("#Reset").prop("disabled", false);
        $("#stdName").focus();
    } else if (resultObj.status === 200) {
        $("#stdRollNo").prop("disabled", true);
        fillData(resultObj);

        $("#Change").prop("disabled", false);
        $("#Reset").prop("disabled", false);
        $("#stdName").focus();
    }
}

function saveData() {
    var jsonStrObj = validateAndGetFormData();
    if (jsonStrObj === "") {
        return;
    }
    var putReqStr = createPUTRequest("90938162|-31949273063764513|90955216",
        jsonStrObj, "SCHOOL-DB", "STUDENT-TABLE");
    alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#stdRollNo").focus();
}
function changeData() {
    $("#Change").prop("disabled", true);
    var jsonChg = validateAndGetFormData();
    if (jsonChg === "") {
        return;
    }
    var updateReqStr = createUPDATERecordRequest("90938162|-31949273063764513|90955216",
        jsonChg, "SCHOOL-DB", "STUDENT-TABLE", localStorage.getItem("recno"));
    alert(updateReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(updateReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#stdRollNo").focus();
}
