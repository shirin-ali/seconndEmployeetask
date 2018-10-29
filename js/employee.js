var employeeData =[],count =0,edit = false,editIndex = "",modal,btn,span,checkName,
checkDesignation,checkDepartment,checkDob,checkContact,checkEmail,checkAddress,namevar,
departmentVar,dobVar,contactVar,emailvar,addressvar,pathOfimage = "image/default-usertwo.jpg";

window.onload = function() {
  var retrievedObject = localStorage.getItem('employeeData');
  employeeData =JSON.parse(retrievedObject);
  updateView(employeeData);
}
var openModel = function(){
modal = document.getElementById('myModal');
btn = document.getElementById("myBtn");
span = document.getElementsByClassName("close")[0];
modal.style.display = "block";
document.getElementById("msg1").innerHTML="";
document.getElementById("msg2").innerHTML="";
document.getElementById("msg3").innerHTML="";
document.getElementById("msg4").innerHTML="";
document.getElementById("msg5").innerHTML="";
document.getElementById("msg6").innerHTML="";
document.getElementById("msg7").innerHTML="";
document.getElementById("msg8").innerHTML="";
};
var closeModel =function() {
  modal.style.display = "none";
  edit = false;
  updateView(employeeData);
}
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
      edit = false;
      updateView(employeeData);
  }
}
var formValidate = function(){
   namevar = document.getElementById("name").value;
   designationVar = document.getElementById("designation").value;
   departmentVar = document.getElementById("department").value;
   dobVar = document.getElementById("date-of-birth").value;
   contactVar = document.getElementById("contact-number").value;
   emailvar = document.getElementById("email").value;
   addressvar = document.getElementById("address").value;

  var msgDiv1 = document.getElementById("msg1");
  var msgDiv2 = document.getElementById("msg2");
  var msgDiv3 = document.getElementById("msg3");
  var msgDiv4 = document.getElementById("msg4");
  var msgDiv5 = document.getElementById("msg5")
  var msgDiv6 = document.getElementById("msg6");
  var msgDiv7 = document.getElementById("msg7");
  var patternText= /[A-Za-z]/ ;
  var patternNumber= /[0-9]{10}/ ;
  var patternEmail= /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ 
  // name validation
  if(patternText.test(namevar) == true){
    msgDiv1.innerHTML ="";
    checkName = "true"; 
   }
  else{
    msgDiv1.innerHTML =" name can not be empty or can not contain special charecter";
    checkName = "false"; 
  }
   // ndesignation validation
  if(patternText.test(designationVar) == true){
        msgDiv2.innerHTML ="";
        checkDesignation = "true"; 
     }
  else{
            msgDiv2.innerHTML =" designation can not be empty or can not contain special charecter";
            checkDesignation = "false"; 
  }
    // department validation
  if(patternText.test(departmentVar) == true){
    msgDiv3.innerHTML ="";
    checkDepartment = "true"; 
  }
  else{
    msgDiv3.innerHTML =" department can not be empty or can not contain special charecter";
    checkDepartment = "false"; 
  }
   // dob validation
  if( dobVar === ""){
    checkDob = "false"; 
    msgDiv4.innerHTML =" date of birth can not be empty";
  }
  else{
    msgDiv4.innerHTML ="";
    checkDob = "true"; 
  }
  // contact validation
  if(patternNumber.test(contactVar) == true){
    msgDiv5.innerHTML ="";
    checkContact = "true"; 
  }
  else{
    msgDiv5.innerHTML =" invalid contact number";
    checkContact= "false"; 
  }
  // email validation
  if(patternEmail.test(emailvar) == true) { 
      checkEmail= "true";
      msgDiv6.innerHTML ="";
      for(var i =0;i<employeeData.length;i++){
        if(emailvar == employeeData[i].email){
         msgDiv6.innerHTML =" email id already exist ";
         checkEmail= "false"; 
          }
        }
     }
 else{
    msgDiv6.innerHTML =" invalid email id";
    checkEmail= "false"; 
  } 
  if(edit==true){if(emailvar==employeeData[editIndex].email){
       checkEmail= "true";
       msgDiv6.innerHTML ="";
    }
  }
   // address validation
  if(patternText.test(addressvar) == true){
    msgDiv7.innerHTML ="";
    checkAddress  = "true"; 
  }
  else{
    msgDiv7.innerHTML =" address can not be empty ";
    checkAddress = "false"; 
  }
  //
 // form validation
    if(checkName == "true" && checkDesignation == "true"&& checkDepartment == "true" && checkDob  == "true" && checkContact == "true" &&  checkAddress=="true"  && checkEmail == "true" )
    {return true;}
    else{ return false;}

        
} 
 var profile = function(event){
  var reader = new FileReader();
  var picture = document.getElementById("picture");
          reader.onload = function (e) {
          pathOfimage =  e.target.result;
          };
          reader.readAsDataURL(picture.files[0]);
          

}

