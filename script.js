$(document).ready(function() {
    showTodoOnload()
    
    function showTodoOnload() {
        var existing = localStorage.getItem('mytodolist');

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        existing = existing ? existing.split(',') : [];

        for (var i = 0; i < existing.length; i++) {
            if (existing[i] !== "") {
                $("#todo-list").append("<li class='todo-list-li'><input type='checkbox'" +
                    " name='todo-item-done'" +
                    " class='todo-item-done'" +
                    " value='" + existing[i] + "' /> " +
                    "<input class='focusInput' type='text' value='" + existing[i] + "' />" + 
                    " <button class='todo-item-delete'>" +
                    "<i id='delete' class='fas fa-times'></i></button></li>");

            }
        }
    }
    
    let key = "5a31fbb91fe5cd159f664e9a95c21e971e417e9230d8b78b15d9ff68f20f451d";
  

    function addTodoItem() {
        var todoItem = $("#new-todo-item").val();

        console.log(todoItem)
        // Get the existing data
        var existing = localStorage.getItem('mytodolist');

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        existing = existing ? existing.split(',') : [];

        // Add new data to localStorage Array
        if (todoItem !== "" || todoItem != undefined) {

            existing.push(todoItem);

        }

        var array2string = existing;
        array2string = array2string.toString();
        // Save back to localStorage
        localStorage.setItem('mytodolist', array2string);
        $("#todo-list").append("<li class='todo-list-li'><input type='checkbox'" +
            " name='todo-item-done'" +
            " class='todo-item-done'" +
            " value='" + todoItem + "' /> " +

            "<input class='focusInput' type='text' value='" + todoItem + "' />" + 
            " <button class='todo-item-delete'>" +
            "<i id='delete' class='fas fa-times'></i></button></li>"
            );


        $("#new-todo-item").val("");

    }


    function deleteTodoItem(e, item) {
        e.preventDefault();
        console.log($(item).parent());
        $(item).parent().fadeOut('slow', function() {
            $(item).parent().remove();
        });
    }


    function completeTodoItem() {
      console.log('hdd');
      var item = this;

      var check = $(item).parent().find('input[type=checkbox]').is(':checked');
      if(check) {
         $(item).parent().find('input[type=text]').attr("disabled", true);
      } else { 
         $(item).parent().find('input[type=text]').attr("disabled", false);
          }
    }


    $(function() {
        $("#todo-list").on('focus', '.focusInput', function(e) { 
          inputValBefore = e.target.value;
          console.log(inputValBefore)
        })

        $("#add-todo-item").on('click', function(e) {
            e.preventDefault();
            addTodoItem()
        });
        $("#todo-list").on('click', '.todo-item-delete', function(e) {
          e.preventDefault();
          if(e.target.id != 'delete') {
            var item = this;
            var existing = localStorage.getItem('mytodolist');
            existing = existing ? existing.split(',') : [];
            console.log($(item).parent());
            
            var index = existing.indexOf(inputValBefore);
             $('input').keydown(function(e) {
                if (e.which == 13 || e.which == 1) { 
                  console.log('heloo target');
                  console.log(e.target.value);
                  existing.splice(index, 1, e.target.value);
                  localStorage.setItem('mytodolist', existing.toString());
                  $(item).parent().parent().empty();
                  showTodoOnload();
                } })
          } else {
            var item = this;
            
            var existing = localStorage.getItem('mytodolist');
            existing = existing ? existing.split(',') : [];
            var value = $(item).parent()[0].firstChild.value;
            var index = existing.indexOf(value);
            existing.splice(index, 1);
            localStorage.setItem('mytodolist', existing.toString());
            deleteTodoItem(e, item)
          }           
        })

       

      $(document).on('click', ".todo-item-done", completeTodoItem);
    })


    if (localStorage.name === undefined) {
        console.log("inside if");

        $("#tasktoday").css("display", "none");
        $("#tasktoday2").css("display", "none");
        $("#tick").css("display", "none");
        $("#cross").css("display", "none");
        $(".greeting").css("display", "none");
        $(".addtodo").css("display", "none");

        $(function() {
            $.ajax({
                type: "get",
                url: "https://api.unsplash.com/photos/random/?client_id=" + key, //url to send to 
                contentType: "application/json; charset=utf-8",
                success: function(msg) {
                    let imgurl = msg.urls.regular;
                    $(".bg").css("background-image", "url(" + imgurl + ")");
                }
            });
        });

        $("#btn").click(function() {
            let name = $('#name').val();
            if (name == "") {
                alert("please enter your name");
                return false;
            } else {
                localStorage.setItem("name", name);
                console.log(localStorage.getItem("name"));
                location.reload();
            }

        });

    }


    /*------------------------------------------------------------*/
    else {
        console.log("inside else");
        console.log(localStorage.getItem("name"));
        $("#btn").css("display", "none");
        $("#name").css("display", "none");
        $(".question").css("display", "none");
        $(".question-title").css("display", "none");
        $("#prompt").css("display", "none");
        $("#tick").css("display", "none");
        $("#cross").css("display", "none");


        /*------------------------------------------------------------*/

        // Making 2 variable month and day
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


        // changing time every 1 seconds
        setInterval(function() {
            // make single object
            let newDate = new Date();
            let currentday = newDate.getDay();
            let currentmonth = newDate.getMonth();
            let currentyear = newDate.getFullYear();
            let currenthour = newDate.getHours();
            let currentMinute = newDate.getMinutes();


            $('#Dateandtime').html(days[currentday] + " " + newDate.getDate() + ' ' + months[currentmonth] + ' ' + currentyear + ' <br>' + (currenthour < 10 ? "0" : "") + currenthour + ':' + (currentMinute < 10 ? "0" : "") + currentMinute);
        }, 1000);

        /*--------------------------------------------------------------*/

        let i = 0;

        let quotes = [
            "Life is really simple, but we insist on making it complicated",

            "The most simple things can bring the most happiness",

            "Style is a simple way of saying complicated things."
        ]

        $("#quotes").html(quotes[2]); //display quote once

        setInterval(function() {

            $("#quotes").html(quotes[i]); // display quote every 15 secs 
            i++;
            if (i > 2) {
                i = 0;
            }

        }, 15000);

        /*---------------------------------------------------------*/

        // display background image once

        $(function() {
            $.ajax({
                type: "get",
                url: "https://api.unsplash.com/photos/random/?client_id=" + key, //url to send to 
                contentType: "application/json; charset=utf-8",
                success: function(msg) {
                    let imgurl = msg.urls.regular;
                    $(".bg").css("background-image", "url(" + imgurl + ")");
                }
            });
        });


        //change background image every 30 secs

        setInterval(function() {

            $(function() {
                $.ajax({
                    type: "get",
                    url: "https://api.unsplash.com/photos/random/?client_id=" + key, //url to send to 
                    contentType: "application/json; charset=utf-8",
                    success: function(msg) {
                        let imgurl = msg.urls.regular;
                        $(".bg").css("background-image", "url(" + imgurl + ")");
                    }
                });
            });
        }, 30000);

        /*--------------------------------------------------------------*/
        // display name

        let gtname = localStorage.getItem("name");
        console.log(gtname);
        let newDate = new Date();
        let currentday = newDate.getDay();
        let currentmonth = newDate.getMonth();
        let currentyear = newDate.getFullYear();
        let currenthour = newDate.getHours();
        console.log(currenthour);
        $('#displayname').html(' ' + gtname);

        if (currenthour <= 12) {
            $('.greeting').html('Good morning , ');
        } else if (currenthour <= 18) {
            $('.greeting').html('Good afternoon , ');
        } else {
            $('.greeting').html('Good evening , ');
        }


        /*--------------------------------------------------------------*/
        //task today

        if (localStorage.tasktoday === undefined) {
            $('#tasktoday').keypress(function(e) {
                if (e.which == 13) {
                  console.log("hello keypress");
                    let tasktoday = $('#tasktoday').val();
                    if (tasktoday == "") {
                        alert("Enter your task for today");
                        return false;
                    } else {
                        localStorage.setItem("tasktoday", tasktoday);
                        console.log(localStorage.getItem("tasktoday"));
                        $('#displaytasktoday').html('Your task for today is ' + ' ' + localStorage.getItem("tasktoday"));
                        $("#tasktoday").css("display", "none");
                        $("#tasktoday2").css("display", "none");
                        $("#tick").css("display", "inline");
                        $("#cross").css("display", "inline");
                        return false;
                    }
                }
            });
        } else {
            $('#displaytasktoday').html('Have you completed your todays task - ' + ' ' + localStorage.getItem("tasktoday"));
            $("#tasktoday").css("display", "none");
            $("#tasktoday2").css("display", "none");
            $("#tick").css("display", "inline");
            $("#cross").css("display", "inline");
        }

        /*--------------------------------------------------------------*/
        // display city and its weather

        //city
        $.get("https://ipinfo.io/", function(response) {
            let usercity = response.city;
            $('#usercity').html(usercity);
            console.log(usercity);
        }, "jsonp");


        //weather
        let j = 0;

        let weather = ["2°C ", "-1°C", "4°C", "-7°C"]

        $("#weather").html(weather[2]);

        setInterval(function() {

            $("#weather").html(weather[j]);
            j++;
            if (j > 2) {
                j = 0;
            }
        }, 10000000);
        /*--------------------------------------------------------*/
        //deleting the local storage and adding it back
        $("#tick").click(function() {

            localStorage.removeItem("tasktoday");
            location.reload();

        });


        $("#cross").click(function() {
            localStorage.removeItem("tasktoday");
            location.reload();
        });


    }
});


//sample check