var  submitEmployeedata = function(){
// console.log(pathOfimage);

  if(formValidate())
 {
   var today = new Date();
   if(edit==true){
   employeeData[editIndex].name =  namevar.toLowerCase();
   employeeData[editIndex].designation= designationVar.toLowerCase();
   employeeData[editIndex].department= departmentVar.toLowerCase();
   employeeData[editIndex].dob= dobVar.toLowerCase();
   employeeData[editIndex].contact_number =  contactVar.toLowerCase();
   employeeData[editIndex].email = emailvar.toLowerCase();
   employeeData[editIndex].address = addressvar.toLowerCase();
   employeeData[editIndex].cretaedDate = today;
   employeeData[editIndex].picture = pathOfimage;
   localStorage.setItem('employeeData', JSON.stringify(employeeData));
   updateView(employeeData);
   edit = false;
  }
  else
  {
    count++;
    employeeData.push({name:namevar.toLowerCase(),
                      designation:designationVar.toLowerCase(),
                      department:departmentVar.toLowerCase(),
                      dob:dobVar.toLowerCase(),
                      cretaedDate:today,
                      contact_number:contactVar.toLowerCase(),
                      email:emailvar.toLowerCase(),
                      address:addressvar.toLowerCase(),
                      picture :pathOfimage,
                      cardClssId : "card-class"+count
                     });

    localStorage.setItem('employeeData', JSON.stringify(employeeData));
    updateView(employeeData);
   }

  }else{
    var msgDiv = document.getElementById("msg8");
    msgDiv.innerHTML ="please check all fields";
  }
}
var  updateView = function(arrayData){
  modal = document.getElementById('myModal');
  modal.style.display = "none";
   var  container_div = document.getElementById("container");
   container_div.classList.remove("form-hide");
   container_div.innerHTML = '';
   if(arrayData.length>0)
{for(var index=0;index<arrayData.length;index++)
 {
 var cardDiv = document.createElement("div");
 cardDiv.className ="class-card";
 cardDiv.id =arrayData[index].cardClssId;
 var cardTitle = document.createElement("div");
 cardTitle.className ="card-title";
 cardTitle.innerHTML = arrayData[index].name.toUpperCase();

 var carImageDiv = document.createElement("div");
 carImageDiv.className ="card-image-div";
 var cardImage = document.createElement("img");
 cardImage.className ="card-image";
 cardImage.src = arrayData[index].picture;
 cardImage.id ="set-image";
 carImageDiv.appendChild(cardImage);
 
var datalList = document.createElement("ul");
datalList.classList ="form-style-1";

var listItem1 = document.createElement("li");
var labeldata1 =document.createElement("input")
labeldata1.classList ="field-divided one";
labeldata1.readOnly ="true";
labeldata1.value = "Name";
var valuedata1 =document.createElement("input")
valuedata1.classList ="field-divided two";
valuedata1.value = arrayData[index].name;
valuedata1.readOnly ="true";
listItem1.appendChild(labeldata1);
listItem1.appendChild(valuedata1);
datalList.appendChild(listItem1);

var listItem2 = document.createElement("li");
var labeldata2 =document.createElement("input")
labeldata2.classList ="field-divided one";
labeldata2.readOnly ="true";
labeldata2.value = "Designation";
var valuedata2 =document.createElement("input")
valuedata2.classList ="field-divided two";
valuedata2.value = arrayData[index].designation;
valuedata2.readOnly ="true";
listItem2.appendChild(labeldata2);
listItem2.appendChild(valuedata2);
datalList.appendChild(listItem2);

var listItem3 = document.createElement("li");
var labeldata3 =document.createElement("input")
labeldata3.classList ="field-divided one";
labeldata3.value = "Department";
labeldata3.readOnly ="true";
var valuedata3 =document.createElement("input")
valuedata3.classList ="field-divided two";
valuedata3.value = arrayData[index].department;
valuedata3.readOnly ="true";
listItem3.appendChild(labeldata3);
listItem3.appendChild(valuedata3);
datalList.appendChild(listItem3);

var listItem4 = document.createElement("li");
var labeldata4 =document.createElement("input")
labeldata4.classList ="field-divided one";
labeldata4.value = "Date of birth";
labeldata4.readOnly ="true";
var valuedata4 =document.createElement("input")
valuedata4.classList ="field-divided two";
valuedata4.value = arrayData[index].dob;
valuedata4.readOnly ="true";
listItem4.appendChild(labeldata4);
listItem4.appendChild(valuedata4);
datalList.appendChild(listItem4);


 var listItem5 = document.createElement("li");
 var labeldata5 =document.createElement("input")
labeldata5.classList ="field-divided one";
labeldata5.value = "Contact number";
labeldata5.readOnly ="true";
var valuedata5 =document.createElement("input")
valuedata5.classList ="field-divided two";
valuedata5.value = arrayData[index].contact_number;
valuedata5.readOnly ="true";
listItem5.appendChild(labeldata5);
listItem5.appendChild(valuedata5);
datalList.appendChild(listItem5);


var listItem6 = document.createElement("li");
var labeldata6 =document.createElement("input")
labeldata6.classList ="field-divided one";
labeldata6.value = "Email";
labeldata6.readOnly ="true";
var valuedata6 =document.createElement("input")
valuedata6.classList ="field-divided two";
valuedata6.value = arrayData[index].email;
valuedata6.readOnly ="true";
listItem6.appendChild(labeldata6);
listItem6.appendChild(valuedata6);
datalList.appendChild(listItem6);

var listItem7 = document.createElement("li");
var labeldata7 =document.createElement("input")
labeldata7.classList ="field-divided one";
labeldata7.value = "Address";
labeldata7.readOnly ="true";
var valuedata7 =document.createElement("input")
valuedata7.classList ="field-divided two textarea-border";
valuedata7.value = arrayData[index].address;
valuedata7.readOnly ="true";
listItem6.appendChild(labeldata7);
listItem6.appendChild(valuedata7);
datalList.appendChild(listItem7);


var updatelogo = document.createElement("button");
updatelogo.classList ="glyphicon glyphicon-pencil logo-button";
updatelogo.id ="updatethis"+count;
updatelogo.value = index;
updatelogo.onclick = function(){updateDetail(event)};

var deletelogo = document.createElement("button");
deletelogo.classList="glyphicon glyphicon-trash logo-button";
deletelogo.id ="deletethis"+count;
deletelogo.value =index;
deletelogo.onclick = function(){deleteDetail(event)};

 cardDiv.appendChild(carImageDiv);
 cardDiv.appendChild(cardTitle);
 cardDiv.appendChild(datalList);
 cardDiv.appendChild(updatelogo);
 cardDiv.appendChild(deletelogo);
 container.appendChild(cardDiv);

 document.getElementById("name").value = "";
 document.getElementById("designation").value = "";
 document.getElementById("department").value = "";
 document.getElementById("date-of-birth").value = "";
 document.getElementById("contact-number").value = "";
 document.getElementById("email").value = "";
 document.getElementById("address").value = "";
 document.getElementById("picture").value = "";
 pathOfimage = "image/default-usertwo.jpg"


}}
console.log(employeeData);
}
var  deleteDetail = function(event){
    var deletevalue = event.currentTarget.value; 
    employeeData.splice(deletevalue , 1);
    console.log(employeeData);
    localStorage.setItem('employeeData', JSON.stringify(employeeData));
     updateView(employeeData);
}
var  updateDetail = function(event){
    var updatevalue = event.currentTarget.value; 
    var updateParentId = event.currentTarget.parentNode.id;

    var updatediv = document.getElementById(updateParentId);
    
            document.getElementById("name").value= employeeData[updatevalue].name;
            document.getElementById("designation").value  = employeeData[updatevalue].designation;
            document.getElementById("department").value  = employeeData[updatevalue].department;
            document.getElementById("date-of-birth").value = employeeData[updatevalue].dob; 
            document.getElementById("contact-number").value  = employeeData[updatevalue].contact_number;
            document.getElementById("email").value = employeeData[updatevalue].email; 
            document.getElementById("address").value = employeeData[updatevalue].address; 
            pathOfimage = employeeData[updatevalue].picture; 
            openModel();
            updatediv.classList.add("form-hide");
            edit = true;
            editIndex = updatevalue;
            console.log(editIndex);
            
            
}
var  searchFunction = function(){
    var searcKeyValue = document.getElementById("searchKey").value.toLowerCase();;
    var arraysearch=[];
        for(var index =0;index<employeeData.length;index++){
            if(employeeData[index].name == searcKeyValue)
            {
             arraysearch.push({name:employeeData[index].name,
              designation:employeeData[index].designation,
              department:employeeData[index].department,
              dob:employeeData[index].dob,
              cretaedDate:employeeData[index].cretaedDate,
              contact_number:employeeData[index].contact_number,
              email:employeeData[index].email,
              address:employeeData[index].address,
              picture:employeeData[index].picture
               });
            }
          }
          if(arraysearch.length>0){
          updateView(arraysearch);  
          }
          else{
              alert("no record found");
              document.getElementById("searchKey").value ="";
              updateView(employeeData);
          }
}
var  sortFunction = function(){
    var sortkey = document.getElementById("sortKey").value;
    console.log(sortkey);
    var employeeDataOreder = [];
    employeeDataOreder=JSON.parse(JSON.stringify(employeeData))
    employeeDataOreder.sort(function(a, b){
        var nameA=a.name, nameB=b.name;
        var designationA=a.designation, designationB=b.designation;
     if(sortkey=="accending")
       { 
         if (nameA < nameB) 
             return -1 
         if (nameA > nameB)
            return 1
         return 0 
       }
       else if(sortkey=="decending")
       {
        if (nameA > nameB) //sort string ascending
        return -1 
        if (nameA < nameB)
        return 1
        return 0 //default return value (no sorting)
       }
       else if(sortkey=="designation-accending")
       {
        if (designationA < designationB) 
        return -1 
        if (designationA  >  designationB)
         return 1
         return 0 
       }
       else
       {
        if (designationA > designationB) //sort string ascending
        return -1 
        if (designationA < designationB)
       return 1
        return 0 //default return value (no sorting)
       }
    })

    updateView(employeeDataOreder);  
}
var  resetFunction = function(){
    console.log(employeeData);
    document.getElementById("searchKey").value ="";
    updateView(employeeData);    
}


